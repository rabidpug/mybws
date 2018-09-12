import * as resolvers from './resolvers';

import { ApolloLink, Observable, split, } from 'apollo-link';
import { graphqlEndpoint, subscriptionEndpoint, } from '../endpoints';

import { ApolloClient, } from 'apollo-client';
import { BatchHttpLink, } from 'apollo-link-batch-http';
import { WebSocketLink, } from 'apollo-link-ws';
import customFetch from './customFetch';
import { getMainDefinition, } from 'apollo-utilities';
import gql from 'graphql-tag';
import initialState from './initialState';
import { onError, } from 'apollo-link-error';
import { toast, } from 'react-toastify';
import { withClientState, } from 'apollo-link-state';

let client;

export default function apollo ( cache ) {
  if ( client ) return client;

  const stateLink = withClientState( {
    cache,
    defaults  : initialState,
    resolvers : { Mutation: { ...resolvers, }, },
  } );

  const authOperation = async operation => {
    const { data: { auth = {}, }, } = await apollo().query( {
      query: gql`
        query {
          auth @client {
            JWT
            refreshToken
          }
        }
      `,
    } );

    const authorization = auth.JWT;

    operation.setContext( { headers: { authorization, }, } );
  };

  const requestLink = new ApolloLink( ( operation, forward ) =>
    new Observable( observer => {
      let handle;

      Promise.resolve( operation )
        .then( op => authOperation( op ) )
        .then( () => {
          handle = forward( operation ).subscribe( {
            complete : observer.complete.bind( observer ),
            error    : observer.error.bind( observer ),
            next     : observer.next.bind( observer ),
          } );
        } )
        .catch( observer.error.bind( observer ) );

      return () => {
        if ( handle ) handle.unsubscribe();
      };
    } ) );

  const httpLink = new BatchHttpLink( {
    batchMax    : 30,
    credentials : 'same-origin',
    fetch       : customFetch,
    uri         : graphqlEndpoint(),
  } );

  const wsLink = new WebSocketLink( {
    options: {
      reconnect : true,
      timeout   : 30000,
    },
    uri: subscriptionEndpoint(),
  } );

  const link = split( ( { query, } ) => {
    const { kind, operation, } = getMainDefinition( query );

    return kind === 'OperationDefinition' && operation === 'subscription';
  },
                      wsLink,
                      httpLink );

  client = new ApolloClient( {
    cache,
    link: ApolloLink.from( [
      onError( ( { graphQLErrors, } ) => {
        if ( graphQLErrors ) graphQLErrors.map( ( { message, } ) => !message.includes( 'Context creation failed: User not logged in' ) && toast.error( message ) );
      } ),
      stateLink,
      requestLink,
      link,
    ] ),
  } );

  return client;
}
