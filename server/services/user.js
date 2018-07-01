'use strict';

const Instance = require( 'express-locator' ).get( 'Instance' );

class UserService extends Instance {
  constructUser ( profile, req ) {
    const allowedDomains = [
      'woolworths.com.au',
      'bws.com.au',
      'edg.com.au',
      'danmurphys.com.au',
      'jcuneo.com',
    ];
    const {
      id: googleid,
      displayName,
      photos: pics,
      emails: mail,
      _json: { domain, },
    } = profile;

    if ( allowedDomains.includes( domain ) ) {
      const photos = pics.reduce( ( p, n, i ) => [
        {
          selected : i === 0,
          value    : n.value.replace( 'sz=50', 'sz=200' ),
        },
        ...p,
      ],
                                  [] );
      const names = [
        {
          selected : true,
          value    : displayName,
        },
      ];
      const emails = mail.reduce( ( p, n, i ) => [
        {
          selected : i === 0,
          value    : n.value,
        },
        ...p,
      ],
                                  [] );
      const isStore = !isNaN( emails[0].value.slice( 0, 4 ) );
      const roles = [
        {
          selected : true,
          value    : 'Store Team',
        },
      ];

      req.log.add( 'info', 'User profile constructed from Google result' );

      return {
        emails,
        googleid,
        isStore,
        names,
        photos,
        roles,
      };
    } else throw new this.Error( 'Domain not allowed' );
  }

  async refreshUser ( _id ) {
    return this.User.findById( _id ).populate( 'stores.value' );
  }

  async signUser ( search, newUser, req ) {
    const existUser = await this.User.findOne( search ).populate( 'stores.value' );
    const tempUser = existUser || newUser && new this.User( newUser );

    if ( tempUser ) {
      const { _id, googleid, } = tempUser;
      const token = `JWT ${this.jwt.sign( {
        _id,
        googleid,
      },
                                          this.config.localStrategy.secretOrKey || 'secret',
                                          { expiresIn: 300, } )}`;
      const noRefreshToken = !tempUser.refreshToken;
      const checkForUpdates = existUser && newUser;
      let hasUpdates = false;

      if ( noRefreshToken ) {
        const refreshToken = tempUser.googleid + this.bcrypt.genSaltSync( 10 );

        tempUser.refreshToken = refreshToken;
      }
      if ( checkForUpdates ) {
        const [
          emails,
          names,
          photos,
        ] = [
          'emails',
          'names',
          'photos',
        ].map( key =>
          newUser[key].filter( v => tempUser[key].every( a => a.value !== v.value ) ) );
        const noSelected = v => {
          v.selected = false;

          return v;
        };

        tempUser.emails = [
          ...tempUser.emails,
          ...emails.map( noSelected ),
        ];

        tempUser.names = [
          ...tempUser.names,
          ...names.map( noSelected ),
        ];

        tempUser.photos = [
          ...tempUser.photos,
          ...photos.map( noSelected ),
        ];

        hasUpdates = emails.length + names.length + photos.length > 0;
      }
      if ( noRefreshToken || hasUpdates ) await tempUser.save();
      const user = await tempUser.populate( 'stores.value' );

      user.token = token;

      req.log.add( 'info',
                   existUser
                     ? `Existing user reauthenticated${hasUpdates ? ' and updated from Google profile' : ''}`
                     : 'New user created' );

      return user;
    }
    return false;
  }

  async updateProfile ( body, req ) {
    const { user, key, value, type, } = body;

    if ( type === 'delete' ) {
      user[key] = user[key].filter( item => !( item.value === value || item.value._id === value ) );

      if ( user[key][0] ) user[key][0].selected = true;
    } else {
      user[key].map( item => {
        item.selected = item.value === value || item.value._id === value;

        return item;
      } );
    }

    if ( type === 'add' ) {
      user[key].push( {
        selected: true,
        value,
      } );
    }

    await user.save();

    req.log.add( 'info', `Actioned ${type} on ${key} ${value}` );

    return true;
  }
}

module.exports = UserService;
