import $ from 'redux-methods';
import Modal from 'Common/components/Modal';
import { connect, } from 'react-redux';
import { toast, } from 'react-toastify';
const state = state => ( { ...state.ui.modal, } );
const dispatch = ( dispatch, props ) => ( {
  onClose () {
    const { noClose, } = props;

    noClose ? toast.warn( noClose ) : dispatch( $.ui.modal.set() );
  },
} );
const GlobalModal = connect( state,
                             dispatch )( Modal );

export default GlobalModal;
