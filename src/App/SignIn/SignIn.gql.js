import gql from 'graphql-tag'
import { graphql, } from 'react-apollo'
const gqlSignIn = graphql( gql`
  query LocalAuth {
    auth @client {
      isAuthenticated
    }
  }
` )

export default gqlSignIn
