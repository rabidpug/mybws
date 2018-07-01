module.exports = [
  { User: props => require( './User' )( props ), },
  { Block: props => require( './Block' )( props ), },
  { Article: props => require( './Article' )( props ), },
  { Group: props => require( './Group' )( props ), },
  { Limit: props => require( './Limit' )( props ), },
  { Planogram: props => require( './Planogram' )( props ), },
  { Store: props => require( './Store' )( props ), },
];
