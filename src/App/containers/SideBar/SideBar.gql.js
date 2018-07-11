import { compose, graphql, } from 'react-apollo'

import gql from 'graphql-tag'

const gqlSideBar = compose( graphql( gql`
    query LocalAuth {
      auth @client {
        isAuthenticated
      }
      browser @client
      ui @client {
        isSidebarCollapsed
        openKeys
      }
    }
  ` ),
                            graphql( gql`
      mutation SideUpdateSidebar($isSidebarCollapsed: Boolean) {
        updateIsSidebarCollapsed(isSidebarCollapsed: $isSidebarCollapsed) @client
      }
    `,
                                     { name: 'updateIsSidebarCollapsed', } ),
                            graphql( gql`
      mutation SideUpdateOpenKeys($key: String) {
        updateOpenKeys(key: $key) @client
      }
    `,
                                     { name: 'updateOpenKeys', } ) )

export default gqlSideBar
