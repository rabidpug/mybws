import React, { Component, } from 'react';

import { ThemeProvider, } from 'styled-components';
import connectThemer from './Themer.connect';

@connectThemer
export default class DynamicThemeProvider extends Component {
  render () {
    return <ThemeProvider { ...this.props } />;
  }
}
