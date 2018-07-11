export default function logout ( _, args, { cache, } ) {
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
