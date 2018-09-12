import styled, { keyframes, } from 'styled-components';

import React from 'react';

const loading = keyframes`
    from {
      left: -199px;
      width: 30%;
    }
    50 % {
      width: 30%;
    }
    70 % {
      width: 70%;
    }
    80 % {
      left: 50%;
    }
    95 % {
      left: 120%;
    }
    to {
      left: 100%;
    }
  `;
const LoadBarTop = styled.div`
  height: 4px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #ddd;
  &:before {
    display: block;
    position: absolute;
    content: '';
    left: -200px;
    width: 200px;
    height: 4px;
    background-color: #2980b9;
    animation: ${loading} 2s linear infinite;
  }
`;
const LoadBarWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: rgba(0, 0, 0, 0.2);
`;

const LoadBar = () => (
  <LoadBarWrap>
    <LoadBarTop />
  </LoadBarWrap>
);

export default LoadBar;
