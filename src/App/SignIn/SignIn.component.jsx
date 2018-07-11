import React, { Component, } from 'react'

import Button from 'Common/components/Button'
import ClearDiv from './styled/ClearDiv'
import StyledCard from './styled/StyledCard'
import { getPath, } from 'utilibelt'
import gqlSignIn from './SignIn.gql'
import { signEndpoint, } from '../../endpoints'
import { toast, } from 'react-toastify'

@gqlSignIn
export default class Signin extends Component {
  componentDidMount () {
    const {
      location: { hash, },
      history,
    } = this.props

    document.title = 'myBWS Sign In'

    if ( hash === '#failed' ) {
      toast.error( 'Sign in failed. You must sign in with a valid Woolworths LTD Google account' )

      history.replace( '/signin' )
    }
  }

  render () {
    const {
      data: { auth: { isAuthenticated, }, },
      location,
    } = this.props

    const redirect = getPath( location, 'state.pathname', '' )

    return (
      <StyledCard>
        <ClearDiv />
        {isAuthenticated
          ? 'Sign in successful!'
          : (
            <Button
              href={ signEndpoint( redirect === '/' ? '' : redirect ) }
              icon={ [
                'fab',
                'google',
              ] }
              style={ { margin: 'auto', } }
              variant='secondary'>
            Sign In With Google
            </Button>
          )}
        <ClearDiv />
      </StyledCard>
    )
  }
}
