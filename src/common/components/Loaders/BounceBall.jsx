import styled, { keyframes, } from 'styled-components'

import React from 'react'
import styles from 'Common/styles'

const bounce = keyframes`
    0% {
      top: 30px;
      height: 5px;
      border-radius: 60px 60px 20px 20px;
      transform: scaleX(2);
    }
    35% {
      height: $height;
      border-radius: 50%;
      transform: scaleX(1);
    }
    100% {
      top: 0;
    }
`
const BounceBall = styled.div`
  position: relative;
  display: inline-block;
  height: 37px;
  width: 15px;
  &:before {
    position: absolute;
    content: '';
    display: block;
    top: 0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${styles.get.colours.primary};
    transform-origin: 50%;
    animation: ${bounce} 500ms alternate infinite ease;
  }
`

export const MidBounceBall = ( { message, bounce, } ) => (
  <div
    style={ {
      left      : '50%',
      position  : 'absolute',
      top       : '50%',
      transform : 'translate(-50%,-50%)',
    } }>
    {bounce && <BounceBall />}
    <span
      style={ {
        marginLeft : 16,
        whiteSpace : 'pre-line',
      } }>
      {message}
    </span>
  </div>
)

export default BounceBall
