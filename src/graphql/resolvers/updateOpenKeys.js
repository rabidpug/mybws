import gql from 'graphql-tag';
export default function updateOpenKeys ( _, { key, }, { cache, } ) {
  const query = gql`
    query {
      ui @client {
        openKeys
      }
    }
  `;
  const { ui: { openKeys: prevOpenKeys, }, } = cache.readQuery( { query, } );

  const data = {
    ui: {
      __typename : 'ui',
      openKeys   : prevOpenKeys.includes( key ) ? prevOpenKeys.filter( k => k !== key ) : [
        ...prevOpenKeys,
        key,
      ],
    },
  };

  cache.writeData( { data, } );

  return null;
}
