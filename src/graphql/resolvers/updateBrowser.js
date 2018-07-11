export default function updateBrowser ( _, args, { cache, } ) {
  return new Promise( resolve => {
    setTimeout( () => {
      const data = { browser: window.innerWidth, }

      cache.writeData( { data, } )

      resolve( null )
    }, 400 )
  } )
}
