export const set = payload => payload;
export const toggle = ( payload, slice ) => !slice;
export const add = ( payload, slice ) => {
  if ( Array.isArray( slice ) ) {
    return [
      ...slice,
      ...Array.isArray( payload ) ? payload : [ payload, ],
    ];
  } else if ( typeof slice === 'object' && typeof payload === 'object' ) {
    return {
      ...slice,
      ...payload,
    };
  } else return slice;
};
export const addOrRemove = ( payload, slice ) =>
  Array.isArray( slice ) && slice.includes( payload )
    ? slice.filter( val => val !== payload )
    : Array.isArray( slice )
      ? [
        ...slice,
        payload,
      ]
      : slice;

export const remove = ( payload, slice ) => {
  if ( Array.isArray( slice ) ) return slice.filter( val => val !== payload );
  else if ( typeof slice === 'object' ) {
    delete slice[payload];

    return slice;
  } else return slice;
};
export const addFromId = ( payload, slice ) => {
  payload = Array.isArray( payload ) ? payload : [ payload, ];

  payload.forEach( load => {
    if ( load && load._id ) slice[load._id] = load;
  } );

  return slice;
};
export const increment = ( payload, slice ) => slice + payload;
export const decrement = ( payload, slice ) => slice - payload;
export const reset = ( payload, slice, initial ) => initial;
