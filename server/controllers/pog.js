'use strict';

const Instance = require( 'express-locator' ).get( 'Instance' );

class PogController extends Instance {
  async search ( req, res ) {
    const { params: { store: stores, }, } = req;

    const planograms = await this.Planogram.find( { stores, } );

    res.json( { planograms, } );
  }
}

module.exports = PogController;
