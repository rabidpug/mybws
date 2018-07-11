import { NODE_ENV, } from './env'
import { authedAxios, } from './common/helpers/axiosHelpers'
import { toast, } from 'react-toastify'

const vapidPublicKey = 'BDdRNHkhF-kU77DIoSBFy6zLSekAoTGlA-pZQYlCq78Y-wsWu78gVZRDllsMhBHh5ELC6TsRqwQ_2FnE-vfVzN8'

/*eslint-disable no-console*/
function urlBase64ToUint8Array ( base64String ) {
  const padding = '='.repeat( ( 4 - base64String.length % 4 ) % 4 )
  const base64 = ( base64String + padding ).replace( /-/g, '+' ).replace( /_/g, '/' )

  const rawData = window.atob( base64 )
  const outputArray = new Uint8Array( rawData.length )

  for ( let i = 0; i < rawData.length; ++i ) outputArray[i] = rawData.charCodeAt( i )

  return outputArray
}

const convertedVapidKey = urlBase64ToUint8Array( vapidPublicKey )

export const subscribePush = ( deviceName, sub ) => {
  if ( NODE_ENV !== 'development' && 'serviceWorker' in navigator ) {
    navigator.serviceWorker
      .getRegistration()
      .then( registration => {
        if ( sub ) {
          return registration.pushManager.getSubscription().then( subscription => {
            if ( JSON.stringify( subscription ) !== JSON.stringify( sub ) ) toast.error( 'Push notifications can only be turned off from the device it was turned on.' )

            return subscription.unsubscribe().then( () =>
              authedAxios()
                .post( 'v1/user/push', {
                  deviceName,
                  subscription,
                } )
                .then( () => toast.success( 'Push notifications have been turned off!' ) ) )
          } )
        }
        return registration.pushManager
          .subscribe( {
            applicationServerKey : convertedVapidKey,
            userVisibleOnly      : true,
          } )
          .then( subscription => {
            if ( !subscription ) throw new Error( 'no!' )

            return authedAxios().post( 'v1/user/push', {
              deviceName,
              subscription,
            } )
          } )
      } )
      .catch( () => toast.error( 'Push notifications could not be turned on. Try again later.' ) )
  } else toast.error( 'push notifications are not available on this device' )
}
