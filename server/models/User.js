'use strict';

module.exports = ( { locator, } ) => {
  const mongoose = locator.get( 'mongoose' );
  const socket = locator.get( 'socket' );
  const { Schema, } = mongoose;

  const UserSchema = Schema( {
    emails: {
      index    : true,
      required : true,
      type     : [
        {
          selected : Boolean,
          value    : String,
        },
      ],
    },
    googleid: {
      index    : true,
      required : true,
      type     : String,
      unique   : true,
    },
    isStore: {
      index    : true,
      required : true,
      type     : Boolean,
    },
    lastOnline: {
      default : Date.Now,
      type    : Date,
    },
    names: {
      index    : true,
      required : true,
      type     : [
        {
          selected : Boolean,
          value    : String,
        },
      ],
    },
    photos: {
      required : false,
      type     : [
        {
          selected : Boolean,
          value    : String,
        },
      ],
    },
    pushSubscriptions: [
      {
        deviceName : String,
        key        : Object,
      },
    ],
    refreshToken: {
      index    : true,
      required : false,
      sparse   : true,
      trim     : true,
      type     : String,
      unique   : true,
    },
    roles: {
      index    : true,
      required : true,
      type     : [
        {
          selected : Boolean,
          value    : {
            default : 'Store Team',
            enum    : [
              'Admin',
              'Area Coach',
              'Category Assistant',
              'Category Manager',
              'Local Category Manager',
              'Space Team',
              'Store Team',
            ],
            type: String,
          },
        },
      ],
    },
    socketid : [ String, ],
    stores   : {
      index    : true,
      required : false,
      type     : [
        {
          selected : Boolean,
          value    : {
            ref  : 'Store',
            type : Number,
          },
        },
      ],
    },
  } );

  UserSchema.pre( 'save', async function ( next ) {
    this.lastOnline = new Date();

    const { socketid, } = this;

    if ( socketid && socketid.length ) {
      const popped = await this.populate( 'stores.value' ).execPopulate();

      socketid.forEach( session => {
        if ( socket.to( session ).sockets[session] ) socket.to( session ).sockets[session].log.add( 'info', 'Profile update sent' );

        socket.to( session ).emit( 'PROFILE_UPDATE', popped );
      } );
    }

    next();
  } );

  return mongoose.model( 'User', UserSchema );
};
