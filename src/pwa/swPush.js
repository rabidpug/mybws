/*global clients */

self.addEventListener( 'push', event => {
  const data = event.data.json();
  const { title, } = data;

  const body = {
    body : data.body,
    data,
    icon : data.icon,
    tag  : data.tag,
  };

  event.waitUntil( clients.matchAll( { type: 'window', } ).then( list => {
    const isFocused = list.filter( client => client.url.includes( data.scope ) ).reduce( ( p, n ) => p || n.focused, false );

    return isFocused || self.registration.showNotification( title, body );
  } ) );
} );

self.addEventListener( 'notificationclick', event => {
  event.notification.close();

  event.waitUntil( clients.matchAll( { type: 'window', } ).then( list => {
    list
      .filter( client => client.url.includes( event.notification.data.scope ) && 'focus' in client && !client.focused )
      .forEach( client => client.focus() );

    if ( clients.openWindow ) return clients.openWindow( `/${event.notification.data.scope}` );
  } ) );
} );
