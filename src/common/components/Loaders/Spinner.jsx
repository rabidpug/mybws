import styled, { keyframes, } from 'styled-components';

import React from 'react';

const move = keyframes`
    0% {
      left: 0%;
    }
    75% {
      left: 100%;
    }
    100% {
      left: 100%;
    }`;
const Wrapper = styled.div`
  & > div {
    width: 20px;
    height: 20px;
    position: absolute;
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    background-color: #333;
    border-radius: 50%;
    animation: ${move} 4s infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);
  }
  & > div:nth-child(2) {
    animation-delay: 150ms;
  }
  & > div:nth-child(3) {
    animation-delay: 300ms;
  }
  & > div:nth-child(4) {
    animation-delay: 450ms;
  }
`;

const Spinner = ( { style, pastDelay = true, ...props } ) =>
  pastDelay && (
    <Wrapper { ...props }>
      <div style={ style } />
      <div style={ style } />
      <div style={ style } />
      <div style={ style } />
      <div style={ style } />
    </Wrapper>
  );

export default Spinner;
