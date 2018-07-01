import $ from 'redux-methods';
import { connect, } from 'react-redux';
const dispatch = {
  changePublic : $.user.changePublic,
  setModal     : $.ui.modal.set,
};
const state = state => ( {
  activeRole       : $.user.profile.getActiveRole( state ),
  isChangingPublic : state.inProgress.changingProfile,
  profile          : state.user.profile,
  stores           : state.data.stores,
} );
const connectMyProfile = connect( state,
                                  dispatch );

export default connectMyProfile;
