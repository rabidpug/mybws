import React, { PureComponent, } from 'react';

import MenuItem from './components/Item';
import { MenuWrapper, } from './Menu.styles';
import SubMenu from './components/SubMenu';

export default class Menu extends PureComponent {
  static Item = MenuItem;

  static SubMenu = SubMenu;

  render () {
    const { children, selectedKeys, openKeys, subMenuAction, itemAction, showText, vertical, } = this.props;

    const childProps = {
      itemAction,
      openKeys,
      selectedKeys,
      showText,
      subMenuAction,
      vertical,
    };
    const childrenWithProps = React.Children.map( children,
                                                  child => typeof child.type === 'string' ? child : React.cloneElement( child, childProps ) );

    return <MenuWrapper { ...this.props }>{childrenWithProps}</MenuWrapper>;
  }
}
