import { getPath, } from 'utilibelt';
import gql from 'graphql-tag';
import graphqlSubscriber from '../../graphql/Subscriber';
const subMyProfile = graphqlSubscriber( gql`
    subscription SubscribeToUser($googleid: String) {
      userModified(googleid: $googleid) {
        photos {
          value
          selected
        }
        names {
          value
          selected
        }
        emails {
          value
          selected
        }
        stores {
          value
          selected
        }
        roles {
          value
          selected
        }
        pushSubscriptions {
          deviceName
          key
        }
        role
        googleid
      }
    }
  `,
                                        {
                                          modelName : 'userModified',
                                          propName  : 'getUser',
                                          queryName : 'user',
                                          variables : ownProps => ( { googleid: getPath( ownProps, 'user.getUser.googleid' ), } ),
                                        } );

export default subMyProfile;
