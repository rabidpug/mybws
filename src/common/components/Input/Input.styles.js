import styled from 'styled-components';
import styles from 'Common/styles';
const { get: { colours, }, } = styles;

const lines = /\n\r|\n|\r/g;
const fontSize = ( { size, } ) => `${size === 'small' ? 1 : size === 'large' ? 2 : 1.5}rem`;
const getHeight = ( { value = '', fitContent, size, } ) =>
  typeof value === 'string' && value.match( lines ) && fitContent
    ? `${value.match( lines ).length * ( size === 'small' ? 1 : size === 'large' ? 2 : 1.5 ) + 2}rem`
    : `${size === 'small' ? 1.25 : size === 'large' ? 2.25 : 1.75}rem`;

export const InputWrapper = styled.input`
  resize: both;
  text-align: left;
  box-sizing: border-box;
  list-style: none;
  position: relative;
  display: inline-block;
  padding: 0rem 0.25rem 0rem 0.25rem;
  font-size: ${fontSize};
  zoom: 0.75;
  line-height: ${fontSize};
  flex: 1;
  vertical-align: middle;
  min-height: ${( { rows = 1, size, } ) => `${rows * ( size === 'small' ? 1 : size === 'large' ? 2 : 1.5 ) + 0.5}rem`};
  height: ${getHeight};
  touch-action: manipulation;
  overflow: visible;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
  margin: ${( { size, } ) => size === 'small' ? 0 : 'auto'};
  &:hover,
  :focus {
    border-color: ${colours.primaryL1};
  }
  &:focus {
    outline: 0;
    box-shadow: 0 0 0 1px ${colours.secondary};
  }
  &::placeholder {
    color: ${colours.grey};
  }
`;

export const TextArea = InputWrapper.withComponent( 'textarea' );
