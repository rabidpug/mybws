import { ApolloLink, Observable, split, } from 'apollo-link'

import { API_ENDPOINT, } from '../env'
import { ApolloClient, } from 'apollo-client'
import { HttpLink, } from 'apollo-link-http'
import { WebSocketLink, } from 'apollo-link-ws'
import { getMainDefinition, } from 'apollo-utilities'
import gql from 'graphql-tag'
import initialState from './initialState'
import { onError, } from 'apollo-link-error'
import { toast, } from 'react-toastify'
import { withClientState, } from 'apollo-link-state'

let client

export default function apollo ( cache ) {
  if ( client ) return client
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
          console.log('login') //eslint-disable-line

          localStorage.setItem( 'JWT', JWT )

          localStorage.setItem( 'refreshToken', refreshToken )

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
          console.log('logout') //eslint-disable-line

          localStorage.removeItem( 'JWT' )

          localStorage.removeItem( 'refreshToken' )

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

  const request = async operation => {
    /* eslint-disable */
    if (!operation.operationName) console.log('req', operation)
    const {
      data: { auth = {} },
    } = await client.query({
      /* eslint-enable */
      query: gql`
        query {
          auth @client {
            JWT
            refreshToken
          }
        }
      `,
    } )

    const Authorization = auth.JWT
    const refreshtoken = auth.refreshToken

    if ( Authorization && refreshtoken ) {
      operation.setContext( {
        headers: {
          Authorization,
          refreshtoken,
        },
      } )
    }
  }

  const requestLink = new ApolloLink( ( operation, forward ) =>
    new Observable( observer => {
      let handle

      Promise.resolve( operation )
        .then( oper => request( oper ) )
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
  const httpLink = new HttpLink( {
    credentials : 'same-origin',
    uri         : `${API_ENDPOINT}/v2`,
  } )
  const wsLink = new WebSocketLink( {
    options: {
      connectionParams () {
        const authToken = localStorage.getItem( 'JWT' )
        const refreshToken = localStorage.getItem( 'Tn' )

        return {
          authToken,
          refreshToken,
        }
      },
      reconnect : true,
      timeout   : 30000,
    },
    uri: `ws://${API_ENDPOINT.replace( /^(.*:\/\/)/, '' )}/graphql`,
  } )

  const link = split( ( { query, } ) => {
    const { kind, operation, } = getMainDefinition( query )

    return kind === 'OperationDefinition' && operation === 'subscription'
  },
                      wsLink,
                      httpLink )

  client = new ApolloClient( {
    cache,
    link: ApolloLink.from( [
      onError( ( { graphQLErrors, networkError, operation, } ) => {
        if ( graphQLErrors ) graphQLErrors.map( ( { message, } ) => toast.error( message ) )

        if (networkError) console.log(networkError, operation) //eslint-disable-line
        return null
        // return forward( operation )
      } ),
      stateLink,
      requestLink,
      link,
    ] ),
  } )

  return client
}
