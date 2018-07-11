import { Redirect, Route, Switch, } from 'react-router-dom'

import { MyHomeLoadable, } from '../MyHome'
import { MyProfileLoadable, } from '../MyProfile'
import { MyRangeLoadable, } from '../MyRange'
import React from 'react'
import { SignInLoadable, } from '../SignIn'

const PrivateRoute = ( { component: Component, isAuthenticated, ...props } ) => (
  <Route
    { ...props }
    render={ newProps =>
      !isAuthenticated && window.location.pathname.indexOf( props.path ) === 0 ? (
        <Redirect
          to={ {
            pathname : '/signin',
            state    : newProps.location,
          } }
        />
      )
        : <Component { ...newProps } />

    }
  />
)
const PublicRoute = ( { component: Component, isAuthenticated, ...props } ) => (
  <Route
    { ...props }
    render={ newProps => isAuthenticated && window.location.pathname.indexOf( props.path ) === 0 ? (
      <Redirect
        to={ {
          pathname : '/myProfile',
          state    : newProps.location,
        } }
      />
    )
      : <Component { ...newProps } />
    }
  />
)
const ContentSwitch = ( { location, isAuthenticated, } ) => (
  <Switch location={ location }>
    <PrivateRoute
      component={ MyHomeLoadable } exact isAuthenticated={ isAuthenticated }
      key='/' path='/' />
    <PrivateRoute
      component={ MyProfileLoadable } isAuthenticated={ isAuthenticated } key='myProfile'
      path='/myProfile' />
    <PrivateRoute
      component={ MyRangeLoadable } isAuthenticated={ isAuthenticated } key='range'
      path='/myRange' />
    <PublicRoute
      component={ SignInLoadable } isAuthenticated={ isAuthenticated } key='signin'
      path='/signin' />
  </Switch>
)

export default ContentSwitch
