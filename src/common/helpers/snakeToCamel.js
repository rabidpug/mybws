const snakeToCamel = obj =>
  Object.keys( obj ).reduce( ( p, n ) => {
    const s = n.toLowerCase().replace( /_([a-z])/g, g => g[1].toUpperCase() );

    p[s] = obj[n];

    return p;
  }, {} );

export default snakeToCamel;
