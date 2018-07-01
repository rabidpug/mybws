import React, { PureComponent, } from 'react';

import ChangePublic from 'Common/components/ChangePublic';
import ModalHeader from 'Common/components/ModalHeader';
import { MyRangeStoreLoadable, } from './Store';
import { Route, } from 'react-router-dom';
import { Spinner, } from 'Common/components/Loaders';
import connectMyRange from './MyRange.connect';
import { toast, } from 'react-toastify';
import { userIsAuthenticated, } from 'Common/helpers/authWrapper';

@userIsAuthenticated
@connectMyRange
export default class MyRange extends PureComponent {
  componentDidMount () {
    document.title = 'myBWS Range';

    this.checkPath();
  }

  componentDidUpdate ( prevProps ) {
    this.checkPath( prevProps );
  }

  checkPath = ( prevProps = {} ) => {
    const {
      gettingProfile,
      history: { replace, push, },
      isSocketConnected,
      location = {},
      setModal,
      store = {},
      match,
      modal,
    } = this.props;
    const { location: oldLocation = {}, } = prevProps;

    if ( isSocketConnected && !gettingProfile && match.isExact && location.pathname !== oldLocation.pathname ) {
      if ( store._id ) {
        replace( `/myRange/${store._id}` );

        document.title = `myBWS ${store.name} Range`;
      } else {
        setModal( {
          body      : <ChangePublic field='stores' label='Store Number' onSubmit={ this.handleSubmit } />,
          header    : <ModalHeader>Enter Store Number To View Range</ModalHeader>,
          height    : 120,
          showModal : true,
        } );
      }
    }
    if ( prevProps.modal && !modal && !store._id && match.isExact ) {
      toast.error( 'A store number is required to view myRange' );

      push( '/' );
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      history: { replace, },
      setModal,
    } = this.props;
    const { target: { input, }, } = e;
    let { value, } = input;

    value = isNaN( parseInt( value ) ) ? value : parseInt( value );

    input.value = '';

    replace( `/myRange/${value}` );

    setModal();
  };

  render () {
    const { match, isSocketConnected, } = this.props;

    const [
      , , pathStore,
    ] = location.pathname.split( '/' );

    return isSocketConnected && +pathStore
      ? <Route component={ MyRangeStoreLoadable } path={ `${match.url}/:store` } />
      :       <Spinner />;
  }
}
