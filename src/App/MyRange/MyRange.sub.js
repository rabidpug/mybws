import { getPath, } from 'utilibelt'
import gql from 'graphql-tag'
import graphqlSubscriber from '../../graphql/Subscriber'
const subMyRange = graphqlSubscriber( gql`
    subscription SubscribeUserDetails($googleid: String) {
      userModified(googleid: $googleid) {
        store
        googleid
      }
    }
  `,
                                      {
                                        modelName : 'userModified',
                                        propName  : 'getUser',
                                        queryName : 'user',
                                        variables : ownProps => ( { googleid: getPath( ownProps, 'user.getUser.googleid' ), } ),
                                      } )

export default subMyRange
