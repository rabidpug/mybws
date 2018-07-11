import { ApolloLink, Observable, split, } from 'apollo-link'
import { authEndpoint, graphqlEndpoint, subscriptionEndpoint, } from '../endpoints'

import { ApolloClient, } from 'apollo-client'
import { BatchHttpLink, } from 'apollo-link-batch-http'
import { WebSocketLink, } from 'apollo-link-ws'
import { getMainDefinition, } from 'apollo-utilities'
import { getPath, } from 'utilibelt'
import gql from 'graphql-tag'
import initialState from './initialState'
import { onError, } from 'apollo-link-error'
import { toast, } from 'react-toastify'
import { withClientState, } from 'apollo-link-state'

let client

export default function apollo ( cache ) {
  if ( client ) return client
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
          refreshingPromise = client
            .query( {
              query: gql`
                query {
                  auth @client {
                    refreshToken
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
                if ( refreshResponse.ok ) {
                  return refreshResponse.text().then( refreshTEXT => {
                    let refreshJSON

                    try {
                      refreshJSON = JSON.parse( refreshTEXT )
                    } catch ( e ) {}

                    return client
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
                } else {
                  toast.warn( 'Your session has timed out. Please log in again.' )

                  return client.mutate( {
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
  /* eslint-enable */
  const stateLink = withClientState( {
    cache,
    defaults  : initialState,
    resolvers : {
      Mutation: {
        changeDimensions ( _, { pageSize, rowSize, columnSize, }, { cache, } ) {
          const data = {
            query: {
              __typename : 'query',
              dimensions : {
                __typename: 'dimensions',
                columnSize,
                pageSize,
                rowSize,
              },
            },
          }

          cache.writeData( { data, } )

          return null
        },
        changePage ( _, { page, }, { cache, } ) {
          const data = {
            query: {
              __typename: 'query',
              page,
            },
          }

          cache.writeData( { data, } )

          return null
        },
        changeSearch ( _, { search, }, { cache, } ) {
          const data = {
            query: {
              __typename : 'query',
              params     : {
                __typename: 'params',
                search,
              },
            },
          }

          cache.writeData( { data, } )

          return null
        },
        login ( _, { JWT = '', refreshToken = '', }, { cache, } ) {
          const isAuthenticated = !!JWT

          localStorage.setItem( 'JWT', JWT )

          localStorage.setItem( 'RFT', refreshToken )

          const data = {
            auth: {
              __typename: 'auth',
              JWT,
              isAuthenticated,
              refreshToken,
            },
          }

          cache.writeData( { data, } )

          return null
        },
        logout ( _, args, { cache, } ) {
          localStorage.removeItem( 'JWT' )

          localStorage.removeItem( 'RFT' )

          const data = {
            auth: {
              __typename      : 'auth',
              JWT             : '',
              isAuthenticated : false,
              refreshToken    : '',
            },
          }

          cache.writeData( { data, } )

          return null
        },
        async updateBrowser ( _, args, { cache, } ) {
          return new Promise( resolve => {
            setTimeout( () => {
              const data = { browser: window.innerWidth, }

              cache.writeData( { data, } )

              resolve( null )
            }, 400 )
          } )
        },
        updateIsOnline ( _, args, { cache, } ) {
          const data = {
            ui: {
              __typename : 'ui',
              isOnline   : window.navigator.onLine,
            },
          }

          cache.writeData( { data, } )

          return null
        },
        updateIsSidebarCollapsed ( _, args = {}, { cache, } ) {
          const query = gql`
            query {
              ui {
                isSidebarCollapsed
              }
            }
          `
          const previous = cache.readQuery( { query, } )

          const data = {
            ui: {
              __typename         : 'ui',
              isSidebarCollapsed :
                args && typeof args.isSidebarCollapsed === 'boolean'
                  ? args.isSidebarCollapsed
                  : !previous.ui.isSidebarCollapsed,
            },
          }

          cache.writeData( { data, } )

          return null
        },
        updateModal ( _, { modal = {}, }, { cache, } ) {
          const data = {
            ui: {
              __typename : 'ui',
              modal      : {
                __typename : 'modal',
                body       : {
                  __typename: 'body',
                  ...modal ? modal.body : {},
                },
                header: modal && modal.header,
              },
            },
          }

          cache.writeData( { data, } )

          return null
        },
        updateOpenKeys ( _, { key, }, { cache, } ) {
          const query = gql`
            query {
              ui @client {
                openKeys
              }
            }
          `
          const { ui: { openKeys: prevOpenKeys, }, } = cache.readQuery( { query, } )

          const data = {
            ui: {
              __typename : 'ui',
              openKeys   : prevOpenKeys.includes( key ) ? prevOpenKeys.filter( k => k !== key ) : [
                ...prevOpenKeys,
                key,
              ],
            },
          }

          cache.writeData( { data, } )

          return null
        },
        updateOpenKeysSet ( _, { keys, }, { cache, } ) {
          const query = gql`
            query {
              query @client {
                infiniteScroll
                params {
                  groupFilters
                  statusFilters
                  sort
                  descendingSort
                  exactSearch
                }
              }
            }
          `
          const { query: oldQuery, } = cache.readQuery( { query, } )
          const data = { query: oldQuery, }

          keys.forEach( key => {
            if ( key === 'infiniteScroll' ) data.query.infiniteScroll = !data.query.infiniteScroll
            else if ( [
              'exactSearch',
              'descendingSort',
            ].includes( key ) ) data.query.params[key] = !data.query.params[key]
            else {
              const [
                paramKey,
                value,
              ] = key.split( '.' )

              data.query.params[paramKey] = data.query.params[paramKey].includes( value )
                ? data.query.params[paramKey].filter( k => k !== value )
                : [
                  ...data.query.params[paramKey],
                  value,
                ]
            }
          } )

          cache.writeData( { data, } )

          return null
        },
      },
    },
  } )

  const authOperation = async operation => {
    const { data: { auth = {}, }, } = await client.query( {
      query: gql`
        query {
          auth @client {
            JWT
            refreshToken
          }
        }
      `,
    } )

    const authorization = auth.JWT

    operation.setContext( { headers: { authorization, }, } )
  }

  const requestLink = new ApolloLink( ( operation, forward ) =>
    new Observable( observer => {
      let handle

      Promise.resolve( operation )
        .then( op => authOperation( op ) )
        .then( () => {
          handle = forward( operation ).subscribe( {
            complete : observer.complete.bind( observer ),
            error    : observer.error.bind( observer ),
            next     : observer.next.bind( observer ),
          } )
        } )
        .catch( observer.error.bind( observer ) )

      return () => {
        if ( handle ) handle.unsubscribe()
      }
    } ) )
  const httpLink = new BatchHttpLink( {
    batchMax    : 30,
    credentials : 'same-origin',
    fetch       : customFetch,
    uri         : graphqlEndpoint(),
  } )
  const wsLink = new WebSocketLink( {
    options: {
      connectionParams () {
        const authToken = localStorage.getItem( 'JWT' )
        const refreshToken = localStorage.getItem( 'RFT' )

        return {
          authToken,
          refreshToken,
        }
      },
      reconnect : true,
      timeout   : 30000,
    },
    uri: subscriptionEndpoint(),
  } )

  const link = split( ( { query, } ) => {
    const { kind, operation, } = getMainDefinition( query )

    return kind === 'OperationDefinition' && operation === 'subscription'
  },
                      wsLink,
                      httpLink )

  client = new ApolloClient( {
    cache,
    fetchPolicy : 'cache-and-network',
    link        : ApolloLink.from( [
      onError( ( { graphQLErrors, } ) => {
        if ( graphQLErrors ) graphQLErrors.map( ( { message, } ) => toast.error( message ) )
      } ),
      stateLink,
      requestLink,
      link,
    ] ),
  } )

  return client
}
