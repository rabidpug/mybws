import $ from 'redux-methods';
import axios from 'axios';
import { getPath, } from 'utilibelt';
import { store, } from 'Store';
import { toast, } from 'react-toastify';

export const configureAxios = () => {
  axios.defaults.headers.common.Authorization = localStorage.getItem( 'JWT' );

  axios.defaults.headers.common.refreshtoken = localStorage.getItem( 'refreshToken' );
};
export const authedAxios = () => {
  axios.defaults.headers.common.Authorization = localStorage.getItem( 'JWT' );

  axios.defaults.headers.common.refreshtoken = localStorage.getItem( 'refreshToken' );

  axios.interceptors.response.use( res => {
    if ( res && getPath( res, 'data.user' ) && !res.handled ) {
      const {
        user: { refreshToken, token, },
        error,
      } = res.data;

      error && toast.error( error );

      if ( token ) localStorage.setItem( 'JWT', token );

      refreshToken && localStorage.setItem( 'refreshToken', refreshToken );

      configureAxios();

      res.handled = true;
    }

    return Promise.resolve( res );
  },
                                   e => {
                                     if ( e && !e.handled ) {
                                       const { isOnline, } = store.getState().ui;

                                       if ( e && getPath( e, 'response.status' ) === 401 ) store.dispatch( $.user.doLogOut() );
                                       else if ( e && isOnline ) toast.error( getPath( e, 'response.data.message', 'An unknown server error has ocurred' ) );
                                       else if ( !isOnline ) toast.error( 'An internet connection is required to perform that task' );

                                       e.handled = true;
                                     }
                                     return Promise.reject( e );
                                   } );

  return axios;
};
export const differ = ( first, second, result = {} ) => {
  let i = 0;

  for ( i in first ) {
    if ( typeof first[i] === 'object' && typeof second[i] === 'object' ) {
      result[i] = differ( first[i], second[i], {} );

      if ( !result[i] ) delete result[i];
    } else if ( first[i] !== second[i] ) result[i] = second[i];
  }
  return Object.keys( result ).length ? result : false;
};
