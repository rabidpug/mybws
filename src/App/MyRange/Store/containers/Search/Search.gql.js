import { compose, graphql, } from 'react-apollo'

import gql from 'graphql-tag'

const gqlMyRangeStoreSearch = compose( graphql( gql`
    query SearchParams {
      query @client {
        params {
          search
        }
      }
    }
  ` ),
                                       graphql( gql`
      mutation SearchChangePage($search: String) {
        changeSearch(search: $search) @client
      }
    `,
                                                { name: 'changeSearch', } ) )

export default gqlMyRangeStoreSearch
