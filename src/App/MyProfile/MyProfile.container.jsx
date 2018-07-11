import React, { Component, } from 'react'

import Card from 'Common/components/Card'
import LoadBar from 'Common/components/Loaders/LoadBar'
import ProfileItem from './containers/Item'

import gqlMyProfile from './MyProfile.gql'
import subMyProfile from './MyProfile.sub'

@gqlMyProfile
@subMyProfile
export default class MyProfile extends Component {
  componentDidMount () {
    document.title = 'myBWS Profile'
  }

  getStoreName = value => {
    const { stores: { getStores = [], }, } = this.props

    return getStores.reduce( ( p, n ) => n.id === +value ? n.name : p, '' )
  }

  render () {
    const { user = {}, stores: storelist = {}, } = this.props

    if ( user.loading || storelist.loading ) return <LoadBar />
    const { getUser: { photos, names, emails, stores, pushSubscriptions, roles, role, } = {}, } = user

    return (
      <Card>
        <Card.Header>
          <h1>User Profile</h1>
        </Card.Header>
        {user.loading || storelist.loading ? (
          <Card.Body style={ { position: 'relative', } }>
            <LoadBar />
          </Card.Body>
        ) : (
          <Card.Body>
            <ProfileItem items={ photos } title='Photo' />
            <ProfileItem
              description='Your selected role defines what tools and actions you have access to.'
              items={ roles }
              title='Role'
            />
            <ProfileItem dbname='name' items={ names } title='Display Name' />
            <ProfileItem
              description='Your selected email will be used by others to contact you, should the need arise.'
              items={ emails }
              title='Email'
            />
            {role === 'Store Team' && (
              <ProfileItem
                description='Add a store (or stores) to register as a representative. This will enable you to submit and manage requests for the selected store.'
                getName={ this.getStoreName }
                items={ stores }
                title='Store'
              />
            )}
            <ProfileItem
              dbname='pushSubscription'
              description='Add this device to recieve push notifications for requests relevant to you.'
              items={ pushSubscriptions }
              title='Push Notifications'
            />
          </Card.Body>
        )}
        <Card.Footer />
      </Card>
    )
  }
}
