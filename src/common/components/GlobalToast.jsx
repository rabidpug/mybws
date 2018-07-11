import { Flip, ToastContainer, } from 'react-toastify'
import React, { PureComponent, } from 'react'

export default class GlobalToast extends PureComponent {
  render () {
    const { offset, } = this.props

    return (
      <ToastContainer
        newestOnTop
        position='top-left'
        style={ {
          transform  : `translateX(${offset}) translateY(3rem)`,
          transition : 'all 0.2s',
          zIndex     : 99999,
        } }
        transition={ Flip }
      />
    )
  }
}
