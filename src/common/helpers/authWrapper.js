import { Loading, } from 'Common/components/Loaders';
import { connectedReduxRedirect, } from 'redux-auth-wrapper/history4/redirect';
import { replace, } from 'react-router-redux';
export const userIsAuthenticated = connectedReduxRedirect( {
  AuthenticatingComponent : Loading,
  authenticatedSelector   : state => state.user.isAuthenticated,
  authenticatingSelector  : state => state.inProgress.gettingProfile,
  redirectAction          : redirect => dispatch => {
    dispatch( replace( redirect ) );
  },
  redirectPath       : '/signin',
  wrapperDisplayName : 'userIsAuthenticated',
} );

export const userIsNotAuthenticated = connectedReduxRedirect( {
  AuthenticatingComponent : Loading,
  authenticatedSelector   : state => !state.user.isAuthenticated,
  redirectAction          : redirect => dispatch => {
    dispatch( replace( redirect ) );
  },
  redirectPath       : '/',
  wrapperDisplayName : 'userIsNotAuthenticated',
} );
