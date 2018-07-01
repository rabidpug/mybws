'use strict';

module.exports = ( { locator, } ) => {
  const passport = require( 'passport' );

  passport.use( locator.get( 'localStrategy' ) );

  passport.use( locator.get( 'googleStrategy' ) );

  return passport;
};
