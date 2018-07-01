import $ from 'redux-methods';
import { connect, } from 'react-redux';
const { changePublic, listenPublic, } = $.user;
const { isOnline, isSidebarCollapsed, } = $.ui;
const dispatch = {
  changePublic,
  isOnline      : isOnline.set,
  listenPublic,
  setModal      : $.ui.modal.set,
  // setWidth      : $.browser.set,
  toggleSidebar : isSidebarCollapsed.toggle,
};
const state = state => ( {
  activeRole         : $.user.profile.getActiveRole( state ),
  activeStore        : $.user.profile.getActiveStore( state ),
  isAuthenticated    : state.user.isAuthenticated,
  isSidebarCollapsed : state.ui.isSidebarCollapsed,
  isSmallDisplay     : state.browser < 768,
  isSocketConnected  : state.user.socket,
  isSocketConnecting : state.inProgress.connectingSocket,
  isUserOnline       : state.ui.isOnline,
  modal              : state.ui.modal,
  profile            : state.user.profile,
} );
const connectApp = connect( state,
                            dispatch );

export default connectApp;
