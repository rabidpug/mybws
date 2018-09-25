import styled from 'styled-components';
export const Title = styled.div`
  color: hsl(0, 0%, 13%);
  font-family: 'Open Sans', sans-serif;
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 700;
  max-height: 1.8rem;
  text-overflow: ellipsis;
  overflow: hidden;
`;
export const Description = styled.div`
  color: hsl(0, 0%, 45%);
  user-select: none;
  font-size: 0.7rem;
  font-weight: 400;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre-line;
`;
export const ProfileHeader = styled.h2`
  float: left;
  user-select: none;
  margin: 0.4rem;
`;
