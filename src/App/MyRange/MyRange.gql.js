import { compose, } from 'redux';
import { getPath, } from 'utilibelt';
import gql from 'graphql-tag';
import { graphql, } from 'react-apollo';
import storeFromPath from 'Common/helpers/storeFromPath';

const gqlMyRange = compose( graphql( gql`
      query GetUserDetails {
        getUser {
          store
          googleid
        }
      }
    `,
                                     { name: 'user', } ),
                            graphql( gql`
      query GetStoreDetails($id: Int) {
        getStore(id: $id) {
          id
          name
        }
      }
    `,
                                     {
                                       name: 'store',
                                       options ( { user = {}, location: { pathname, }, } ) {
                                         const pathStore = storeFromPath( pathname );

                                         return { variables: { id: pathStore.length === 4 ? +pathStore : getPath( user, 'getUser.store' ), }, };
                                       },
                                       skip ( { user = {}, location: { pathname, }, } ) {
                                         const pathStore = storeFromPath( pathname );

                                         return !( pathStore.length === 4 ? +pathStore : getPath( user, 'getUser.store' ) );
                                       },
                                     } ) );

export default gqlMyRange;
