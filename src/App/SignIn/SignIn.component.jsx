import React, { Component, } from 'react';

import Button from 'Common/components/Button';
import ClearDiv from './styled/ClearDiv';
import StyledCard from './styled/StyledCard';
import { toast, } from 'react-toastify';

export default class Signin extends Component {
  componentDidMount () {
    const {
      location: { hash, search, },
      history,
    } = this.props;

    document.title = 'myBWS Sign In';

    const redirect = search && search.slice( search.indexOf( '=' ) + 1, search.length ).replace( /%2F/g, '/' );

    if ( redirect ) localStorage.setItem( 'redirect', redirect );
    if ( hash === '#failed' ) {
      toast.error( 'Sign in failed. You must sign in with a valid Woolworths LTD Google account' );

      history.replace( '/signin' );
    }
  }

  render () {
    return (
      <StyledCard>
        <ClearDiv />
        <Button
          href='/v1/google' icon={ [
            'fab',
            'google',
          ] } style={ { margin: 'auto', } }
          variant='secondary'>
          Sign In With Google
        </Button>
        <ClearDiv />
      </StyledCard>
    );
  }
}
