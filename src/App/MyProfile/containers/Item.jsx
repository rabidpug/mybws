import React, { Component, } from 'react'

import AddNewModal from './AddNewModal.component'
import PopIcon from 'Common/components/PopIcon'
import RadioButton from 'Common/components/RadioButton'
import StrikeTitle from 'Common/components/StrikeTitle'
import SubText from 'Common/components/SubText'
import gqlProfileItem from './Item.gql'
import { subscribePush, } from '../../../webpush'

@gqlProfileItem
export default class ProfileItem extends Component {
  state = { showModal: false, }

  handleSubmit = e => {
    const { title, updateUser, dbname = title.toLowerCase(), items, } = this.props
    const isChange = typeof e !== 'object'
    let value = e.target ? e.target.input.value : e

    if ( !isChange ) {
      e.preventDefault()

      e.stopPropagation()
    }

    value = isNaN( parseInt( value ) ) ? value : parseInt( value )

    if ( dbname === 'Device Name' ) {
      if ( isChange ) {
        const [ { dbname, deviceName, }, ] = items.filter( sub => sub.deviceName === value )

        subscribePush( deviceName, dbname )
      } else subscribePush( value )
    } else updateUser( { variables: { [dbname]: value, }, } )

    !isChange && this.setState( { showModal: false, } )
  }

  toggleModal = value => {
    this.setState( { showModal: value, } )
  }

  render () {
    const { title = '', description, items = [], dbname = title.toLowerCase(), getName, } = this.props
    const { showModal, } = this.state

    return (
      <span>
        <StrikeTitle>{title}</StrikeTitle>
        {description && <SubText>{description}</SubText>}
        {[
          ...items.map( item => (
            <RadioButton
              checked={ dbname === 'pushSubscription' || item.selected }
              key={ item.value }
              name={ dbname }
              onChange={ () => null }
              onClick={
                dbname === 'role' && item.selected
                  ? null
                  : e => {
                    e.stopPropagation()

                    e.target.tagName === 'INPUT' &&
                        this.handleSubmit( dbname === 'pushSubscriptions' ? item.deviceName : item.value )
                  }
              }>
              {dbname === 'store'
                ? `${item.value} - ${getName( item.value )}`
                : dbname === 'photo'
                  ? <img height='100px' src={ item.value } width='100px' />
                  : dbname === 'pushSubscription'
                    ? item.deviceName
                    :                 item.value
              }
            </RadioButton>
          ) ),
          dbname === 'photo' || dbname === 'role' ? null : (
            <RadioButton key='new' onClick={ () => this.toggleModal( true ) }>
              <PopIcon icon='plus' only />
              +
            </RadioButton>
          ),
        ]}
        <AddNewModal
          field={ dbname }
          handleSubmit={ this.handleSubmit }
          header={ dbname === 'pushSubscriptions' ? 'Enter A Name For This Device' : `Set New ${title}` }
          label={ `New ${dbname === 'pushSubscriptions' ? 'Device Name' : title}` }
          onClose={ () => this.toggleModal( false ) }
          show={ showModal }
        />
      </span>
    )
  }
}
