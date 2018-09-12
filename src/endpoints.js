import { API_ENDPOINT, HOST_ADDR, } from './env';

export const authEndpoint = path => `${API_ENDPOINT}/auth/${path || ''}`;
export const signEndpoint = redirect =>
  `${API_ENDPOINT}/auth?redirect=${encodeURIComponent( HOST_ADDR + ( redirect || '/signin' ) )}`;
export const graphqlEndpoint = () => `${API_ENDPOINT}/v1`;
export const subscriptionEndpoint = () => `${API_ENDPOINT.replace( 'http', 'ws' )}/graphql`;
