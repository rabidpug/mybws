import apollo from '.'
import { authEndpoint, } from '../endpoints'
import { getPath, } from 'utilibelt'
import gql from 'graphql-tag'
import { toast, } from 'react-toastify'
const customFetch = ( uri, options ) => {
  let refreshingPromise = null

  const initialRequest = fetch( uri, options )

  return initialRequest.then( response => response.text() ).then( text => {
    let json

    try {
      json = JSON.parse( text )
    } catch ( e ) {}

    if ( getPath( json, 'errors.0.message' ) === 'Context creation failed: User not logged in' ) {
      if ( !refreshingPromise ) {
        refreshingPromise = apollo()
          .query( {
            query: gql`
              query {
                auth @client {
                  refreshToken
                  isAuthenticated
                }
              }
            `,
          } )
          .then( ( { data: { auth = {}, }, } ) => {
            const refreshtoken = auth.refreshToken

            return fetch( authEndpoint(), {
              headers : { authorization: refreshtoken, },
              method  : 'POST',
            } ).then( refreshResponse => {
              if ( refreshResponse.ok && auth.isAuthenticated ) {
                return refreshResponse.text().then( refreshTEXT => {
                  let refreshJSON

                  try {
                    refreshJSON = JSON.parse( refreshTEXT )
                  } catch ( e ) {}

                  return apollo()
                    .mutate( {
                      mutation: gql`
                        mutation UpdateLogin($JWT: String, $refreshToken: String) {
                          login(JWT: $JWT, refreshToken: $refreshToken) @client
                        }
                      `,
                      variables: {
                        JWT          : refreshJSON.token,
                        refreshToken : refreshJSON.refreshToken,
                      },
                    } )
                    .then( () => refreshJSON.token )
                } )
              } else if ( auth.isAuthenticated ) {
                toast.warn( 'Your session has timed out. Please log in again.' )

                return apollo().mutate( {
                  mutation: gql`
                      mutation {
                        logout @client
                      }
                    `,
                } )
              }
            } )
          } )
      }
      return refreshingPromise.then( newAccessToken => {
        refreshingPromise = null

        options.headers.authorization = newAccessToken

        return fetch( uri, options )
      } )
    }
    const result = {}

    result.ok = true

    result.text = () =>
      new Promise( resolve => {
        resolve( text )
      } )

    return result
  } )
}

export default customFetch
