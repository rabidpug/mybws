import { InputWrapper, TextArea, } from './Input.styles'
import React, { Component, } from 'react'

export default class Input extends Component {
  render () {
    const { type, ...props } = this.props

    if ( type === 'textarea' ) return <TextArea { ...props } />

    return <InputWrapper { ...props } type={ type } />
  }
}
