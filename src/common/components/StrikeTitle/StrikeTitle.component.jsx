import { Text, Wrapper, } from './StrikeTitle.styles';

import React from 'react';

const StrikeTitle = props => (
  <Wrapper>
    <Text { ...props } />
  </Wrapper>
);

export default StrikeTitle;
