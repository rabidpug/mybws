import { compose, graphql, } from 'react-apollo'

import gql from 'graphql-tag'

const gqlTopBar = compose( graphql( gql`
    query LocalAuth {
      auth @client {
        isAuthenticated
      }
      browser @client
      ui @client {
        isSidebarCollapsed
        isMobile
        openKeys
      }
      query @client {
        infiniteScroll
        params {
          groupFilters
          statusFilters
          sort
          descendingSort
          exactSearch
        }
      }
    }
  ` ),
                           graphql( gql`
      mutation TopUpdateSidebar($isSidebarCollapsed: Boolean) {
        updateIsSidebarCollapsed(isSidebarCollapsed: $isSidebarCollapsed) @client
      }
    `,
                                    { name: 'updateIsSidebarCollapsed', } ),
                           graphql( gql`
      mutation TopOpenKeys($key: String) {
        updateOpenKeys(key: $key) @client
      }
    `,
                                    { name: 'updateOpenKeys', } ) )

export default gqlTopBar
