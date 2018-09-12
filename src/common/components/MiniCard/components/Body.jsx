import { BigSide, BodyWrapper, TopSide, } from '../MiniCard.styles';
import React, { PureComponent, } from 'react';

import UrlMessage from 'Common/components/UrlMessage';

export default class Body extends PureComponent {
  render () {
    const { message: Top, children, isBig, messageProps, showChildren, ...props } = this.props;
    const check = typeof Top !== 'function';

    return (
      <BodyWrapper isBig={ isBig } { ...props }>
        <TopSide isBig={ isBig }>
          {check && Top && <UrlMessage message={ Top } />}
          {!check && <Top { ...messageProps } />}
        </TopSide>
        <BigSide isBig={ isBig } showChildren={ showChildren }>
          {children}
        </BigSide>
      </BodyWrapper>
    );
  }
}
