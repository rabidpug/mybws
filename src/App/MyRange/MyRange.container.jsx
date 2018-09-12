import React, { PureComponent, } from 'react';

import AddNewModal from '../MyProfile/containers/AddNewModal.component';
import { LoadBar, } from 'Common/components/Loaders';
import { MyRangeStoreLoadable, } from './Store';
import { Route, } from 'react-router-dom';
import gqlMyRange from './MyRange.gql';
import subMyRange from './MyRange.sub';
import { toast, } from 'react-toastify';

@gqlMyRange
@subMyRange
export default class MyRange extends PureComponent {
  state = { showModal: false, }

  componentDidMount () {
    document.title = 'myBWS Range';

    this.checkPath();
  }

  componentDidUpdate ( prevProps ) {
    this.checkPath( prevProps );
  }

  checkPath = ( prevProps = {} ) => {
    const {
      user = {},
      store = {},
      history: { replace, },
      location = {},
      match,
    } = this.props;
    const { location: oldLocation = {}, user: oldUser = {}, store: oldStore = {}, } = prevProps;

    if (
      !user.loading &&
      !store.loading &&
      match.isExact &&
      ( location.pathname !== oldLocation.pathname ||
        oldUser.loading !== user.loading ||
        oldStore.loading !== store.loading )
    ) {
      const { getStore = {}, } = store;

      if ( getStore.id ) {
        replace( `/myRange/${getStore.id}` );

        document.title = `myBWS ${getStore.name} Range`;
      } else this.setState( { showModal: true, } );
    }
  }

  closeModal = () => {
    const { history: { push, }, } = this.props;

    this.setState( { showModal: false, } );

    toast.error( 'A store number is required to view myRange' );

    push( '/' );
  }

  handleSubmit = e => {
    e.preventDefault();

    const { history: { replace, }, } = this.props;
    const { target: { input, }, } = e;
    let { value, } = input;

    value = isNaN( parseInt( value ) ) ? value : parseInt( value );

    input.value = '';

    replace( `/myRange/${value}` );

    this.setState( { showModal: false, } );
  }

  render () {
    const {
      user = {},
      store = {},
      match: { url, },
    } = this.props;
    const { showModal, } = this.state;

    if ( user.loading || store.loading ) return <LoadBar />;
    if ( showModal ) {
      return (
        <AddNewModal
          field='store'
          handleSubmit={ this.handleSubmit }
          header='Enter A Store Number'
          label='Store Number'
          onClose={ this.closeModal }
          show={ showModal }
        />
      );
    }
    return <Route component={ MyRangeStoreLoadable } path={ `${url}/:store` } />;
  }
}
