import React from 'react';

const ModalHeader = ( { children, } ) => (
  <h3
    style={ {
      margin      : '0.2rem',
      marginRight : '1.5rem',
      textAlign   : 'center',
    } }>
    {children}
  </h3>
);

export default ModalHeader;
