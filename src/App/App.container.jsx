import 'react-toastify/dist/ReactToastify.css';
import 'react-tippy/dist/tippy.css';

import { CSSTransition, TransitionGroup, } from 'react-transition-group';
import React, { PureComponent, } from 'react';

import ChangePublic from 'Common/components/ChangePublic';
import ContentSwitch from './components/ContentSwitch';
import GlobalModal from 'Common/containers/GlobalModal';
import GlobalToast from 'Common/containers/GlobalToast';
import Layout from 'Common/components/Layout';
import LoggingIn from './components/LoggingIn';
import ModalHeader from 'Common/components/ModalHeader';
import SwipeMask from 'Common/components/SwipeMask';
import actionMenu from './helpers/actionMenu';
import { configureAxios, } from 'Common/helpers/axiosHelpers';
import connectApp from './App.connect';
import { hot, } from 'react-hot-loader';
import iconLibrary from './helpers/iconLibrary';
import navMenu from './helpers/navMenu';
import { renderRoutes, } from 'react-router-config';
import slideTransition from 'Common/styles/slideTransition.scss';
import { withRouter, } from 'react-router-dom';

iconLibrary();

@hot( module )
@withRouter
@connectApp
export default class App extends PureComponent {
  constructor ( props ) {
    super( props );

    this.state = { swipeWidth: 0, };
  }

  componentDidMount () {
    // const { isOnline, setWidth, } = this.props;
    const { isOnline, } = this.props;

    window.addEventListener( 'beforeinstallprompt', this.handleAddToHome );

    // window.addEventListener( 'resize', () => setWidth( window.innerWidth ) );

    this.checkAuthentication( {} );

    isOnline( window.navigator.onLine );
  }

  componentDidUpdate ( prevProps ) {
    this.checkAuthentication( prevProps );

    const { activeRole, activeStore, setModal, modal, } = this.props;

    if (
      ( activeRole !== prevProps.activeRole || activeStore !== prevProps.activeStore ) &&
      activeRole === 'Store Team' &&
      !activeStore &&
      !modal
    ) {
      setModal( {
        body   : <ChangePublic field='stores' label='Store Number' onSubmit={ this.handleSubmit } />,
        header : <ModalHeader>Enter Your Store Number</ModalHeader>,
      } );
    }
  }

  componentWillUnmount () {
    window.removeEventListener( 'beforeinstallprompt', this.handleAddToHome );
  }

  handleSubmit = e => {
    e.preventDefault();

    const {
      target: {
        key: { value: key, },
        input,
      },
    } = e;
    let { value, } = input;
    const { changePublic, setModal, } = this.props;

    value = isNaN( parseInt( value ) ) ? value : parseInt( value );

    changePublic( {
      key,
      value,
    } );

    setModal();
  };

  checkAuthentication = prevProps => {
    const { isAuthenticated, isSocketConnected, isSocketConnecting, listenPublic, isUserOnline, } = this.props;

    configureAxios();

    if (
      ( prevProps.isAuthenticated !== isAuthenticated || prevProps.isUserOnline !== isUserOnline ) &&
      isAuthenticated &&
      !isSocketConnecting &&
      !isSocketConnected
    ) listenPublic();
  };

  handleAddToHome = e => {
    e.preventDefault();

    e.prompt();
  };

  onSwipingRight = ( e, swipeWidth ) => {
    const { isSidebarCollapsed, } = this.props;

    if ( isSidebarCollapsed ) this.setState( { swipeWidth, } );
  };

  onSwiped = (
    e, deltaX, deltaY, isFlick
  ) => {
    const { toggleSidebar, isSidebarCollapsed, } = this.props;
    const { swipeWidth, } = this.state;

    if ( ( swipeWidth > 100 || isFlick ) && isSidebarCollapsed ) toggleSidebar();

    this.setState( { swipeWidth: 0, } );
  };

  render () {
    const { location, isSmallDisplay, profile, isAuthenticated, } = this.props;
    const { swipeWidth, } = this.state;
    const currentKey = location.pathname.split( '/' )[1] || '/';

    return isAuthenticated && ( !profile || Object.keys( profile ).length === 0 )
      ? <LoggingIn />
      : (
        <Layout parent>
          {renderRoutes( navMenu, { swipeWidth, } )}
          <Layout>
            {isSmallDisplay && <SwipeMask onSwiped={ this.onSwiped } onSwipingRight={ this.onSwipingRight } />}
            {renderRoutes( actionMenu )}
            <TransitionGroup component={ Layout.Content }>
              <CSSTransition classNames={ slideTransition } key={ currentKey } timeout={ 400 }>
                <ContentSwitch location={ location } />
              </CSSTransition>
            </TransitionGroup>
          </Layout>
          <GlobalToast />
          <GlobalModal />
        </Layout>
      );
  }
}
