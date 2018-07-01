'use strict';

require( 'dotenv' ).config();

const configs = require( './configs/config' )();
const locator = require( 'express-locator' );
const dependencies = require( './configs/dependencies' );
const models = require( './models' );
const services = require( './services' );
const controllers = require( './controllers' );
const configurators = require( './configurators' );

locator.config(
  configs, dependencies, models, services, controllers, configurators
);
