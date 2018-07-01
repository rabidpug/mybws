'use strict';

module.exports = ( { locator, } ) => {
  const mongoose = locator.get( 'mongoose' );
  const { Schema, } = mongoose;

  const PlanogramSchema = new Schema( {
    _id      : { type: String, },
    articles : {
      cart: {
        index : true,
        type  : [
          {
            article: {
              index : true,
              ref   : 'Article',
              type  : Number,
            },
            notes   : String,
            updated : Number,
          },
        ],
      },
      onshow: {
        type: [
          {
            article: {
              index : true,
              ref   : 'Article',
              type  : Number,
            },
            notes   : String,
            updated : Number,
          },
        ],
      },
    },
    category: {
      index    : true,
      required : true,
      type     : String,
    },
    cluster: {
      index    : true,
      required : false,
      type     : String,
    },
    district: {
      index    : true,
      required : true,
      type     : String,
    },
    equipment: {
      required : true,
      type     : String,
    },
    linear: {
      available: {
        required : true,
        type     : Number,
      },
      used: {
        required : true,
        type     : Number,
      },
    },
    organisation: {
      index    : true,
      required : true,
      type     : String,
    },
    parent: {
      required : true,
      type     : Boolean,
    },
    rangecode: {
      index    : true,
      required : false,
      type     : String,
    },
    sectionID: {
      index    : true,
      required : true,
      sparse   : true,
      trim     : true,
      type     : String,
      unique   : true,
    },
    size: {
      required : true,
      type     : Number,
    },
    standard: {
      index    : true,
      required : true,
      type     : Boolean,
    },
    stores: {
      index : true,
      type  : [
        {
          ref  : 'Store',
          type : Number,
        },
      ],
    },
    variation: {
      required : false,
      type     : String,
    },
  } );

  return mongoose.model( 'Planogram', PlanogramSchema );
};
