import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import React from 'react';

const Loading = ( { error, timedOut, pastDelay = true, } ) => {
  if ( error || timedOut ) window.location.reload();

  return (
    pastDelay && (
      <FontAwesomeIcon
        icon='spinner'
        size='2x'
        spin
        style={ {
          bottom : 0,
          left   : 0,

          margin   : 'auto',
          position : 'absolute',
          right    : 0,
          top      : 0,
          zIndex   : 'inherit',
        } }
      />
    )
  );
};

export default Loading;
