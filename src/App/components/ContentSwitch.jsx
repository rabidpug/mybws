import { Route, Switch, } from 'react-router-dom';

import { MyHomeLoadable, } from '../MyHome';
import { MyProfileLoadable, } from '../MyProfile';
import { MyRangeLoadable, } from '../MyRange';
import React from 'react';
import { SignInLoadable, } from '../SignIn';

const ContentSwitch = ( { location, } ) => (
  <Switch location={ location }>
    <Route
      component={ MyHomeLoadable } exact key='/'
      path='/' />
    <Route component={ MyProfileLoadable } key='myProfile' path='/myProfile' />
    <Route component={ MyRangeLoadable } key='range' path='/myRange' />
    <Route component={ SignInLoadable } key='signin' path='/signin' />
  </Switch>
);

export default ContentSwitch;
