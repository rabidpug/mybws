import { Description, ProfileHeader, Title, } from './styled/StoreHeader';
import React, { Component, } from 'react';

import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import HamButton from './styled/HamButton';
import Layout from 'Common/components/Layout';
import Menu from 'Common/components/Menu';
import MiniAvatar from 'Common/components/MiniAvatar';
import connectTopBar from './TopBar.connect';
import makeTruthyArray from 'Common/helpers/makeTruthyArray';
import mappedMenus from '../../helpers/mappedMenus';

@connectTopBar
export default class TopBar extends Component {
  constructor ( props ) {
    super( props );

    this.state = { openKeys: [], };
  }

  componentDidMount () {
    document.addEventListener( 'mousedown', this.handleClickOutside );
  }

  componentWillUnmount () {
    document.removeEventListener( 'mousedown', this.handleClickOutside );
  }

  handleClickOutside = e => {
    const { hideSidebarToggle, toggleSidebar, isSidebarCollapsed, } = this.props;

    if ( !hideSidebarToggle && !( this.buttonRef && this.buttonRef.contains( e.target ) ) && !isSidebarCollapsed ) toggleSidebar( true );
  };

  toggleSubMenu = key => {
    this.setState( prevState => {
      const openKeys = [ ...prevState.openKeys, ];

      openKeys.includes( key ) ? openKeys.splice( openKeys.indexOf( key ), 1 ) : openKeys.push( key );

      return { openKeys, };
    } );
  };

  render () {
    const {
      isSidebarCollapsed,
      toggleSidebar,
      actionMenuItems,
      activeRole,
      profile,
      selectedActionKeys,
      store,
      isAuthenticated,
      isOnline,
      hideSidebarToggle,
    } = this.props;
    const { openKeys, } = this.state;
    const selectedKeys = makeTruthyArray( [], selectedActionKeys );

    return (
      <Layout.Header>
        {!hideSidebarToggle && (
          <div ref={ node => this.buttonRef = node }>
            <HamButton
              active={ !isSidebarCollapsed }
              onClick={ () => toggleSidebar( !isSidebarCollapsed ) }
              variant='secondary'>
              <FontAwesomeIcon icon='bars' size='lg' />
            </HamButton>
          </div>
        )}
        {profile.photos &&
          <MiniAvatar isOnline={ isOnline } src={ profile.photos.reduce( ( p, n ) => n.selected ? n.value : p, null ) } />
        }
        <ProfileHeader>
          {profile.names && <Title>{profile.names.reduce( ( p, n ) => n.selected ? n.value : p, null )}</Title>}
          {
            <Description>
              {store ? `${store._id} - ${store.organisation.toUpperCase()} ${store.name}` : activeRole}
            </Description>
          }
        </ProfileHeader>
        {actionMenuItems && (
          <Menu
            openKeys={ openKeys }
            selectedKeys={ selectedKeys }
            showText
            style={ { marginBottom: '0.2rem', } }
            subMenuAction={ this.toggleSubMenu }>
            {mappedMenus( actionMenuItems, isAuthenticated, hideSidebarToggle )}
          </Menu>
        )}
      </Layout.Header>
    );
  }
}
