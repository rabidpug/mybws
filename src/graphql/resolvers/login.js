import history from '../../history';
export default function login ( _, { JWT = '', refreshToken = '', redirect = '', }, { cache, } ) {
  const isAuthenticated = !!JWT;

  localStorage.setItem( 'auth', 'y' );

  const data = {
    auth: {
      __typename: 'auth',
      JWT,
      isAuthenticated,
      refreshToken,
    },
  };

  cache.writeData( { data, } );

  redirect && history.replace( redirect );

  return null;
}
