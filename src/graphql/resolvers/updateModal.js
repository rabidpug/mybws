export default function updateModal ( _, { modal = {}, }, { cache, } ) {
  const data = {
    ui: {
      __typename : 'ui',
      modal      : {
        __typename : 'modal',
        body       : {
          __typename: 'body',
          ...modal ? modal.body : {},
        },
        header: modal && modal.header,
      },
    },
  }

  cache.writeData( { data, } )

  return null
}
