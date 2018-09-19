import PopIconStyles from './PopIcon.styles';
import React from 'react';

const { Wrapper, Icon, } = PopIconStyles;
const PopIcon = ( { only, ...props } ) => (
  <Wrapper justPop={ only }>
    <Icon { ...props } />
  </Wrapper>
);

export default PopIcon;
