import { compose, graphql, } from 'react-apollo';

import gql from 'graphql-tag';
const gqlSignIn = compose( graphql( gql`
    query LocalAuth {
      auth @client {
        isAuthenticated
      }
    }
  ` ),
                           graphql( gql`
      mutation UpdateLogin($JWT: String, $refreshToken: String) {
        login(JWT: $JWT, refreshToken: $refreshToken) @client
      }
    `,
                                    { name: 'login', } ) );

export default gqlSignIn;
