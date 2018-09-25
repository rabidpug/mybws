import { NODE_ENV, } from './env';
import simpleNotification from 'Common/components/simpleNotification';
export default function registerServiceWorker () {
  if ( NODE_ENV === 'production' && 'serviceWorker' in navigator ) {
    window.addEventListener( 'load', () => {
      const swUrl = '/service-worker.js';

      navigator.serviceWorker.register( swUrl ).then( registration => {
        const checkUpdate = () => {
          try {
            registration.update();
          } catch ( e ) {}
        };

        window.onfocus = checkUpdate;

        window.ononline = checkUpdate;

        registration.onupdatefound = () => {
          const installingWorker = registration.installing;

          installingWorker.onstatechange = () => {
            if ( installingWorker.state === 'installed' ) {
              if ( navigator.serviceWorker.controller ) {
                simpleNotification(
                  'Update Available',
                  'There is an update available! Click below to update now, or reload the page later.',
                  'Update Now',
                  () => window.location.reload(),
                  true
                );
              }
            }
          };
        };
      } );
    } );
  }
}

export function unregister () {
  if ( 'serviceWorker' in navigator ) {
    navigator.serviceWorker.ready.then( registration => {
      registration.unregister();
    } );
  }
}
