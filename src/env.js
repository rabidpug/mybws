export const { NODE_ENV } = process.env //eslint-disable-line

export const API_ENDPOINT = NODE_ENV === 'production' ? 'https://api.mybws.win' : 'http://localhost:8099'
export const HOST_ADDR = `${NODE_ENV === 'production' ? 'https://' : 'http://'}${window.location.host}`
