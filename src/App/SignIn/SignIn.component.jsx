import React, { Component, } from 'react';
import { authEndpoint, signEndpoint, } from '../../endpoints';

import Button from 'Common/components/Button';
import ClearDiv from './styled/ClearDiv';
// import { NODE_ENV, } from '../../env';
import StyledCard from './styled/StyledCard';
import { getPath, } from 'utilibelt';
import gqlSignIn from './SignIn.gql';
import { toast, } from 'react-toastify';
@gqlSignIn
export default class Signin extends Component {
  componentDidMount () {
    const {
      location: { hash, },
      history,
    } = this.props;

    document.title = 'myBWS Sign In';

    if ( hash === '#failed' ) {
      toast.error( 'Sign in failed. You must sign in with a valid Woolworths LTD Google account' );

      history.replace( '/signin' );
    }
  }

  onClick = () => {
    const { login, } = this.props;

    fetch( authEndpoint( 'devauth' ) )
      .then( res => res.json() )
      .then( ( { refreshToken, token, } ) =>
        login( {
          variables: {
            JWT: token,
            refreshToken,
          },
        } )
      ); //eslint-disable-line
  };

  render () {
    const {
      data: { auth: { isAuthenticated, }, },
      location,
    } = this.props;

    const redirect = getPath( location, 'state.pathname', '' );
    // const prop =
    //   NODE_ENV === 'production' ? { href: signEndpoint( redirect === '/' ? '' : redirect ), } : { onClick: this.onClick, };
    const prop = { href: signEndpoint( redirect === '/' ? '' : redirect ), };

    return (
      <StyledCard>
        <ClearDiv />
        {isAuthenticated
          ? 'Sign in successful!'
          : (
            <Button
              { ...prop } icon={ [
                'fab',
                'google',
              ] } style={ { margin: 'auto', } }
              variant='secondary'>
            Sign In With Google
            </Button>
          )}
        <ClearDiv />
      </StyledCard>
    );
  }
}
