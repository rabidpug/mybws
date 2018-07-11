import styled, { css, } from 'styled-components'

import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome'
import styles from 'Common/styles'

const { get: { colours, }, } = styles
const PopIconStyles = {
  Icon: styled( FontAwesomeIcon )`
    position: relative;
    z-index: 2;
    display: block;
    background: rgba(0, 0, 0, 0);
    -webkit-transition: background-color 0.2s;
    -moz-transition: background-color 0.2s;
    -o-transition: background-color 0.2s;
    transition: background-color 0.2s;
  `,
  Wrapper: styled.div`
    ${( { only, } ) =>
    only
      ? css`
            left: 50%;
            transform: translateX(-50%);
          `
      : css`
            left: 7px;
          `} top: 25%;
    position: absolute;
    display: inline-block;
    list-style-type: none;

    &:after {
      content: '';
      position: absolute;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      box-shadow: 0 0 0 0 ${colours.primary};
      transition: box-shadow 0s;
    }
    &:hover:after {
      box-shadow: 0 0 0 20px rgba(255, 150, 44, 0);
      transition: box-shadow 0.4s ease-in-out;
    }
  `,
}

export default PopIconStyles
