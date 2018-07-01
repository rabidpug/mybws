import MiniCard from './MiniCard';
import React from 'react';

const Modal = ( { body, header, onClose, } ) => (
  <div
    style={ {
      backgroundColor : 'rgba(0,0,0,0.2)',
      height          : body && header ? '100vh' : '0vh',
      left            : 0,
      opacity         : body && header ? 1 : 0,
      position        : 'fixed',
      top             : 0,
      transition      : 'opacity 0.2s ease-in-out',
      width           : '100vw',
      zIndex          : 99998,
    } }>
    <MiniCard
      key='2'
      style={ {
        display    : 'block',
        left       : 0,
        margin     : 'auto',
        maxWidth   : '95%',
        minWidth   : 300,
        position   : 'absolute',
        right      : 0,
        top        : `${body && header ? 50 : 0}%`,
        transform  : 'translateY(-100%)',
        transition : 'top 0.3s ease-in-out 0.2s',
        width      : '30%',
        zIndex     : 99999,
      } }>
      <MiniCard.Header onCloseClick={ onClose }>{header}</MiniCard.Header>
      <MiniCard.Body showChildren>{body}</MiniCard.Body>
    </MiniCard>
  </div>
);

export default Modal;
