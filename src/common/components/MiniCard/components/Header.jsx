import { Close, Description, HeaderWrapper, Title, TitleWrapper, } from '../MiniCard.styles';

import AvatarContainer from './AvatarContainer';
import React from 'react';

const Header = ( {
  avatar,
  alt,
  title,
  top,
  isBig,
  noimg,
  onCloseClick,
  placeholder,
  ribbon,
  ribbonColor,
  stamp,
  description,
  alignRight,
  children,
  ...props
} ) => {
  const AvatarProps = {
    alt,
    avatar,
    isBig,
    noimg,
    placeholder,
    ribbon,
    ribbonColor,
    stamp,
    top,
  };

  return (
    <HeaderWrapper { ...props } isBig={ isBig } top={ top }>
      {onCloseClick && <Close icon='times' onClick={ onCloseClick } />}
      {!alignRight && avatar && <AvatarContainer { ...AvatarProps } />}
      {( title || description || children ) && (
        <TitleWrapper alignRight={ alignRight } isBig={ isBig } top={ top }>
          <Title isBig={ isBig }>{title}</Title>
          <Description isBig={ isBig }>{description}</Description>
          {children}
        </TitleWrapper>
      )}
      {alignRight && avatar && <AvatarContainer { ...AvatarProps } />}
    </HeaderWrapper>
  );
};

export default Header;
