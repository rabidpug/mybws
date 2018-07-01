'use strict';

const Instance = require( 'express-locator' ).get( 'Instance' );

class UserController extends Instance {
  async sign (
    req, accessToken, refreshToken, profile, done
  ) {
    req.log.add( 'request', 'Google authentication' );

    try {
      const user = this.userService.constructUser( profile, req );

      const { googleid, } = user;
      const result = await this.userService.signUser( { googleid, }, user, req );

      done( null, result );
    } catch ( err ) {
      done( null, null, err );
    }
  }

  async resign ( req, jwtPayload, done ) {
    req.log.add( 'request', 'JWT validation' );

    const expirationDate = new Date( jwtPayload.exp * 1000 );
    const { headers: { refreshtoken: refreshToken, }, } = req;

    const { _id, } = jwtPayload;

    const search = expirationDate < new Date() ? { refreshToken, } : { _id, };

    search.refreshToken && req.log.add( 'warn', `Token expired, using refresh token` );

    const result = await this.userService.signUser( search, null, req );

    done( null, result );
  }

  redirect ( req, res ) {
    const { user, } = req;
    const { token, refreshToken, } = user;

    const htmlRedirector = `
<html>
  <script>
    window.localStorage.setItem('JWT', '${token}');
    window.localStorage.setItem('refreshToken', '${refreshToken}');
    window.location.href = window.localStorage.getItem('redirect') || '/';
  </script>
</html>`;

    req.log.add( 'info', 'redirecting client with token' );

    res.send( htmlRedirector );
  }

  async dopush ( req, res, next ) {
    req.log.add( 'request', 'Push notification subscription' );

    const {
      body: { subscription, deviceName, },
      user,
    } = req;

    let noDeviceMatch = false;
    const newArray = user.pushSubscriptions.filter( sub => {
      const isMatch = JSON.stringify( sub.key ) === JSON.stringify( subscription );

      if ( isMatch && sub.deviceName !== deviceName ) noDeviceMatch = sub.deviceName;
      return !isMatch;
    } );
    const isAdding = newArray.length === user.pushSubscriptions.length;

    if ( noDeviceMatch ) next( new this.Error( `Push notifications already registered for device under the name ${noDeviceMatch}` ) );
    else {
      if ( isAdding ) {
        user.pushSubscriptions = [
          ...user.pushSubscriptions,
          {
            deviceName,
            key: subscription,
          },
        ];
      } else user.pushSubscriptions = newArray;

      await user.save( req );

      if ( user.pushSubscriptions.length > 0 ) {
        const data = {
          body  : `Push notifications have been ${isAdding ? 'activated' : 'deactivated'} for the device ${deviceName}`,
          scope : 'myProfile',
          title : 'Push notification subscriptions change',
        };

        user.pushSubscriptions.forEach( sub => this.webpush.sendNotification( sub.key, JSON.stringify( data ) ) );
      }

      req.log.add( 'info', `Subscription ${isAdding ? 'saved to' : 'removed from'} profile` );

      res.json( { status: 'ok', } );
    }
  }

  fetch ( req, res ) {
    req.log.add( 'request', 'Fetch profile' );

    const { user, } = req;

    res.json( { user, } );
  }

  async update ( req, res ) {
    req.log.add( 'request', 'Update profile' );

    const { user, body, } = req;
    const [ key, ] = Object.keys( body );
    const value = body[key];
    const isDeletingValue = user[key].some( item => ( item.value === value || item.value._id === value ) && item.selected );
    const isNewItem = user[key].every( item => !( item.value === value || item.value._id === value ) );

    if ( isDeletingValue && user[key].length === 1 && key !== 'stores' ) throw new this.Error( `Deletion not possible - cannot delete last value` );
    else {
      const type = isDeletingValue ? 'delete' : isNewItem ? 'add' : 'modify';
      const body = {
        key,
        type,
        user,
        value,
      };

      await this.userService.updateProfile( body, req );

      res.json( { status: 'ok', } );
    }
  }
}

module.exports = UserController;
