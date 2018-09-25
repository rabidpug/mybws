import 'react-toastify/dist/ReactToastify.css';
import 'react-tippy/dist/tippy.css';

import { CSSTransition, TransitionGroup, } from 'react-transition-group';
import React, { PureComponent, } from 'react';

import ContentSwitch from './components/ContentSwitch';
import GlobalToast from 'Common/components/GlobalToast';
import Layout from 'Common/components/Layout';
import LoggingIn from './components/LoggingIn';
import SwipeMask from 'Common/components/SwipeMask';
import actionMenu from './helpers/actionMenu';
import { createGlobalStyle, } from 'styled-components';
import fadeTransition from 'Common/styles/fadeTransition.scss';
import getQueryVariable from 'Common/helpers/getQueryVariable';
import gqlApp from './App.gql';
import { hot, } from 'react-hot-loader';
import iconLibrary from './helpers/iconLibrary';
import navMenu from './helpers/navMenu';
import { renderRoutes, } from 'react-router-config';
import simpleNotification from '../common/components/simpleNotification';
import { withRouter, } from 'react-router-dom';

iconLibrary();

const GlobalStyle = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width: 100%;
  font-family: 'Lora', serif;
  font-weight: 400;
  font-size: 16px;
}
h1,h2,h3,h4,h5 {
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
}
ul, menu, dir {
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    -webkit-padding-start: 0;
}
`;

@hot( module )
@withRouter
@gqlApp
class App extends PureComponent {
  state = { swipeWidth: 0, };

  componentDidMount () {
    const { updateBrowser, updateIsOnline, loaded, } = this.props;

    loaded && this.handleAuthRedirect();

    window.addEventListener( 'beforeinstallprompt', this.handleAddToHome );

    window.addEventListener( 'online', updateIsOnline );

    window.addEventListener( 'offline', updateIsOnline );

    window.addEventListener( 'resize', updateBrowser );
  }

  componentDidUpdate () {
    const { loaded, } = this.props;

    if ( loaded && getQueryVariable( 'token', location ) ) this.handleAuthRedirect();
  }

  componentWillUnmount () {
    const { updateBrowser, updateIsOnline, } = this.props;

    window.removeEventListener( 'beforeinstallprompt', this.handleAddToHome );

    window.removeEventListener( 'online', updateIsOnline );

    window.removeEventListener( 'offline', updateIsOnline );

    window.removeEventListener( 'resize', updateBrowser );
  }

  handleAuthRedirect = () => {
    const {
      login,
      loaded,
      location: { pathname: redirect, },
    } = this.props;

    const JWT = getQueryVariable( 'token', location );

    const refreshToken = getQueryVariable( 'refreshToken', location );

    if ( JWT || refreshToken && loaded ) {
      login( {
        variables: {
          JWT,
          redirect,
          refreshToken,
        },
      } );
    }
  };

  handleAddToHome = e => {
    e.preventDefault();

    simpleNotification(
      'Install App',
      'You can install the myBWS App to your phone for easier access',
      'Install Now',
      () => e.prompt(),
      true
    );
  };

  onSwipingRight = ( e, swipeWidth ) => {
    const { data: { ui: { isSidebarCollapsed, }, }, } = this.props;

    if ( isSidebarCollapsed ) this.setState( { swipeWidth, } );
  };

  onSwiped = (
    e, deltaX, deltaY, isFlick
  ) => {
    const {
      updateIsSidebarCollapsed,
      data: { ui: { isSidebarCollapsed, }, },
    } = this.props;
    const { swipeWidth, } = this.state;

    if ( ( swipeWidth > 100 || isFlick ) && isSidebarCollapsed ) updateIsSidebarCollapsed();

    this.setState( { swipeWidth: 0, } );
  };

  render () {
    const {
      location,
      data: { browser, ui = {}, auth = {}, loading, },
    } = this.props;
    const { isSidebarCollapsed, } = ui;
    const { isAuthenticated, } = auth;
    const { swipeWidth, } = this.state;

    const currentKey = location.pathname.split( '/' ).slice( 1, 2 ) || '/';
    const offset = browser > 1200 || swipeWidth || !isSidebarCollapsed ? '12rem' : '4rem';

    return loading
      ? <LoggingIn />
      : (
        <Layout parent>
          {renderRoutes( navMenu, { swipeWidth, } )}
          <Layout>
            {true && <SwipeMask onSwiped={ this.onSwiped } onSwipingRight={ this.onSwipingRight } />}
            {renderRoutes( actionMenu )}
            <TransitionGroup component={ Layout.Content }>
              <GlobalToast offset={ offset } />
              <CSSTransition classNames={ fadeTransition } key={ currentKey } timeout={ 400 }>
                <ContentSwitch isAuthenticated={ isAuthenticated } location={ location } />
              </CSSTransition>
            </TransitionGroup>
          </Layout>
          <GlobalStyle />
        </Layout>
      );
  }
}
export default App;
