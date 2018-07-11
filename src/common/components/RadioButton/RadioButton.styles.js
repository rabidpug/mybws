import styled from 'styled-components'
import styles from 'Common/styles'
const { get: { colours, }, } = styles

const RadioButtonStyles = {
  Input: styled.input.attrs( { type: 'radio', } )`
    margin: 0;
    display: block;
    opacity: 0;
    width: 0;
    height: 0;
    box-sizing: border-box;
    padding: 0;
    overflow: visible;
  `,
  Label: styled.label`
    border: 1px;
    cursor: pointer;
    display: inline-block;
    font-size: 1rem;
    font-weight: 400;
    min-height: 2rem;
    line-height: 1rem;
    outline: none;
    padding: 0.5rem;
    touch-action: manipulation;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    margin: 0;
    margin-bottom: 1rem;
    border-color: ${( { checked, } ) => checked ? colours.primaryL1 : colours.greyL1};
    color: ${( { checked, } ) => checked ? colours.primary : 'black'};
    border-style: solid;
    user-select: none;
    border-top-width: 1.02px;
    background-color: ${( { disabled, } ) => disabled ? 'rgba(0,0,0,0.1)' : '#fff'};
    position: relative;
    &:hover {
      box-shadow: 0 0.1rem 0.1rem -0.04rem ${colours.secondary};
    }
    &:first-child {
      border-radius: 0.25rem 0 0 0.25rem;
    }
    &:last-child {
      border-radius: 0 0.25rem 0.25rem 0;
    }
    &:only-child {
      border-radius: 0.25rem;
    }
    }
  `,
}

export default RadioButtonStyles
