import { compose, graphql, } from 'react-apollo';

import gql from 'graphql-tag';

const gqlApp = compose(
  graphql( gql`
    query LocalAuth {
      auth @client {
        isAuthenticated
      }
      browser @client
      ui @client {
        isSidebarCollapsed
      }
    }
  ` ),
  graphql( gql`
      mutation UpdateOnline {
        updateIsOnline @client
      }
    `,
           { name: 'updateIsOnline', } ),
  graphql( gql`
      mutation UpdateSidebar {
        updateIsSidebarCollapsed @client
      }
    `,
           { name: 'updateIsSidebarCollapsed', } ),
  graphql( gql`
      mutation UpdateBrowser {
        updateBrowser @client
      }
    `,
           { name: 'updateBrowser', } ),
  graphql( gql`
      mutation UpdateLogin($JWT: String, $refreshToken: String) {
        login(JWT: $JWT, refreshToken: $refreshToken) @client
      }
    `,
           { name: 'login', } )
);

export default gqlApp;
