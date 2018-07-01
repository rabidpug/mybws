'use strict';

const locator = require( 'express-locator' );
const express = require( 'express' );
const router = express.Router();
const userInjector = require( '../lib/userInjector' );

router.use( locator.get( 'passport' ).authenticate( 'jwt', { session: false, } ) );

router.use( userInjector );

router.get( '/:store', ( ...args ) => locator.get( 'rangeController' ).search( ...args ) );

router.get( '/:store/:article', ( ...args ) => locator.get( 'rangeController' ).search( ...args ) );

module.exports = router;
