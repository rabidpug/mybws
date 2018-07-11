import styled, { css, keyframes, } from 'styled-components'

import styles from 'Common/styles'

const { get: { colours, }, } = styles

const isSelectedStyling = ( { isSelected, vertical, } ) =>
  isSelected && vertical
    ? css`
        background-color: ${colours.primary};
      `
    : isSelected
      ? css`
          background: linear-gradient(to left, transparent 97%, ${colours.complementary} 3%);
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: left center;
          transition: background-size 0.3s ease-in-out;
        `
      : ''
const isOpenPadding = ( { vertical, showText, childCount = 0, } ) =>
  vertical && showText ? `${1 + 0.5 * childCount}rem` : '1.3rem'
const orientationStyling = ( { vertical, childCount, isSubMenu, } ) =>
  vertical
    ? css`
        display: block;
        height: 2.2rem;
        line-height: 2rem;
        width: 100%;
        color: ${colours.whiteL2};
        &:hover {
          background-color: ${colours.secondary};
        }
      `
    : css`
        height: 3rem;
        line-height: 3rem;
        width: ${isSubMenu ? '100%' : 'auto'}
        color: ${colours.greyD1};
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        margin: ${childCount ? 0 : '0 0.25rem'};
        &:hover {
          border-bottom: 2px solid ${colours.primary};
          color: ${colours.primary};
        }
`
const bounce = keyframes`
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-5px);
      }
      100% {
        transform: translateY(0px);
      }`
const liSubMenuStyling = ( { vertical, childCount, } ) =>
  vertical
    ? css`
        display: block;
        color: ${colours.whiteL2};
      `
    : css`
        display: flex;
        float: ${childCount === 1 && 'right'};
        color: ${colours.greyD1};
        margin: 0;
      `
const subMenuOrientationStyling = ( { vertical, childCount, } ) =>
  vertical
    ? ''
    : childCount > 1
      ? css`
          position: absolute;
          right: 100%;
          top: 0.25rem;
        `
      : css`
          position: absolute;
          top: 3rem;
          right: 0;
        `

export const MenuItemWrapper = styled.li`
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  margin: 0.3rem 0;
  padding: 0 ${isOpenPadding};
  flex: 1;
  float: ${( { vertical, } ) => vertical ? 'none' : 'right'};
  &:hover > svg:first-child {
    animation: ${bounce} 0.6s ease-in-out infinite;
  }
  background-size: 0%;
  transition: background-size 0.3s ease-in-out;
  ${orientationStyling};
  ${isSelectedStyling};
`
export const MenuSubItem = styled.li`
  transition: all 0.2s;
  color: ${colours.whiteL2};
  position: relative;
  z-index: 5;
  z-index: ${( { isOpen, } ) => isOpen ? 10 : 5};
  flex: 1;
  &:hover > span > svg:first-child {
    animation: ${bounce} 0.6s ease-in-out infinite;
  }
  background-size: 0%;
  transition: background-size 0.3s ease-in-out;
  ${isSelectedStyling};
  ${liSubMenuStyling};
`
export const MenuSubTitle = styled.span`
  transition: all 0.2s;
  padding: 0 ${isOpenPadding};
  overflow: hidden;
  flex: 1;
  color: ${colours.whiteL2};
  background-size: 0%;
  transition: background-size 0.3s ease-in-out;
  ${orientationStyling};
  ${isSelectedStyling};
`
export const MenuSubWrapper = styled.ul`
  padding: 0;
  transition: all 0.2s;
  flex: 1;
  overflow: ${( { isOpen, } ) => isOpen ? 'inherit' : 'hidden'};
  box-shadow: ${( { vertical, } ) =>
    vertical ? 'inset 0 2px 8px rgba(0, 0, 0, 0.45)' : '0 0.125rem 0.375rem 0 rgba(0, 0, 0, 0.2)'};
  border-color: ${colours.whiteL2};
  background-color: ${( { vertical, } ) => vertical ? colours.greyD2 : '#fff'};
  max-height: ${( { isOpen, noItems, vertical, } ) => isOpen ? `${noItems * ( vertical ? 2.6 : 3.3 )}rem` : 0};
  height: auto;

  ${subMenuOrientationStyling};
`
export const MenuText = styled.span`
  transition: all 0.2s;
  margin-left: 0.5rem;
  flex: 1;
  max-width: ${( { showText, } ) => showText ? '200px' : 0};
  font-family: 'Open Sans', sans-serif;
  display: inline-block;
  overflow: hidden;
`
export const MenuWrapper = styled.ul`
  list-style-type: none;
  cursor: pointer;
  white-space: nowrap;
  padding: 0;
  transition: all 0.2s;
  user-select: none;
  z-index: 5;
  display: ${( { vertical, } ) => vertical ? 'block' : 'inline-block'};
  float: ${( { vertical, } ) => vertical ? 'none' : 'right'};
  flex: 1;
`
