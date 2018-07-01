import styled, { css, keyframes, } from 'styled-components';

import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import styles from 'Common/styles';

const { get: { colours, }, } = styles;

const dogEar = css`
  border: 22px solid;
  border-color: ${colours.white} transparent transparent;
  bottom: auto;
  content: ' ';
  height: 0;
  position: absolute;
  top: 0;
  width: 0;
  z-index: -1;
`;

const jump = keyframes`
0% {
  transform: scale(1);
}
50% {
  transform: scale(1.02);
}
100% {
  transform: scale(1);
}
`;

const ifBigPrice = ( { isBig, } ) =>
  isBig &&
  css`
    width: 4.5rem;
    height: 4.5rem;
    line-height: 4.2rem;
    padding: 0.2rem;
    font-size: ${( { children, } ) => `${4.2 / children.length + 0.4}rem`};
    transition: all 0.7s ease-in-out;
  `;
const ifBigWrapper = ( { isBig, isBigWait, } ) =>
  isBig && !isBigWait
    ? css`
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 80%;
        height: 80%;
        z-index: 6;
      `
    : isBig && isBigWait
      ? css`
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          margin: auto;
          width: 80%;
          height: 80%;
          z-index: 6;
        `
      : css`
          margin: 0.7rem 0.7rem;
          width: ${( { top, } ) => top ? '160px' : 'auto'};
          height: ${( { top, } ) => top ? '310px' : 'auto'};
          position: relative;
          z-index: 1;
          transition: box-shadow 0.2s ease-in-out;
          &:hover {
            box-shadow: 0 0.225rem 0.475rem 0.1rem rgba(0, 0, 0, 0.2);
          }
        `;
const ifBigAvatar = ( { isBig, } ) =>
  isBig &&
  css`
    width: 176px;
    height: 220px;
    transition: all 0.7s ease-in-out;
  `;
const ifBigTitle = ( { isBig, } ) =>
  isBig &&
  css`
    max-height: 4.5rem;
    transition: all 0.7s ease-in-out;
    font-size: 1rem;
    @media (min-width: 768px) {
      font-size: 1.4rem;
    }
  `;
const ifBigTitleWrapper = ( { isBig, } ) =>
  isBig &&
  css`
    display: flex;
    flex-direction: column;
    vertical-align: middle;
    position: relative;
    text-align: left;
    margin-right: 1.1rem;
    margin-left: 1rem;
    transition: all 0.7s ease-in-out;
  `;
const cardAlignment = ( { alignRight, top, isBig, } ) =>
  alignRight
    ? css`
        float: right;
        &::before {
          ${dogEar};
          left: auto;
          right: -20px;
        }
      `
    : top
      ? css`
          display: ${isBig ? 'flex' : 'inline-block'};
          clear: none;
        `
      : css`
          float: left;
          &::after {
            ${dogEar};
            left: -20px;
            right: auto;
          }
        `;
const textAlign = ( { alignRight, top, } ) =>
  css`
    text-align: ${alignRight ? 'right' : top ? 'center' : 'left'};
  `;
const avatarTopOrNot = top
  ? css`
      width: 130px;
      height: 160px;
      clip-path: none;
    `
  : css`
      width: 40px;
      height: 40px;
      clip-path: circle(50%);
    `;

export const Avatar = styled.img`
  margin: auto;
  border: none;
  background-size: cover;
  position: relative;
  border: none;
  outline: none;
  vertical-align: middle;
  opacity: ${( { imgurl, } ) => imgurl ? 1 : 0};
  transition: all 0.6s ease-in-out;
  ${avatarTopOrNot};
  ${ifBigAvatar};
`;
export const AvatarWrapper = styled.div.attrs( { style: ( { placeholder, } ) => ( { backgroundImage: `url(${placeholder})`, } ), } )`
  background-size: 2rem;
  margin: auto;
  width: ${( { top, } ) => top ? '130px' : '40px'};
  height: ${( { top, } ) => top ? '160px' : '40px'};
  position: relative;
  user-select: none;
  ${ifBigAvatar};
`;
export const BigSide = styled.div`
  flex: 1;
  display: ${( { isBig, showChildren, } ) => isBig || showChildren ? 'block' : 'none'};
  height: 100%;
  overflow: ${( { isBig, } ) => isBig ? 'auto' : 'hidden'};
`;
export const BodyWrapper = styled.div`
  padding: ${( { isBig, } ) => isBig ? 0 : '0.2rem 0.5rem 0.5rem'};
  ${textAlign};
  white-space: pre-line;
  position: relative;
  overflow: hidden;
  flex: 1;
  display: ${( { isBig, } ) => isBig ? 'flex' : 'block'};
  margin: ${( { isBig, } ) => isBig ? 0 : 'auto'};
  & img {
    height: 1.1rem;
    width: 1.1rem;
  }
`;
export const Close = styled( FontAwesomeIcon )`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 7;
  font-size: 1.4rem;
  cursor: pointer;
  background: transparent;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: rotateZ(360deg);
  }
`;
export const Description = styled.div`
  color: hsl(0, 0%, 45%);
  font-size: 0.7rem;
  font-weight: 400;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre-line;
  ${ifBigTitle};
`;
export const HeaderWrapper = styled.div`
  background-color: ${colours.white};
  border-radius: 0.7rem 0.7rem 0 0;
  display: flex;
  cursor: pointer;
  position: relative;
  flex-direction: ${( { top, isBig, } ) => top && !isBig ? 'column' : 'row'};
  height: ${( { top, } ) => top ? '240px' : 'auto'};
  padding: 0.5rem;
`;
export const Ribbon = styled.div`
  background-color: ${( { ribbonColor, } ) => ribbonColor};
  position: absolute;
  padding: 0.1rem 0.4rem;
  top: 0;
  z-index: 2;
  border-radius: 0.5rem 0.5rem 0 0;
  left: ${( { isBig, } ) => isBig ? '12px' : 0};
  font-size: 0.8rem;
  font-family: 'Open Sans', sans-serif;
  transform: translateX(-50%) rotateZ(-45deg) translateY(${( { children, } ) => children.length * 10}%);
`;
export const Stamp = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
  background-color: ${colours.primary};
  clip-path: circle(50%);
  color: ${colours.white};
  width: 3.2rem;
  height: 3.2rem;
  line-height: 3rem;
  padding: 0.1rem;
  font-size: ${( { children, } ) => `${3 / children.length + 0.2}rem`};
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
  ${ifBigPrice};
`;
export const Title = styled.div`
  color: hsl(0, 0%, 13%);
  font-family: 'Open Sans', sans-serif;
  font-size: 0.7rem;
  line-height: 0.9rem;
  font-weight: 700;
  max-height: 1.8rem;
  text-overflow: ellipsis;
  overflow: hidden;
  ${ifBigTitle};
  font-size: ${( { isBig, } ) => isBig && '1.1rem'};
  line-height: ${( { isBig, } ) => isBig && '1.3rem'};
  max-height: ${( { isBig, } ) => isBig && '2.6rem'};
  @media (min-width: 768px) {
    font-size: ${( { isBig, } ) => isBig && '1.6rem'};
    line-height: ${( { isBig, } ) => isBig && '1.8rem'};
    max-height: ${( { isBig, } ) => isBig && '3.6rem'};
  }
`;
export const TitleWrapper = styled.div`
  flex: 1;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  overflow: hidden;
  user-select: none;
  ${textAlign};
  ${ifBigTitleWrapper};
`;
export const TopSide = styled.div`
  width: ${( { isBig, } ) => isBig ? '4rem' : 'auto'};
  margin: ${( { isBig, } ) => isBig ? 0 : 'auto'};
  margin-right: ${( { isBig, } ) => isBig ? '0.5rem' : 'auto'};
  background: ${colours.grey};
  background: ${( { isBig, } ) => !isBig && 'inherit'};
  height: 100%;
`;
export const Wrapper = styled.div`
  background-color: ${colours.whiteL2};
  border-radius: 0.7rem;
  box-shadow: 0 0.125rem 0.375rem 0 rgba(0, 0, 0, 0.2);
  clear: both;
  max-width: ${( { top, } ) => top ? '90%' : '60%'};
  overflow: hidden;
  flex-direction: column;
  ${ifBigWrapper};
  ${cardAlignment};
  ${( { doJump, } ) =>
    doJump &&
    css`
      animation: ${jump} 0.4s ease-in-out;
    `};
`;
