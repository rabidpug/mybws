import $ from 'redux-methods';
import { connect, } from 'react-redux';

const state = ( state, props ) => {
  const {
    location: { pathname, },
    route,
  } = props;
  const [
    , , storeID,
  ] = pathname.split( '/' );

  return {
    actionMenuItems    : route.actionMenuItems,
    activeRole         : $.user.profile.getActiveRole( state ),
    hideSidebarToggle  : !( state.browser < 992 ),
    isAuthenticated    : state.user.isAuthenticated,
    isOnline           : state.ui.isOnline,
    isSidebarCollapsed : state.ui.isSidebarCollapsed,
    profile            : state.user.profile,
    selectedActionKeys : route.selectedKeys ? route.selectedKeys( state ) : {},
    store              : $.data.stores.getById( +storeID )( state ),
  };
};
const dispatch = { toggleSidebar: $.ui.isSidebarCollapsed.set, };
const connectTopBar = connect( state,
                               dispatch );

export default connectTopBar;
