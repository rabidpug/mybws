import React, { PureComponent, } from 'react'

import Button from 'Common/components/Button'
import Input from 'Common/components/Input'
import MiniCard from 'Common/components/MiniCard/MiniCard.component'
import ModalHeader from 'Common/components/ModalHeader'
import PopIcon from 'Common/components/PopIcon/PopIcon.component'

export default class AddNewModal extends PureComponent {
  state = { value: '', }

  componentDidUpdate ( prevProps ) {
    const { show, } = this.props

    if ( prevProps.show && !show ) {
      this.setState( { value: '', } )

      this.inputRef && this.inputRef.blur()
    }
  }

  componentWillUnmount () {
    this.setState( { value: '', } )

    this.inputRef && this.inputRef.blur()
  }

  inputRef = React.createRef()

  handleChange = e => this.setState( { value: e.target.value, } )

  render () {
    const { show, header, handleSubmit, onClose, field, label, } = this.props
    const { value, } = this.state

    return (
      <MiniCard modal show={ show }>
        <MiniCard.Header onCloseClick={ onClose }>
          <ModalHeader>{header}</ModalHeader>
        </MiniCard.Header>
        <MiniCard.Body showChildren>
          <form
            onSubmit={ handleSubmit }
            style={ {
              textAlign  : 'center',
              whiteSpace : 'nowrap',
            } }>
            <Input
              autoFocus
              innerRef={ e => this.inputRef = e }
              name='input'
              onChange={ this.handleChange }
              placeholder={ label }
              style={ { flex: 1, } }
              value={ value }
            />
            <Button name='key' value={ field } variant='secondary'>
              <PopIcon icon='plus' only />
            </Button>
          </form>
        </MiniCard.Body>
      </MiniCard>
    )
  }
}
