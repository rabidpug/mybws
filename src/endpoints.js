import { API_ENDPOINT, } from './env'
const endpoint = `${API_ENDPOINT.includes( '://' ) ? '' : 'http://'}${API_ENDPOINT}` || ''

export const authEndpoint = path => `${endpoint}/auth/${path || ''}`
export const articleEndpoint = ( store, article ) => `${endpoint}/v1/article/${article || ''}`
export const pogEndpoint = store => `${endpoint}/v1/pog/${store || ''}`
export const articleQueryEndpoint = store => `${endpoint}/v1/range/${store || ''}`
