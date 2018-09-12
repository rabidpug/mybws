export default function changeSearch ( _, { search, }, { cache, } ) {
  const data = {
    query: {
      __typename : 'query',
      params     : {
        __typename: 'params',
        search,
      },
    },
  };

  cache.writeData( { data, } );

  return null;
}
