'use strict';

const locator = require( 'express-locator' );

const joi = locator.get( 'joi' );

module.exports = joi
  .object()
  .keys( {
    emails : joi.wowemail().domain(),
    names  : joi.string(),
    photos : joi.url().valid(),
    stores : joi.store().valid(),
  } )
  .required();
