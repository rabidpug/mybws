module.exports = ( { locator, config, } ) => {
  const { Strategy, } = require( 'passport-jwt' );

  return new Strategy( config, ( ...args ) => locator.get( 'userController' ).resign( ...args ) );
};
