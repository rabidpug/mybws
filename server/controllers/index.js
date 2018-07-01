module.exports = [
  {
    dependencies  : [ 'Planogram', ],
    pogController : require( './pog' ),
  },
  {
    dependencies: [
      'log',
      'boom',
      'mongoose',
      'webpush',
      'userService',
    ],
    userController: require( './user' ),
  },
  {
    dependencies: [
      'log',
      'boom',
      'Store',
      'Article',
      'Planogram',
      'Block',
      'rangeService',
    ],
    rangeController: require( './range' ),
  },
  {
    dependencies: [
      'log',
      'boom',
      'validateService',
    ],
    validateController: require( './validate' ),
  },
];
