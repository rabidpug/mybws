import { connect, } from 'react-redux';
import styles from 'Common/styles';
const state = state => ( { theme: styles.themes[state.ui.theme], } );
const connectThemer = connect( state );

export default connectThemer;
