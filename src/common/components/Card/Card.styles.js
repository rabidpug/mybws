import styled, { css, } from 'styled-components'

import styles from 'Common/styles'

const { get: { colours, }, } = styles

const full = css`
  height: 100%;
  margin: 0;
  max-height: 100%;
  max-width: 100%;
  width: 100%;
`

export const CardBody = styled.div`
  display: block;
  flex: 1;
  flex-grow: 1;
  margin: 0;
  padding: 0.625rem;
  overflow: auto;
  ${styles.get.scrollBar};
  overflow-x: hidden;
`
export const CardFooter = styled.div`
  background-color: ${colours.white};
  box-shadow: 0 0.125rem 0.375rem 0 rgba(0, 0, 0, 0.2);
  padding: 0.625rem 0;
`
export const CardHeader = styled.div`
  background-color: ${colours.whiteL1};
  padding-top: 0.225rem;
  padding-bottom: 0.225rem;
  user-select: none;
`
export const CardWrapper = styled.div`
  background-color: ${colours.whiteL2};
  box-shadow: 0 0.25rem 0.375rem 0 rgba(0, 0, 0, 0.2);
  left: 0;
  display: flex;
  flex-direction: column;
  margin: 0.75rem 2rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
  padding: 0;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
  width: calc(100% - 4rem);
  min-height: 50%;
  max-height: calc(100% - 1.5rem);
  @media (max-width: 767.98px) {
    ${full};
  }
  ${( { fullScreen, } ) => fullScreen && full};
`
