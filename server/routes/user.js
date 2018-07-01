'use strict';

const locator = require( 'express-locator' );
const express = require( 'express' );
const router = express.Router();
const updateUserValidation = require( '../validations/updateUser' );
const userInjector = require( '../lib/userInjector' );
const { promiseErrorWrap, } = require( 'utilibelt' );

router.use( locator.get( 'passport' ).authenticate( 'jwt', { session: false, } ) );

router.use( userInjector );

router.post( '/update',
             promiseErrorWrap( ( ...args ) => locator.get( 'validateController' ).validate( ...args, { body: updateUserValidation, } ) ),
             promiseErrorWrap( ( ...args ) => locator.get( 'userController' ).update( ...args ) ) );

router.get( '/update', promiseErrorWrap( ( ...args ) => locator.get( 'userController' ).fetch( ...args ) ) );

router.post( '/push', promiseErrorWrap( ( ...args ) => locator.get( 'userController' ).dopush( ...args ) ) );

module.exports = router;
