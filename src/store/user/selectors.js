import createSelector from 'selectorator';
import { getPath, } from 'utilibelt';

const selectors = {
  profile: {
    getActiveRole: createSelector( [ `user.profile.roles`, ], ( roles = [] ) =>
      getPath( roles.filter( role => role && role.selected ), '0.value' ) ),
    getActiveStore: createSelector( [ 'user.profile.stores', ], ( stores = [] ) =>
      getPath( stores.filter( store => store.selected ), '0.value' ) ),
  },
};

export default selectors;
