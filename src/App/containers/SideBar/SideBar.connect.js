import $ from 'redux-methods';
import { connect, } from 'react-redux';
const { openKeys, isSidebarCollapsed, } = $.ui;
const dispatch = {
  toggleKey     : openKeys.addOrRemove,
  toggleSidebar : isSidebarCollapsed.set,
};
const state = ( state, ownProps ) => ( {
  currentPath        : ownProps.location.pathname,
  isAuthenticated    : state.user.isAuthenticated,
  isLargeDisplay     : state.browser > 1200,
  isSidebarCollapsed : state.ui.isSidebarCollapsed,
  isSmallDisplay     : state.browser < 992,
  menuItems          : ownProps.route.menuItems,
  openKeys           : state.ui.openKeys,
} );
const connectSideBar = connect( state,
                                dispatch );

export default connectSideBar;
