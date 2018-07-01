import { connect, } from 'react-redux';
const state = state => ( { isSmallDisplay: state.browser < 768, } );
const connectGlobalToast = connect( state );

export default connectGlobalToast;
