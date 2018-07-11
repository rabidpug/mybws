import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome'
import RadioButtonStyles from './RadioButton.styles'
import React from 'react'

const { Label, Input, } = RadioButtonStyles
const RadioButton = ( { disabled, id, children, ...props } ) => (
  <Label disabled={ disabled } htmlFor={ id } { ...props }>
    {disabled && (
      <span>
        <FontAwesomeIcon
          icon='spinner'
          spin
          style={ {
            bottom   : 0,
            color    : '#000',
            left     : 0,
            margin   : 'auto',
            position : 'absolute',
            right    : 0,
            top      : 0,
          } }
        />
      </span>
    )}
    <span>
      {children}
      <Input id={ id } name={ id } { ...props } />
    </span>
  </Label>
)

export default RadioButton
