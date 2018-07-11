const camelToSnake = string => {
  const upperChars = string.match( /([A-Z])/g )

  if ( !upperChars ) return string.toUpperCase()

  for ( let i = 0, n = upperChars.length; i < n; i++ ) string = string.replace( new RegExp( upperChars[i] ), `_${upperChars[i]}` )

  if ( string.slice( 0, 1 ) === '_' ) string = string.slice( 1 )

  return string.toUpperCase()
}

export default camelToSnake
