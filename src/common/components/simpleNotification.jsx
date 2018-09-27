import Button from './Button';
import React from 'react';
import { toast, } from 'react-toastify';

const NotiComponent = ( { message, description, buttonLabel, handleClose, closeToast, } ) => (
  <span>
    <h3>{message}</h3>
    <p>{description}</p>
    {buttonLabel && (
      <Button
        onClick={ () => {
          handleClose();

          closeToast();
        } }
        size='small'
        type='primary'>
        {buttonLabel}
      </Button>
    )}
  </span>
);
const simpleNotification = (
  message, description, buttonLabel, handleClose, noDismiss
) => {
  toast.warning( <NotiComponent
    buttonLabel={ buttonLabel } description={ description } handleClose={ handleClose }
    message={ message } />,
                 {
                   autoClose    : !noDismiss,
                   closeOnClick : false,
                 } );
};

export default simpleNotification;
