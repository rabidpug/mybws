import { Avatar, AvatarWrapper, Ribbon, Stamp, } from '../MiniCard.styles'
import React, { PureComponent, } from 'react'
export default class AvatarContainer extends PureComponent {
  state = {
    imgurl : false,
    src    : '',
  }

  render () {
    const { avatar, isBig, top, placeholder, noimg, ribbonColor, ribbon, stamp, } = this.props
    const { imgurl, src = avatar, } = this.state

    const AvatarPart = placeholder ? Avatar : Avatar.withComponent( 'div' )

    return (
      <AvatarWrapper
        imgurl={ imgurl } isBig={ isBig } placeholder={ placeholder }
        top={ top }>
        <AvatarPart
          imgurl={ imgurl }
          isBig={ isBig }
          onError={ () => {
            this.setState( {
              imgurl : true,
              src    : noimg,
            } )
          } }
          onLoad={ () => this.setState( { imgurl: 'error', } ) }
          src={ src }
          top={ top }
        />

        {ribbon && (
          <Ribbon isBig={ isBig } ribbonColor={ ribbonColor }>
            {ribbon}
          </Ribbon>
        )}
        {stamp && <Stamp isBig={ isBig }>{stamp}</Stamp>}
      </AvatarWrapper>
    )
  }
}
