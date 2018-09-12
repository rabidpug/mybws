import { LayoutContent, LayoutHeader, LayoutSideBar, LayoutWrapper, } from './Layout.styles';
import React, { PureComponent, } from 'react';

export default class Layout extends PureComponent {
  static Content = LayoutContent;

  static Header = LayoutHeader;

  static SideBar = LayoutSideBar;

  render () {
    return <LayoutWrapper { ...this.props } />;
  }
}
