module.exports = ( { config, locator, } ) => {
  const { loggerMiddleware, } = require( '../lib/logMaker' );
  const v1 = require( '../routes/v1' );
  const errorHandler = ( err, req, res ) => {
    if ( err.isControlled ) {
      req.log.add( 'warn', err.message );

      return res.json( { error: err.message, } );
    }
    if ( !err.isBoom ) {
      req.log.add( 'error', `Unhandled error! ${err.message}` );

      req.log.add( 'error', err.stack );

      err = this.boom.boomify( err );
    }

    req.error = err.output.payload;

    return res.status( err.output.statusCode ).json( err.output.payload );
  };

  const isProd = config.server.environment === 'production';
  const express = locator.get( 'express' );
  const path = locator.get( 'path' );
  const app = express();
  const bodyParser = locator.get( 'bodyParser' );

  app.enable( 'trust proxy' );

  app.use( loggerMiddleware );

  app.use( locator.get( 'compression' )() );

  app.use( bodyParser.json() );

  app.use( bodyParser.urlencoded( { extended: 'false', } ) );

  app.use( locator.get( 'passport' ).initialize() );

  app.use( locator.get( 'morgan' )( ':method#$%:status#$%:error#$%:response-time[0]#$%:url#$%:user#$%:body#$%:log#$%:user-agent',
                                    { stream: locator.get( 'log' ).stream, } ) );

  app.use( '/v1', v1 );

  if ( isProd ) {
    app.use( locator.get( 'favicon' )( path.join( config.server.path, 'server', 'favicon.ico' ) ) );

    app.use( express.static( path.join( config.server.path, 'dist' ) ) );

    app.get( '*', ( req, res ) => {
      res.sendFile( path.join( config.server.path, 'dist', 'index.html' ) );
    } );
  }

  app.use( (
    err, req, res, next
  ) => errorHandler(
    err, req, res, next
  ) );

  return app;
};
