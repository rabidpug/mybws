module.exports = ( { locator, config, } ) => {
  const { OAuth2Strategy, } = require( 'passport-google-oauth' );

  return new OAuth2Strategy( config, ( ...args ) => locator.get( 'userController' ).sign( ...args ) );
};
