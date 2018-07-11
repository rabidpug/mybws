import 'react-toastify/dist/ReactToastify.css'
import 'react-tippy/dist/tippy.css'

import { CSSTransition, TransitionGroup, } from 'react-transition-group'
import React, { PureComponent, } from 'react'
import ContentSwitch from './components/ContentSwitch'
import GlobalToast from 'Common/components/GlobalToast'
import Layout from 'Common/components/Layout'
import LoggingIn from './components/LoggingIn'
import SwipeMask from 'Common/components/SwipeMask'
import actionMenu from './helpers/actionMenu'
import fadeTransition from 'Common/styles/fadeTransition.scss'
import getQueryVariable from 'Common/helpers/getQueryVariable'
import gqlApp from './App.gql'
import { hot, } from 'react-hot-loader'
import iconLibrary from './helpers/iconLibrary'
import navMenu from './helpers/navMenu'
import { renderRoutes, } from 'react-router-config'
import { withRouter, } from 'react-router-dom'

iconLibrary()

@hot( module )
@withRouter
@gqlApp
export default class App extends PureComponent {
  state = { swipeWidth: 0, }

  componentDidMount () {
    const { updateBrowser, updateIsOnline, loaded, } = this.props

    loaded && this.handleAuthRedirect()

    window.addEventListener( 'beforeinstallprompt', this.handleAddToHome )

    updateIsOnline()

    window.addEventListener( 'online', updateIsOnline )

    window.addEventListener( 'offline', updateIsOnline )

    window.addEventListener( 'resize', updateBrowser )
  }

  componentDidUpdate () {
    getQueryVariable( 'token', location ) && this.handleAuthRedirect()
  }

  componentWillUnmount () {
    const { updateBrowser, updateIsOnline, } = this.props

    window.removeEventListener( 'beforeinstallprompt', this.handleAddToHome )

    window.removeEventListener( 'online', updateIsOnline )

    window.removeEventListener( 'offline', updateIsOnline )

    window.removeEventListener( 'resize', updateBrowser )
  }

  handleAuthRedirect = () => {
    const { login, loaded, } = this.props

    const JWT = getQueryVariable( 'token', location )

    const refreshToken = getQueryVariable( 'refreshToken', location )

    if ( JWT || refreshToken && loaded ) {
      login( {
        variables: {
          JWT,
          refreshToken,
        },
      } )
    }
  }

  handleAddToHome = e => {
    e.preventDefault()

    e.prompt()
  }

  onSwipingRight = ( e, swipeWidth ) => {
    const { data: { ui: { isSidebarCollapsed, }, }, } = this.props

    if ( isSidebarCollapsed ) this.setState( { swipeWidth, } )
  }

  onSwiped = (
    e, deltaX, deltaY, isFlick
  ) => {
    const {
      updateIsSidebarCollapsed,
      data: { ui: { isSidebarCollapsed, }, },
    } = this.props
    const { swipeWidth, } = this.state

    if ( ( swipeWidth > 100 || isFlick ) && isSidebarCollapsed ) updateIsSidebarCollapsed()

    this.setState( { swipeWidth: 0, } )
  }

  render () {
    const {
      location,
      data: { browser, ui = {}, auth = {}, loading, },
    } = this.props
    const { isSidebarCollapsed, } = ui
    const { isAuthenticated, } = auth
    const { swipeWidth, } = this.state

    const currentKey = location.pathname.split( '/' ).slice( 1, 2 ) || '/'
    const offset = browser > 1200 || swipeWidth || !isSidebarCollapsed ? '12rem' : '4rem'

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
        </Layout>
      )
  }
}
