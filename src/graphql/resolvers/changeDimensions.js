export default function changeDimensions ( _, { pageSize, rowSize, columnSize, }, { cache, } ) {
  const data = {
    query: {
      __typename : 'query',
      dimensions : {
        __typename: 'dimensions',
        columnSize,
        pageSize,
        rowSize,
      },
    },
  }

  cache.writeData( { data, } )

  return null
}
