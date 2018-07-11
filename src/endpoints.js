import { API_ENDPOINT, } from './env'

export const authEndpoint = path => `${API_ENDPOINT}/auth/${path || ''}`
export const graphqlEndpoint = () => `${API_ENDPOINT}/v1`
export const subscriptionEndpoint = () => `${API_ENDPOINT.replace( 'http', 'ws' )}/graphql`
