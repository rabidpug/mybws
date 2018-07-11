export default function logout ( _, args, { cache, } ) {
  localStorage.removeItem( 'auth' )

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
}
