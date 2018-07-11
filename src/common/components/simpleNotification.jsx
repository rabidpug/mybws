import Button from './Button'
import React from 'react'
import { toast, } from 'react-toastify'

const NotiComponent = ( { message, description, buttonLabel, closeToast, } ) => (
  <span>
    <h3>{message}</h3>
    <p>{description}</p>
    {buttonLabel && (
      <Button
        onClick={ () => {
          closeToast()

          window.location.reload()
        } }
        size='small'
        type='primary'>
        {buttonLabel}
      </Button>
    )}
  </span>
)
const simpleNotification = (
  message, description, buttonLabel, noDismiss
) => {
  toast.warning( <NotiComponent buttonLabel={ buttonLabel } description={ description } message={ message } />, {
    autoClose    : !noDismiss,
    closeOnClick : false,
  } )
}

export default simpleNotification
