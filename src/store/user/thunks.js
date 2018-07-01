import { authedAxios, configureAxios, } from 'Common/helpers/axiosHelpers';

import $ from 'redux-methods';
import { getPath, } from 'utilibelt';
import socketIOClient from 'socket.io-client';
import { toast, } from 'react-toastify';

const thunks = {
  changePublic: ( { key, value, failureCallback, } ) => dispatch => {
    if ( key && value ) {
      const setInProgress = bool => dispatch( $.inProgress.changingProfile.set( bool ) );

      setInProgress( true );

      authedAxios()
        .post( '/v1/user/update', { [key]: value, } )
        .then( res => {
          if ( getPath( res, 'data.error' ) && failureCallback ) failureCallback( res.data.error );

          setInProgress( false );

          if ( key === 'stores' ) dispatch( $.query.items.set( [] ) );
        } )
        .catch( () => setInProgress( false ) );
    }
  },
  doLogOut: e => ( dispatch, getState ) => {
    if ( e === 'Authentication Error' ) toast.error( 'Your session has expired. Log in to resume.' );
    const { socket, } = getState().user;

    localStorage.removeItem( 'JWT' );

    localStorage.removeItem( 'refreshToken' );

    dispatch( $.tutti(
      $.user.isAuthenticated.set( false ),
      $.user.profile.set( {} ),
      $.query.items.set( [] ),
      $.user.socket.set( false )
    ) );

    if ( socket ) {
      socket.close();

      if ( e ) toast.error( `Your session has expired. Log in to resume.` );
      else toast.success( 'You have successfully logged out' );
    }
  },
  listenPublic: () => ( dispatch, getState ) => {
    dispatch( $.inProgress.connectingSocket.set( true ) );

    const query = {
      refreshToken : localStorage.getItem( 'refreshToken' ),
      token        : localStorage.getItem( 'JWT' ),
    };
    const socket = socketIOClient( window.location.host, {
      forceNew: true,
      query,
    } );

    $.socket = socket;

    socket.on( 'connect', () => {
      dispatch( $.user.socket.set( true ) );
    } );

    socket.on( 'PROFILE_UPDATE', ( { token, refreshToken, ...profile } ) => {
      if ( token ) {
        localStorage.setItem( 'JWT', token );

        dispatch( $.user.isAuthenticated.set( true ) );
      }

      refreshToken && localStorage.setItem( 'refreshToken', refreshToken );

      configureAxios();

      if ( profile ) {
        const newStores = profile.stores
          .filter( ( { value: { _id, }, } ) => !getState().data.stores[_id] || !getState().data.stores[_id].hasPlanograms )
          .map( store => store.value._id );

        newStores.forEach( store => dispatch( $.data.fetchPlanogram( store ) ) );

        dispatch( $.user.profile.set( profile ) );

        dispatch( $.data.stores.addFromId( profile.stores.map( store => store.value ) ) );
      }

      dispatch( $.tutti( $.inProgress.connectingSocket.set( false ), $.inProgress.changingProfile.set( false ) ) );
    } );

    socket.on( 'disconnect', () => {
      dispatch( $.user.socket.set( false ) );
    } );

    socket.on( 'error', e => dispatch( $.user.doLogOut( e ) ) );
  },
};

export default thunks;
