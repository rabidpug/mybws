import { compose, } from 'redux';
import { getPath, } from 'utilibelt';
import gql from 'graphql-tag';
import { graphql, } from 'react-apollo';
const gqlMyProfile = compose( graphql( gql`
      query GetUser {
        getUser {
          photos {
            value
            selected
          }
          names {
            value
            selected
          }
          emails {
            value
            selected
          }
          stores {
            value
            selected
          }
          roles {
            value
            selected
          }
          pushSubscriptions {
            deviceName
            key
          }
          role
          googleid
        }
      }
    `,
                                       { name: 'user', } ),
                              graphql( gql`
      query GetStores($ids: [Int]) {
        getStores(ids: $ids) {
          id
          name
        }
      }
    `,
                                       {
                                         name    : 'stores',
                                         options : ( { user = {}, } ) => ( {
                                           variables: {
                                             ids: getPath(
                                               user, 'getUser.stores', [], res => res.map( store => parseInt( store.value ) )
                                             ),
                                           },
                                         } ),
                                         skip: ( { user = {}, } ) => !user.getUser,
                                       } ) );

export default gqlMyProfile;
