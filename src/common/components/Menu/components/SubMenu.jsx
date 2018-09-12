import { MenuSubItem, MenuSubTitle, MenuSubWrapper, MenuText, } from '../Menu.styles';

import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import React from 'react';

const SubMenu = ( {
  children,
  childCount = 0,
  icon,
  text,
  itemKey,
  noItems,
  onClick,
  selectedKeys,
  openKeys,
  showText,
  vertical,
  subMenuAction,
  itemAction,
  ...props
} ) => {
  childCount = childCount + 1;

  const isSubMenu = true;

  const liProps = {
    childCount,
    vertical,
  };
  const titleProps = {};

  const isOpen = openKeys.includes( itemKey );

  if ( !vertical ) {
    liProps.onMouseEnter = () => !isOpen && subMenuAction( itemKey );

    liProps.onMouseLeave = () => isOpen && subMenuAction( itemKey );

    titleProps.onClick = onClick ? onClick : null;
  }
  const childProps = {
    childCount,
    isSubMenu,
    itemAction,
    openKeys,
    selectedKeys,
    showText,
    subMenuAction,
    vertical,
  };

  return (
    <MenuSubItem { ...liProps } isOpen={ isOpen }>
      <MenuSubTitle
        onClick={ () => subMenuAction( itemKey ) }
        { ...titleProps }
        { ...childProps }
        childCount={ childCount - 1 }
        isOpen={ isOpen }
        isSelected={ selectedKeys.some( key => key.slice( 0, itemKey.length ) === itemKey ) }>
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
        {showText &&
          vertical && (
          <FontAwesomeIcon
            icon={ isOpen ? 'chevron-up' : 'chevron-down' }
            size='xs'
            style={ {
              float  : 'right',
              height : '2rem',
            } }
          />
        )}
      </MenuSubTitle>
      <MenuSubWrapper
        isOpen={ isOpen } noItems={ noItems } { ...childProps }
        { ...props }>
        {React.Children.map( children, child => React.cloneElement( child, childProps ) )}
      </MenuSubWrapper>
    </MenuSubItem>
  );
};

export default SubMenu;
