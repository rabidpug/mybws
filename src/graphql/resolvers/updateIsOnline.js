export default function updateIsOnline ( _, args, { cache, } ) {
  const data = {
    ui: {
      __typename : 'ui',
      isOnline   : window.navigator.onLine,
    },
  };

  cache.writeData( { data, } );

  return null;
}
