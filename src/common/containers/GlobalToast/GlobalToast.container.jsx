import { Flip, ToastContainer, } from 'react-toastify';
import React, { PureComponent, } from 'react';

export default class GlobalToast extends PureComponent {
  render () {
    const { isSmallDisplay, } = this.props;

    return (
      <ToastContainer
        newestOnTop
        position={ isSmallDisplay ? 'bottom-left' : 'top-right' }
        style={ { zIndex: 99999, } }
        transition={ Flip }
      />
    );
  }
}
