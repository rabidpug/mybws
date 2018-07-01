'use strict';

const Instance = require( 'express-locator' ).get( 'Instance' );

const { Logger, } = require( '../lib/logMaker' );

class SocketService extends Instance {
  connect ( server ) {
    this.io = this.socketIO( server, this.config );

    this.io.use( ( socket, next ) => this.loggerMiddleware( socket, next ) );

    this.io.use( ( socket, next ) => this.authorize( socket, next ) );

    this.io.on( 'connection', socket => this.connectUser( socket ) );
  }

  loggerMiddleware ( socket, next ) {
    socket.log = new Logger();

    socket.write = this.log.stream.write;

    socket.stream = function () {
      this.write( this.log.getAll() );
    };

    socket.stream.bind( socket );

    socket.log.set( { handshake: socket.handshake, } );

    next();
  }

  async authorize ( socket, next ) {
    const { query: { token, refreshToken, }, } = socket.handshake;

    try {
      const payload = this.jwt.verify( token.replace( 'JWT ', '' ), this.localConfig.secretOrKey || 'secret', { ignoreExpiration: true, } );
      const expirationDate = new Date( payload.exp * 1000 );
      const { _id, } = payload;

      const search = expirationDate < new Date() ? { refreshToken, } : { _id, };
      const user = await this.userService.signUser( search, null, socket );

      if ( !user ) throw new Error( 'Authorization failed' );

      socket.user = user;

      socket.log.set( { user, } );

      return next();
    } catch ( e ) {
      socket.log.add( 'warn', 'User failed to be authenticated.' );

      socket.stream();

      return next( new Error( 'Authentication Error' ) );
    }
  }

  async connectUser ( socket ) {
    const activeSockets = this.io.sockets.server.eio.clients;

    socket.user.socketid = [
      ...socket.user.socketid.filter( id => activeSockets[id] ),
      socket.id,
    ];

    await socket.user.save( socket );

    socket.log.add( 'info', `session initiated successfully` );

    socket.on( 'disconnect', async () => {
      socket.user = await this.userService.refreshUser( socket.user._id );

      if ( socket.user.socketid ) {
        const activeSockets = this.io.sockets.server.eio.clients;

        socket.user.socketid = socket.user.socketid.filter( session => session !== socket.id && activeSockets[session] );

        socket.user.save( socket );
      }

      socket.log.add( 'info', 'session ended' );

      socket.stream();
    } );

    socket.on( 'error', e => {
      socket.log.add( 'error', `An error ocurred - ${e.message}` );

      socket.stream();
    } );
  }
}

module.exports = SocketService;
