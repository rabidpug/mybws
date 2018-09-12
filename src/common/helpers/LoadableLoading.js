import { LoadBar, } from 'Common/components/Loaders';
import React from 'react';
import { toast, } from 'react-toastify';

const LoadableLoading = ( { error, pastDelay, timedOut, } ) => {
  if ( timedOut || error ) {
    toast.error( 'Something went wrong :(' );

    if ( localStorage.getItem( 'reloaded' ) ) localStorage.removeItem( 'reloaded' );
    else {
      localStorage.setItem( 'reloaded', 'Y' );

      window.location.reload();
    }

    return null;
  }
  return pastDelay ? <LoadBar /> : null;
};

export default LoadableLoading;
