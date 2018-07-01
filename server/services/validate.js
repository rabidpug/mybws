'use strict';

const Instance = require( 'express-locator' ).get( 'Instance' );

class ValidateService extends Instance {
  async validateReq ( req, validation ) {
    const options = {
      abortEarly   : false,
      allowUnknown : true,
    };

    if ( !validation ) return;
    const validProperties = [
      'body',
      'query',
      'params',
    ];

    for ( const i in validation ) {
      if ( validProperties.indexOf( i ) < 0 ) throw new this.Error( 'An unsupported validation key was set in route' );
      else {
        if ( typeof req[i] === 'undefined' ) throw new this.Error( `Missing request ${i}` );

        const result = this.joi.validate( req[i], validation[i], options );

        if ( result.error ) throw new this.Error( result.error.details[0].message );
        else if ( req[i].stores ) {
          const Store = this.mongoose.model( 'Store' );
          const exists = await Store.findById( req[i].stores );

          if ( !exists ) throw new this.Error( '"stores" needs to be a valid store number' );
        }
      }
    }

    req.log.add( 'info', 'Passed validation' );

    return true;
  }
}

module.exports = ValidateService;
