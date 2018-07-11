export default function login ( _, { JWT = '', refreshToken = '', }, { cache, } ) {
  const isAuthenticated = !!JWT

  localStorage.setItem( 'auth', 'y' )

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
