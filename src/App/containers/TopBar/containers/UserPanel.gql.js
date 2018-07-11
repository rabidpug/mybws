import { compose, } from 'redux'
import { getPath, } from 'utilibelt'
import gql from 'graphql-tag'
import { graphql, } from 'react-apollo'
import storeFromPath from 'Common/helpers/storeFromPath'

const gqlUserPanel = compose( graphql( gql`
    query LocalAuthUserPanel {
      auth @client {
        isAuthenticated
      }
      ui @client {
        isOnline
      }
    }
  ` ),
                              graphql( gql`
      query UserDetails {
        getUser {
          photo
          name
          store
          role
          googleid
        }
      }
    `,
                                       { name: 'user', } ),
                              graphql( gql`
      query getStoreDetails($id: Int) {
        getStore(id: $id) {
          id
          organisation
          name
        }
      }
    `,
                                       {
                                         name: 'store',
                                         options ( { user = {}, location: { pathname, }, } ) {
                                           const pathStore = storeFromPath( pathname )

                                           return { variables: { id: pathStore.length === 4 ? +pathStore : getPath( user, 'getUser.store' ), }, }
                                         },
                                         skip ( { user = {}, data = {}, location: { pathname, }, } ) {
                                           const pathStore = storeFromPath( pathname )

                                           return !( getPath( data, 'auth.isAuthenticated' ) && pathStore.length === 4
                                             ? +pathStore
                                             : getPath( user, 'getUser.store' ) )
                                         },
                                       } ) )

export default gqlUserPanel
