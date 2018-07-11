import React, { Component, } from 'react'

import Button from 'Common/components/Button'
import ClearDiv from './styled/ClearDiv'
import StyledCard from './styled/StyledCard'
import { authEndpoint, } from '../../endpoints'
import gqlSignIn from './SignIn.gql'
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
    const { data: { auth: { isAuthenticated, }, }, } = this.props

    return (
      <StyledCard>
        <ClearDiv />
        {isAuthenticated
          ? 'Sign in successful!'
          : (
            <Button
              href={ authEndpoint() } icon={ [
                'fab',
                'google',
              ] } style={ { margin: 'auto', } }
              variant='secondary'>
            Sign In With Google
            </Button>
          )}
        <ClearDiv />
      </StyledCard>
    )
  }
}
