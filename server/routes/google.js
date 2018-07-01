'use strict';

const locator = require( 'express-locator' );
const express = require( 'express' );
const router = express.Router();

router.get( '/',
            locator.get( 'passport' ).authenticate( 'google', {
              scope: [
                'https://www.googleapis.com/auth/plus.login',
                'https://www.googleapis.com/auth/plus.profile.emails.read',
              ],
              session: false,
            } ) );

router.get( '/callback',
            locator.get( 'passport' ).authenticate( 'google', {
              failureRedirect : '/signin#failed',
              session         : false,
            } ),
            ( ...args ) => locator.get( 'userController' ).redirect( ...args ) );

module.exports = router;
