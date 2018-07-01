import React from 'react';
import { Spinner, } from 'Common/components/Loaders';
import logo from '../../assets/logo.png';

const LoggingIn = () => (
  <div
    style={ {
      backgroundColor : '#968A83',
      height          : '100vh',
      position        : 'relative',
      width           : '100vw',
    } }>
    <img
      src={ logo }
      style={ {
        left      : '50%',
        position  : 'absolute',
        top       : '50%',
        transform : 'translate(-50%,-50%) scale(0.6)',
      } }
    />
    <Spinner style={ { top: '60%', } } />
  </div>
);

export default LoggingIn;
