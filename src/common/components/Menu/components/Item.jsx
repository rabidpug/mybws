import { MenuItemWrapper, MenuText, } from '../Menu.styles';

import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import React from 'react';

const Item = ( { icon, text, path, onClick, itemAction, selectedKeys, itemKey, vertical, showText, ...props } ) => (
  <MenuItemWrapper
    isSelected={ selectedKeys.includes( itemKey ) }
    onClick={ onClick ? onClick : () => itemAction( path ) }
    showText={ showText }
    vertical={ vertical }
    { ...props }>
    {icon && (
      <FontAwesomeIcon
        icon={ icon }
        style={ {
          height     : vertical ? '2.2rem' : '3rem',
          transition : 'all 0.2s',
        } }
      />
    )}
    <MenuText showText={ showText }>{text}</MenuText>
  </MenuItemWrapper>
);

export default Item;
