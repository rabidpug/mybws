import { Description, ProfileHeader, Title, } from './UserPanel.styled';
import React, { Component, } from 'react';

import MiniAvatar from 'Common/components/MiniAvatar';
import gqlUserPanel from './UserPanel.gql';
import subUserPanel from './UserPanel.sub';
import { withRouter, } from 'react-router-dom';

@withRouter
@gqlUserPanel
@subUserPanel
class UserPanel extends Component {
  render () {
    const { user = {}, store = {}, data = {}, } = this.props;

    if ( !data.auth || !data.auth.isAuthenticated ) return null;
    const { getUser, } = user;
    const { ui: { isOnline, }, } = data;
    const { getStore, } = store;

    if ( !getUser ) return null;
    const { photo, name, role, } = getUser || {};
    const { id, organisation, name: storeName, } = getStore || {};

    return (
      <span>
        {photo && <MiniAvatar isOnline={ isOnline } src={ photo } style={ { float: 'left', } } />}
        <ProfileHeader>
          {name && <Title>{name}</Title>}
          {<Description>{id ? `${id} - ${organisation.toUpperCase()} ${storeName}` : role}</Description>}
        </ProfileHeader>
      </span>
    );
  }
}

export default UserPanel;
