import styled from 'styled-components';
const MiniAvatar = styled.button`
  background-image: url(${( { src, } ) => src});
  background-size: 40px;
  margin: 5px;
  display: inline-block;
  width: 40px;
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${( { isOnline, } ) => isOnline ? 'green' : 'red'};
  transition: all 0.2s ease-in-out;
  transform: scale(1);
  outline: none;
  &:hover {
    box-shadow: 0 0.1rem 0.2rem 0.1rem rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
    border: 2px solid ${( { isOnline, } ) => isOnline ? 'green' : 'red'};
    cursor: pointer;
  }
`;

export default MiniAvatar;
