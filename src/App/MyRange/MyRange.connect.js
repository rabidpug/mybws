import $ from 'redux-methods';
import { connect, } from 'react-redux';
import { getPath, } from 'utilibelt';
const { changePublic, } = $.user;
const { getStore, } = $.data;
const { modal, } = $.ui;
const state = ( state, props ) => {
  const { location: { pathname, }, } = props;
  const [
    , , storeID,
  ] = pathname.split( '/' );
  const userStore = getPath( getPath(
    state, 'user.profile.stores', [], res => res.filter( sto => sto.selected )
  ),
                             '0.value._id' );

  return {
    gettingProfile     : state.inProgress.changingProfile,
    isSocketConnected  : state.user.socket,
    isSocketConnecting : state.inProgress.connectingSocket,
    modal              : state.ui.modal,
    pathStore          : state.data.stores[+storeID],
    profile            : state.user.profile,
    store              : state.data.stores[+storeID || userStore],
  };
};
const dispatch = {
  changePublic,
  getStore,
  setModal: modal.set,
};
const connectMyRange = connect( state,
                                dispatch );

export default connectMyRange;
