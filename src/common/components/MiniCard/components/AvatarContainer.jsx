import { Avatar, AvatarWrapper, Ribbon, Stamp, } from '../MiniCard.styles'
import React, { PureComponent, } from 'react'
export default class AvatarContainer extends PureComponent {
  constructor ( props ) {
    super( props )

    const { avatar, } = this.props

    this.state = {
      imgurl : '',
      src    : avatar,
    }
  }

  componentDidMount () {
    this.manageAvatar()
  }

  componentWillUnmount () {
    const { timer, } = this.state

    this.setState( { cancel: true, } )

    if ( timer ) clearTimeout( timer )
  }

  manageAvatar = async () => {
    const { noimg, } = this.props
    const src = await this.setAvatar() || await this.setAlt() || noimg
    const { cancel, } = this.state

    if ( !cancel ) this.setState( { src, } )
  }

  setAvatar = () => {
    const { avatar, } = this.props
    const opts = {
      method       : 'GET',
      mode         : 'no-cors',
      redirect     : 'manual',
      responseType : 'blob',
    }

    return fetch( avatar, opts )
      .then( res => {
        if ( res.type.includes( 'redirect' ) ) return

        return avatar
      } )
      .catch( () => false )
  }

  setAlt = () => {
    const { alt, } = this.props
    const opts = {
      method       : 'GET',
      mode         : 'no-cors',
      redirect     : 'manual',
      responseType : 'blob',
    }

    return fetch( alt, opts )
      .then( res => {
        if ( res.type.includes( 'redirect' ) ) return

        return alt
      } )
      .catch( () => false )
  }

  render () {
    const { isBig, top, placeholder, noimg, ribbonColor, ribbon, stamp, } = this.props
    const { imgurl, src, } = this.state

    const AvatarPart = placeholder ? Avatar : Avatar.withComponent( 'div' )

    return (
      <AvatarWrapper isBig={ isBig } placeholder={ placeholder } top={ top }>
        <AvatarPart
          imgurl={ imgurl }
          isBig={ isBig }
          onError={ () => {
            const timer = setTimeout( () => this.setState( { imgurl: true, } ), 400 )

            this.setState( {
              src: noimg,
              timer,
            } )
          } }
          onLoad={ () => this.setState( { imgurl: true, } ) }
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
