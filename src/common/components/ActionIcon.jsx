import styled, { keyframes, } from 'styled-components';

import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import React from 'react';
import styles from 'Common/styles';

const { get: { colours: { withOpacity, }, }, } = styles;

const hoverAnimation = props => keyframes`
0% {
  box-shadow: 0 1px 4px 0 ${withOpacity( 0.24, 'primary' )( props )}, 0 5px 1px -2px rgba(0,0,0,0.22), 0 2px 5px 0 rgba(0,0,0,0.4);
}
50% {
  box-shadow: 0 4px 4px 0 ${withOpacity( 0.54, 'primary' )( props )}, 0 5px 2px -2px ${withOpacity( 0.52, 'primary' )( props )}, 0 2px 7px 0 ${withOpacity( 0.9, 'primary' )( props )};
}
100% {
  box-shadow: 0 1px 4px 0 ${withOpacity( 0.24, 'primary' )( props )}, 0 5px 1px -2px rgba(0,0,0,0.22), 0 2px 5px 0 rgba(0,0,0,0.4);
}
`;

const Wrapper = styled.div`
  font-size: 1.3rem;
  border-radius: 50%;
  box-shadow: 0 1px 4px 0 ${withOpacity( 0.24, 'primary' )}, 0 5px 1px -2px rgba(0, 0, 0, 0.22),
    0 2px 5px 0 rgba(0, 0, 0, 0.4);
  margin: 0.4rem;
  line-height: 3rem;
  display: inline-block;
  width: 3rem;
  height: 3rem;
  text-align: center;
  max-width: 3rem;
  cursor: pointer;
  max-height: 3rem;
  &:hover {
    transform: scale(1.1);
    animation: ${props => `${hoverAnimation( props )} 1s ease-in-out infinite`};
  }
`;
const ActionIcon = ( { icon, ...props } ) => (
  <Wrapper { ...props }>
    <FontAwesomeIcon icon={ icon } />
  </Wrapper>
);

export default ActionIcon;
