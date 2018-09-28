import { compose, graphql, } from 'react-apollo';

import gql from 'graphql-tag';

const localQuery = gql`
  query LocalAuth {
    auth @client {
      isAuthenticated
    }
    browser @client
    ui @client {
      isSidebarCollapsed
    }
  }
`;
const localQueryMapDataToProps = ( {
  data: {
    auth: { isAuthenticated, },
    browser,
    ui: { isSidebarCollapsed, },
    error,
    loading,
  },
} ) => ( {
  browser,
  error,
  isAuthenticated,
  isSidebarCollapsed,
  loading,
} );

const gqlApp = compose(
  graphql( localQuery, { props: localQueryMapDataToProps, } ),
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
      mutation UpdateLogin($JWT: String, $refreshToken: String, $redirect: String) {
        login(JWT: $JWT, refreshToken: $refreshToken, redirect: $redirect) @client
      }
    `,
           { name: 'login', } )
);

export default gqlApp;
