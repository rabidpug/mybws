import Button from 'Common/components/Button';
import Input from 'Common/components/Input';
import PopIcon from 'Common/components/PopIcon/PopIcon.component';
import React from 'react';
const ChangePublic = ( { field, label, onSubmit, } ) => (
  <form
    onSubmit={ onSubmit } style={ {
      textAlign  : 'center',
      whiteSpace : 'nowrap',
    } }>
    <Input name='input' placeholder={ label } style={ { flex: 1, } } />
    <Button name='key' value={ field } variant='secondary'>
      <PopIcon icon='plus' only />
    </Button>
  </form>
);

export default ChangePublic;
