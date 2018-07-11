export default function changePage ( _, { page, }, { cache, } ) {
  const data = {
    query: {
      __typename: 'query',
      page,
    },
  }

  cache.writeData( { data, } )

  return null
}
