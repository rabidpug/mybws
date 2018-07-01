'use strict';

const Instance = require( 'express-locator' ).get( 'Instance' );

class ValidateController extends Instance {
  async validate (
    req, res, next, validation
  ) {
    req.log.add( 'request', 'Validate user submitted data' );

    await this.validateService.validateReq( req, validation );

    next();
  }
}

module.exports = ValidateController;
