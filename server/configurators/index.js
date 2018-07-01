module.exports = [
  { log: require( './log' ), },
  { joi: require( './joi' ), },
  { passport: require( './passport' ), },
  { googleStrategy: require( './googleStrategy' ), },
  { localStrategy: require( './localStrategy' ), },
  { webpush: require( './webpush' ), },
  { morgan: require( './morgan' ), },
  {
    invoke   : true,
    mongoose : require( './mongoose' ),
  },
  {
    app    : require( './app' ),
    config : true,
  },
  {
    config : true,
    invoke : true,
    socket : require( './socket' ),
  },
  {
    invoke : true,
    server : require( './server' ),
  },
];
