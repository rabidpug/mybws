import { getPath, } from 'utilibelt';
import gql from 'graphql-tag';
import graphqlSubscriber from '../../../../graphql/Subscriber';
const subUserPanel = graphqlSubscriber( gql`
    subscription UserModifiedSub($googleid: String) {
      userModified(googleid: $googleid) {
        photo
        name
        store
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

export default subUserPanel;
