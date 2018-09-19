import React, { Component, } from 'react';

import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import HamButton from './HamButton.styled';
import Layout from 'Common/components/Layout';
import Menu from 'Common/components/Menu';
import UserPanel from './containers/UserPanel';
import gqlTopBar from './TopBar.gql';
import mappedMenus from '../../helpers/mappedMenus';

@gqlTopBar
class TopBar extends Component {
  state = { openKeys: [], };

  toggleSubMenu = key => {
    this.setState( prevState => {
      const openKeys = [ ...prevState.openKeys, ];

      openKeys.includes( key ) ? openKeys.splice( openKeys.indexOf( key ), 1 ) : openKeys.push( key );

      return { openKeys, };
    } );
  };

  render () {
    const {
      data: {
        browser,
        ui: { isSidebarCollapsed, isMobile, },
        auth: { isAuthenticated, },
        query,
      },
      updateIsSidebarCollapsed,
      route: { actionMenuItems, },
    } = this.props;

    const { openKeys, } = this.state;
    const selectedKeys = [
      ...query.params.groupFilters,
      ...query.params.statusFilters,
      ...query.params.sort,
      query.infiniteScroll && 'infiniteScroll',
      query.params.descendingSort && 'descendingSort',
      query.params.exactSearch && 'exactSearch',
    ].filter( v => v );
    const isLargeDisplay = browser > 1200;

    return (
      <Layout.Header>
        {!isLargeDisplay && (
          <HamButton
            active={ !isSidebarCollapsed }
            onClick={ () => updateIsSidebarCollapsed( !isSidebarCollapsed ) }
            variant='secondary'>
            <FontAwesomeIcon icon='bars' size='lg' />
          </HamButton>
        )}
        {isAuthenticated && <UserPanel />}
        {actionMenuItems && (
          <Menu
            openKeys={ openKeys }
            selectedKeys={ selectedKeys }
            showText
            style={ { marginBottom: '0.2rem', } }
            subMenuAction={ this.toggleSubMenu }>
            {mappedMenus( actionMenuItems, isAuthenticated, !isMobile )}
          </Menu>
        )}
      </Layout.Header>
    );
  }
}

export default TopBar;
