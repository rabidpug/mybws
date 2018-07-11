export const { NODE_ENV } = process.env //eslint-disable-line
const { API_ENDPOINT: endpoint } = process.env //eslint-disable-line

export const API_ENDPOINT =
  `${!endpoint || endpoint.includes( '://' ) ? '' : 'http://'}${endpoint}` || 'http://localhost:8099'
