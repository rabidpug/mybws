import styled, { css, } from 'styled-components';

import styles from 'Common/styles';

const { get: { colours, }, } = styles;
const sideWidth = ( { collapsed, isSmallDisplay, newMount, } ) =>
  isSmallDisplay && collapsed || newMount ? '0rem' : collapsed ? '4rem' : '12rem';
const smallDisplay = ( { isSmallDisplay, } ) =>
  isSmallDisplay &&
  css`
    overflow: hidden;
  `;
const swipeWidth = ( { swipeWidth, } ) =>
  swipeWidth > 0 &&
  swipeWidth < 194 &&
  css`
    width: ${swipeWidth}px;
    max-width: ${swipeWidth}px;
    min-width: ${swipeWidth}px;
    flex: 0 0 ${swipeWidth}px;
  `;

export const LayoutContent = styled.div`
  padding: 0.75rem 0.5rem;
  flex: auto;
  box-sizing: border-box;
  background-color: ${colours.whiteL1};
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  @media (max-width: 767.98px) {
    padding: 0;
  }
`;
export const LayoutHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 0px;
  z-index: 7;
  box-shadow: 0 0.0625rem 0.375rem 0 rgba(0, 0, 0, 0.2);
  border-top: 0.25rem solid ${colours.primary};
  min-height: 3.5rem;
  flex: 0 0 auto;
  display: flex;
`;
export const LayoutSideBar = styled.div`
  transition: all 0.2s;
  position: relative;
  background: ${colours.grey};
  height: 100%;
  flex: 0 0 ${sideWidth};
  max-width: ${sideWidth};
  min-width: ${sideWidth};
  width: ${sideWidth};
  ${smallDisplay};
  ${swipeWidth};
`;
export const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: ${( { parent, } ) => parent ? 'row' : 'column'};
  flex: auto;
  box-sizing: border-box;
  height: 100vh;
  width: 100vw;
  position: relative;
  transition: all 0.2s;
  overflow: hidden;
`;
