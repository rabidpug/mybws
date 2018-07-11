export default function login ( _, { JWT = '', refreshToken = '', }, { cache, } ) {
  const isAuthenticated = !!JWT

  console.log(JWT) //eslint-disable-line

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
}
