/* eslint-disable no-console */
export const formatDate = ( v, f = 'HH:MM:SS dd/mm/yyyy' ) => {
  const withZero = p => p < 10 ? `0${p}` : p;
  const od = new Date( v );
  const d = {
    H  : od.getHours(),
    M  : od.getMinutes(),
    S  : od.getSeconds(),
    d  : od.getDate(),
    m  : od.getMonth() + 1,
    yy : od
      .getFullYear()
      .toString()
      .slice( -2, od.getFullYear().toString().length ),
  };

  Object.keys( d ).forEach( p => p === 'yy' ? d[p + p] = od.getFullYear() : d[p + p] = withZero( d[p] ) );

  return Object.keys( d )
    .sort( ( p, n ) => n.length - p.length )
    .reduce( ( p, n ) => p.includes( n ) ? p.replace( n, d[n] ) : p,

             f );
};
