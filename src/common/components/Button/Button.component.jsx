import { HrefButton, StyledButton, TextSpan, } from './Button.styles'

import PopIcon from '../PopIcon/PopIcon.component'
import React from 'react'

const Button = ( { disabled, children, icon, href, ...props } ) => {
  const Component = href ? HrefButton : StyledButton

  return (
    <Component { ...props } disabled={ disabled } href={ href }>
      {disabled ? <PopIcon icon='spinner' spin /> : icon && <PopIcon icon={ icon } />}
      <TextSpan disabled={ disabled } icon={ icon }>
        {children}
      </TextSpan>
    </Component>
  )
}

export default Button
