'use strict';

module.exports = ( { locator, } ) => {
  const mongoose = locator.get( 'mongoose' );
  const { Schema, } = mongoose;

  const StoreSchema = new Schema( {
    _id     : { type: Number, },
    address : { type: String, },
    area    : {
      index : true,
      type  : String,
    },
    areamanager: {
      email : { type: String, },
      name  : { type: String, },
      phone : { type: String, },
    },
    avgsales       : { type: Number, },
    buildingarea   : { type: Number, },
    cellarmasters  : { type: Boolean, },
    centrestore    : { type: String, },
    channel        : { type: String, },
    commencedtrade : { type: String, },
    company        : { type: String, },
    dcs            : { type: [ Number, ], },
    district       : {
      index : true,
      type  : String,
    },
    email: {
      index : true,
      type  : String,
    },
    express      : { type: Boolean, },
    fax          : { type: String, },
    itsystem     : { type: String, },
    latitude     : { type: Number, },
    license      : { type: String, },
    longitude    : { type: Number, },
    manager      : { type: String, },
    manageremail : { type: String, },
    metrostore   : { type: Boolean, },
    name         : {
      index : true,
      type  : String,
    },
    organisation: {
      index : true,
      type  : String,
    },
    phone        : { type: String, },
    pickup       : { type: Boolean, },
    pos          : { type: String, },
    postcode     : { type: Number, },
    refitmanager : {
      email : { type: String, },
      name  : { type: String, },
      phone : { type: String, },
    },
    region       : { type: String, },
    resortstore  : { type: Boolean, },
    restrictions : {
      mandatory : { type: String, },
      voluntary : { type: String, },
    },
    statemanager: {
      email : { type: String, },
      name  : { type: String, },
      phone : { type: String, },
    },
    statesupport: {
      email : { type: String, },
      name  : { type: String, },
      phone : { type: String, },
    },
    store: {
      index    : true,
      required : true,
      sparse   : true,
      trim     : true,
      type     : Number,
      unique   : true,
    },
    suburb       : { type: String, },
    tradearea    : { type: Number, },
    tradinghours : {
      friday    : { type: String, },
      monday    : { type: String, },
      saturday  : { type: String, },
      sunday    : { type: String, },
      thursday  : { type: String, },
      tuesday   : { type: String, },
      wednesday : { type: String, },
    },
    wowgroup: { type: String, },
  } );

  return mongoose.model( 'Store', StoreSchema );
};
