import React, { Component, } from 'react'

import Layout from 'Common/components/Layout'
import Menu from 'Common/components/Menu'
import gqlSideBar from './SideBar.gql'
import mappedMenus from '../../helpers/mappedMenus'
import { withRouter, } from 'react-router-dom'

@withRouter
@gqlSideBar
export default class SideBar extends Component {
  render () {
    const {
      data: { ui: { isSidebarCollapsed, openKeys, } = {}, browser, auth: { isAuthenticated, } = {}, },
      route: { menuItems, },
      history: { push, },
      location: { pathname, },
      updateOpenKeys,
      swipeWidth,
      updateIsSidebarCollapsed,
    } = this.props

    const collapsed = browser > 1200 || swipeWidth > 0 ? false : isSidebarCollapsed
    const isSmallDisplay = browser < 992
    const selectedKeys = []
    const openSelectedKeys = [ ...openKeys, ]
    const isPathMatch = item =>
      pathname.indexOf( item.path ) === 0 && item.path !== '/' || pathname === item.path || item.subMenu
    const determineIfOpen = item => {
      if ( isPathMatch( item ) ) {
        if ( item.subMenu ) {
          item.subMenu.forEach( determineIfOpen )

          if ( item.subMenu.some( isPathMatch ) ) {
            openSelectedKeys.push( item.key )

            selectedKeys.push( item.key )
          }
        } else selectedKeys.push( item.key )
      }

      item.subMenu && item.subMenu.forEach( determineIfOpen )
    }

    menuItems.forEach( determineIfOpen )

    const to = bool => ( { variables: { isSidebarCollapsed: bool, }, } )

    return (
      <Layout.SideBar
        collapsed={ collapsed }
        isSmallDisplay={ isSmallDisplay }
        onMouseEnter={ () => !isSmallDisplay && collapsed && updateIsSidebarCollapsed( to( false ) ) }
        onMouseLeave={ () => !isSmallDisplay && !collapsed && updateIsSidebarCollapsed( to( true ) ) }
        swipeWidth={ swipeWidth }>
        <Menu
          itemAction={ push }
          openKeys={ openSelectedKeys }
          selectedKeys={ selectedKeys }
          showText={ !collapsed }
          subMenuAction={ updateOpenKeys }
          vertical>
          {mappedMenus( menuItems, isAuthenticated )}
        </Menu>
      </Layout.SideBar>
    )
  }
}
