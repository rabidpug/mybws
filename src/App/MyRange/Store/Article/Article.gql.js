import gql from 'graphql-tag'
import { graphql, } from 'react-apollo'
import storeFromPath from 'Common/helpers/storeFromPath'

const district = `
    dc
    dsd
    performance
    storeCount
    price {
      ea
      mpk
      car
    }
`
const organisation = `
nsw {
  ${district}
}
sa {
  ${district}
}
nt {
  ${district}
}
vic {
  ${district}
}
tas {
  ${district}
}
wa {
  ${district}
}
qld {
  ${district}
}
`

const gqlMyRangeStoreArticle = graphql( gql`
    query ArticleDetails($id: Int $store: Int) {
      getArticle(id: $id) {
        id
        bws {
          ${organisation}
        }
        dms {
          ${organisation}
        }
        category
        description
        group
        segment
        subcategory
        cass {
          ea
          mpk
          car
        }
      }
      getUser {
        role
      }
      getStore(id: $store) {
        id
        area
        avgsales
        buildingarea
        centrestore
        channel
        company
        dcs
        district
        express
        metrostore
        organisation
        pickup
        region
        resortstore
        restrictions {
          mandatory
          voluntary
        }
        tradearea
      }
      getPlanograms(store: $store article: $id) {
        category
        standard
        articles {
          onshow {
            notes
            article
            updated
          }
        }
      }
    }
  `,
                                        {
                                          name: 'article',
                                          options ( { match, item = +match.params._id, location: { pathname, }, } ) {
                                            const pathStore = storeFromPath( pathname )

                                            return {
                                              variables: {
                                                id    : item,
                                                store : pathStore,
                                              },
                                            }
                                          },
                                          skip ( { match, item = +match.params._id, } ) {
                                            return !item
                                          },
                                        } )

export default gqlMyRangeStoreArticle
