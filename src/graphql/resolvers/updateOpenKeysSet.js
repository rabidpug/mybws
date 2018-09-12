import gql from 'graphql-tag';
export default function updateOpenKeysSet ( _, { keys, }, { cache, } ) {
  const query = gql`
    query {
      query @client {
        infiniteScroll
        params {
          groupFilters
          statusFilters
          sort
          descendingSort
          exactSearch
        }
      }
    }
  `;
  const { query: oldQuery, } = cache.readQuery( { query, } );
  const data = { query: oldQuery, };

  keys.forEach( key => {
    if ( key === 'infiniteScroll' ) data.query.infiniteScroll = !data.query.infiniteScroll;
    else if ( [
      'exactSearch',
      'descendingSort',
    ].includes( key ) ) data.query.params[key] = !data.query.params[key];
    else {
      const [
        paramKey,
        value,
      ] = key.split( '.' );

      data.query.params[paramKey] = data.query.params[paramKey].includes( value )
        ? data.query.params[paramKey].filter( k => k !== value )
        : [
          ...data.query.params[paramKey],
          value,
        ];
    }
  } );

  cache.writeData( { data, } );

  return null;
}
