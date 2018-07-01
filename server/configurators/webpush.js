'use strict';

module.exports = ( { config, } ) => {
  const webpush = require( 'web-push' );

  const { googleID, contactEmail, publicKey, privateKey, } = config;

  webpush.setGCMAPIKey( googleID );

  webpush.setVapidDetails( `mailto:${contactEmail}`, publicKey, privateKey );

  return webpush;
};
