const makeTruthyArray = ( obj, data ) => {
  if ( typeof data === 'object' && !Array.isArray( data ) ) {
    data = Object.keys( data )
      .filter( v => data[v] )
      .reduce( ( p, n ) => {
        if ( typeof data[n] === 'object' ) {
          p = [
            ...p,
            data[n],
          ]
        } else {
          p = [
            ...p,
            n,
          ]
        }

        return p
      }, [] )
  }
  if ( typeof data === 'object' && !data.every( v => typeof v !== 'object' ) ) data = data.reduce( makeTruthyArray, [] )
  if ( Array.isArray( data ) ) {
    obj = [
      ...obj,
      ...data,
    ]
  } else obj.push( data )

  return obj
}

export default makeTruthyArray
