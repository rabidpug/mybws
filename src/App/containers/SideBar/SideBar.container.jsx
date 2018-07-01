import React, { Component, } from 'react';

import Layout from 'Common/components/Layout';
import Menu from 'Common/components/Menu';
import connectSideBar from './SideBar.connect';
import mappedMenus from '../../helpers/mappedMenus';

@connectSideBar
export default class SideBar extends Component {
  constructor ( props ) {
    super( props );

    this.state = { newMount: true, };
  }

  componentDidMount () {
    document.addEventListener( 'mousedown', this.handleClickOutside );

    setTimeout( () => this.setState( { newMount: false, } ), 400 );
  }

  componentWillUnmount () {
    document.removeEventListener( 'mousedown', this.handleClickOutside );
  }

  handleClickOutside = () => {
    const { isSmallDisplay, toggleSidebar, } = this.props;

    if ( isSmallDisplay ) toggleSidebar( true );
  };

  render () {
    const {
      isSidebarCollapsed,
      menuItems,
      history: { push, },
      currentPath,
      toggleKey,
      openKeys,
      isAuthenticated,
      isLargeDisplay,
      isSmallDisplay,
      swipeWidth,
      toggleSidebar,
    } = this.props;
    const { newMount, } = this.state;
    const selectedKeys = [];
    const openSelectedKeys = [ ...openKeys, ];
    const collapsed = isLargeDisplay ? false : swipeWidth > 0 ? false : isSidebarCollapsed;
    const isPathMatch = item =>
      currentPath.indexOf( item.path ) === 0 && item.path !== '/' || currentPath === item.path || item.subMenu;
    const determineIfOpen = item => {
      if ( isPathMatch( item ) ) {
        if ( item.subMenu ) {
          item.subMenu.forEach( determineIfOpen );

          if ( item.subMenu.some( isPathMatch ) ) {
            openSelectedKeys.push( item.key );

            selectedKeys.push( item.key );
          }
        } else selectedKeys.push( item.key );
      }

      item.subMenu && item.subMenu.forEach( determineIfOpen );
    };

    menuItems.forEach( determineIfOpen );

    return (
      <Layout.SideBar
        collapsed={ collapsed }
        isSmallDisplay={ isSmallDisplay }
        newMount={ newMount }
        onMouseEnter={ () => !isSmallDisplay && collapsed && toggleSidebar( false ) }
        onMouseLeave={ () => !isSmallDisplay && !collapsed && toggleSidebar( true ) }
        swipeWidth={ swipeWidth }>
        <Menu
          itemAction={ push }
          openKeys={ openSelectedKeys }
          selectedKeys={ selectedKeys }
          showText={ !collapsed }
          subMenuAction={ toggleKey }
          vertical>
          {mappedMenus( menuItems, isAuthenticated )}
        </Menu>
      </Layout.SideBar>
    );
  }
}
