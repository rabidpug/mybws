import gql from 'graphql-tag'
export default function updateIsSidebarCollapsed ( _, args = {}, { cache, } ) {
  const query = gql`
    query {
      ui {
        isSidebarCollapsed
      }
    }
  `
  const previous = cache.readQuery( { query, } )

  const data = {
    ui: {
      __typename         : 'ui',
      isSidebarCollapsed :
        args && typeof args.isSidebarCollapsed === 'boolean'
          ? args.isSidebarCollapsed
          : !previous.ui.isSidebarCollapsed,
    },
  }

  cache.writeData( { data, } )

  return null
}
