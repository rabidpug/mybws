import { compose, graphql, } from 'react-apollo'

import gql from 'graphql-tag'

const gqlMyRangeStorePager = compose( graphql( gql`
    query PagerParams {
      query @client {
        page
        dimensions {
          pageSize
        }
      }
    }
  ` ),
                                      graphql( gql`
      mutation PagerChangePage($page: Int) {
        changePage(page: $page) @client
      }
    `,
                                               { name: 'changePage', } ) )

export default gqlMyRangeStorePager
