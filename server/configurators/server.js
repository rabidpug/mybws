module.exports = ( { locator, config, } ) => {
  const server = locator.get( 'http' ).createServer( locator.get( 'app' ) );

  server.listen( config.port, () =>
    locator.get( 'log' ).info( `${config.name} server is running on port - ${config.port}` ) );

  return server;
};
