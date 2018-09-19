import React, { PureComponent, } from 'react';

import Button from 'Common/components/Button';
import Input from 'Common/components/Input';
import MiniCard from 'Common/components/MiniCard/MiniCard.component';
import ModalHeader from 'Common/components/ModalHeader';
import PopIcon from 'Common/components/PopIcon/PopIcon.component';

export default class AddNewModal extends PureComponent {
  state = {
    focused  : false,
    realShow : false,
    value    : '',
  };

  componentDidMount () {
    this.setState( { realShow: true, } );
  }

  componentDidUpdate ( prevProps ) {
    const { show, } = this.props;
    const { focused, } = this.state;

    if ( prevProps.show && !show ) {
      this.setState( { value: '', } );

      this.inputRef && this.inputRef.current && this.inputRef.current.blur && this.inputRef.current.blur();
    }
    if ( !focused && this.inputRef && this.inputRef.current && this.inputRef.current.focus ) {
      this.inputRef.current.focus();

      this.setState( { focused, } );
    }
  }

  componentWillUnmount () {
    this.setState( { value: '', } );

    this.inputRef && this.inputRef.current && this.inputRef.current.blur && this.inputRef.current.blur();
  }

  inputRef = React.createRef();

  handleChange = e => this.setState( { value: e.target.value, } );

  render () {
    const { header, handleSubmit, onClose, field, label, } = this.props;
    const { value, realShow, } = this.state;

    return (
      <MiniCard modal show={ realShow }>
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
              name='input'
              onChange={ this.handleChange }
              placeholder={ label }
              ref={ this.inputRef }
              style={ { flex: 1, } }
              value={ value }
            />
            <Button name='key' value={ field } variant='secondary'>
              <PopIcon icon='plus' only />
            </Button>
          </form>
        </MiniCard.Body>
      </MiniCard>
    );
  }
}
