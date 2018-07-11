import { compose, graphql, } from 'react-apollo'

import gql from 'graphql-tag'

const gqlMyRangeStoreArticles = compose( graphql( gql`
    query LocalArticlesParams {
      query @client {
        infiniteScroll
        page
        dimensions {
          pageSize
        }
      }
    }
  ` ),
                                         graphql( gql`
      mutation ArticlesChangePage($page: Int) {
        changePage(page: $page) @client
      }
    `,
                                                  { name: 'changePage', } ) )

export default gqlMyRangeStoreArticles
