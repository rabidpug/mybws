module.exports = ( { locator, config, } ) => {
  const app = locator.get( 'app' );

  const server = locator.get( 'http' ).createServer( app );

  server.listen( config.port, () =>
    locator.get( 'log' ).info( `${config.name} server is running on port - ${config.port}` ) );

  return server;
};
