import gql from 'graphql-tag'
import { graphql, } from 'react-apollo'

const gqlProfileItem = graphql( gql`
    mutation($name: String, $email: String, $photo: String, $role: String, $store: Int) {
      updateUser(name: $name, email: $email, photo: $photo, role: $role, store: $store) {
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
                                { name: 'updateUser', } )

export default gqlProfileItem
