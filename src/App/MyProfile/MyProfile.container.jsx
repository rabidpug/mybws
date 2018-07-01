import React, { Component, } from 'react';

import Card from 'Common/components/Card';
import ChangePublic from 'Common/components/ChangePublic';
import { Loading, } from 'Common/components/Loaders';
import ModalHeader from 'Common/components/ModalHeader';
import PopIcon from 'Common/components/PopIcon';
import RadioButton from 'Common/components/RadioButton';
import StrikeTitle from 'Common/components/StrikeTitle';
import SubText from 'Common/components/SubText';
import connectMyProfile from './MyProfile.connect';
import { getPath, } from 'utilibelt';
import { subscribePush, } from '../../webpush';
import { toast, } from 'react-toastify';
import { userIsAuthenticated, } from 'Common/helpers/authWrapper';

@userIsAuthenticated
@connectMyProfile
export default class MyProfile extends Component {
  componentDidMount () {
    document.title = 'myBWS Profile';
  }

  componentDidUpdate ( prevProps ) {
    const { changingPublicMessage, changePublic, } = this.props;

    if ( changingPublicMessage && prevProps.changingPublicMessage !== changingPublicMessage ) toast.error( changingPublicMessage, { onClose: () => changePublic( {} ), } );
  }

  componentWillUnmount () {
    const { changePublic, } = this.props;

    changePublic( {} );
  }

  handleSubmit = e => {
    e.preventDefault();

    const {
      target: {
        key: { value: key, },
        input,
      },
    } = e;
    let { value, } = input;
    const { changePublic, setModal, } = this.props;

    value = isNaN( parseInt( value ) ) ? value : parseInt( value );

    if ( key === 'Device Name' ) subscribePush( value );
    else {
      changePublic( {
        key,
        value,
      } );
    }

    setModal();
  };

  addNew = value => {
    const { setModal, } = this.props;

    setModal( {
      body: (
        <ChangePublic
          field={ value }
          label={ `New ${value === 'Device Name' ? 'Device Name' : value[0].toUpperCase()}${
            value === 'Device Name' ? '' : value.slice( 1, value.length - 1 )
          }` }
          onSubmit={ this.handleSubmit }
        />
      ),
      header: (
        <ModalHeader>
          {value === 'Device Name'
            ? 'Enter A Name For This Device'
            : `Set New ${value[0].toUpperCase()}${value.slice( 1, value.length - 1 )}`}
        </ModalHeader>
      ),
    } );
  };

  handleChangePublic = e => {
    e.stopPropagation();

    const { target: { name: key, }, } = e;
    let { target: { value, }, } = e;
    const {
      changePublic,
      profile: { pushSubscriptions = [], },
    } = this.props;

    value = isNaN( parseInt( value ) ) ? value : parseInt( value );

    if ( key && value ) {
      if ( key === 'pushSubscriptions' ) {
        const { key, deviceName, } = getPath( pushSubscriptions.filter( sub => sub.deviceName === value ), '0' );

        subscribePush( deviceName, key );
      } else {
        changePublic( {
          key,
          value,
        } );
      }
    }
  };

  render () {
    const { activeRole, profile = {}, isChangingPublic, } = this.props;
    const { photos, names, emails, stores, pushSubscriptions, roles, } = profile;
    const mapButtons = ( data = [], key ) => [
      ...data.map( item => (
        <RadioButton
          checked={ key === 'pushSubscriptions' || item.selected }
          disabled={ isChangingPublic }
          key={ key === 'stores' ? item.value._id : item.value }
          name={ key }
          onChange={ () => null }
          onClick={ key === 'roles' && item.selected ? null : this.handleChangePublic }
          value={ key === 'stores' ? item.value._id : key === 'pushSubscriptions' ? item.deviceName : item.value }>
          {key === 'photos'
            ? <img height='100px' src={ item.value } width='100px' />
            : key === 'stores'
              ? `${item.value._id} - ${item.value.name}`
              : key === 'pushSubscriptions'
                ? item.deviceName
                :             item.value
          }
        </RadioButton>
      ) ),
      key === 'photos' || key === 'roles' ? null : (
        <RadioButton key='new' onClick={ () => this.addNew( key === 'pushSubscriptions' ? 'Device Name' : key ) }>
          <PopIcon icon='plus' only />
          +
        </RadioButton>
      ),
    ];

    return profile ? (
      <Card>
        <Card.Header>
          <h1>User Profile</h1>
        </Card.Header>
        <Card.Body>
          <StrikeTitle>Picture</StrikeTitle>
          {mapButtons( photos, 'photos', true )}
          <StrikeTitle>Role</StrikeTitle>
          <SubText>Your selected role defines what tools and actions you have access to.</SubText>
          {mapButtons( roles, 'roles' )}
          <StrikeTitle>Display Name</StrikeTitle>
          {mapButtons( names, 'names' )}
          <StrikeTitle>Email</StrikeTitle>
          <SubText>Your selected email will be used by others to contact you, should the need arise.</SubText>
          {mapButtons( emails, 'emails' )}
          {activeRole === 'Store Team' && (
            <span>
              <StrikeTitle>Store</StrikeTitle>
              <SubText>
                Add a store (or stores) to register as a representative. This will enable you to submit and manage
                requests for the selected store.
              </SubText>
              {mapButtons( stores, 'stores' )}
            </span>
          )}
          <StrikeTitle>Push Notifications</StrikeTitle>
          <SubText>Add this device to recieve push notifications for requests relevant to you.</SubText>
          {mapButtons( pushSubscriptions, 'pushSubscriptions' )}
        </Card.Body>
        <Card.Footer />
      </Card>
    )
      : <Loading />;
  }
}
