'use strict';

const express = require( 'express' );
const user = require( './user' );
const google = require( './google' );
const range = require( './range' );
const pog = require( './pog' );
const router = express.Router();

router.use( '/user', user );

router.use( '/google', google );

router.use( '/range', range );

router.use( '/pog', pog );

module.exports = router;
