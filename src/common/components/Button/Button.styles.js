import styled, { css, } from 'styled-components';

import styles from 'Common/styles';

const { get: { colours, }, } = styles;

const variantStyle = ( { variant, } ) => {
  switch ( variant ) {
  case 'secondary':
    return css`
        color: ${colours.greyD2};
        background-color: white;
        border-color: ${colours.greyL2};
        border-style: solid;
        &:hover {
          color: ${colours.primaryL2};
          border-color: ${colours.primaryL2};
        }
        &:active {
          color: ${colours.primaryD1};
          border-color: ${colours.primaryD1};
        }
      `;
  case 'tertiary':
    return css`
        color: #000;
        border-radius: 0;
        border: 2px solid transparent;
        background-color: ${colours.white};
        &:after {
          display: block;
          content: '';
          border-bottom: 2px solid ${colours.primary};
          transform: scaleX(0);
          transition: transform 250ms ease-in-out;
        }
        &:hover:after {
          transform: scaleX(1);
        }
      `;
  default:
    return css`
        color: #fff;
        background-color: ${colours.primary};
        border-color: ${colours.primary};
        border-style: solid;
        &:hover,
        :disabled {
          background-color: ${colours.primaryL2};
          border-color: ${colours.primaryL2};
        }
        &:active {
          background-color: ${colours.primaryD1};
          border-color: ${colours.primaryD1};
        }
        &:disabled {
          opacity: 0.7;
          cursor: wait;
        }
      `;
  }
};
const isActive = ( { active, } ) =>
  active &&
  css`
    color: ${colours.primaryL1};
  `;

export const StyledButton = styled.button`
  border-radius: 0.25rem;
  border: 1px;
  cursor: pointer;
  display: inline-block;
  font-size: 1rem;
  font-weight: 400;
  height: 2rem;
  line-height: ${( { href, } ) => href ? '2rem' : '1.5rem'};
  vertical-align: middle;
  margin: 0.5rem;
  outline: none;
  padding: 0 1rem;
  text-decoration: none;
  touch-action: manipulation;
  user-select: none;
  white-space: nowrap;
  box-sizing: border-box;
  position: relative;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  ${variantStyle};
  &:hover,
  :visited,
  :link,
  :active {
    text-decoration: none;
  }
  ${isActive};
`;
export const TextSpan = styled.div`
  max-width: 100%;
  text-overflow: ellipsis;
  margin: 0;
  margin-left: ${( { icon, disabled, } ) => icon || disabled ? '0.7rem' : 0};
  overflow: hidden;
`;

export const HrefButton = StyledButton.withComponent( 'a' );
