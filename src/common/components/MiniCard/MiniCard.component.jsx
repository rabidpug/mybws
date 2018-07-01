import React, { PureComponent, } from 'react';

import Body from './components/Body';
import Header from './components/Header';
import { MidBounceBall, } from '../Loaders';
import { Wrapper, } from './MiniCard.styles';

export default class MiniCard extends PureComponent {
  static Header = Header;

  static Body = Body;

  render () {
    const { children, alignRight, top, isBig, loading, } = this.props;
    const childrenWithProps = React.Children.map( children,
                                                  child =>
                                                    typeof child.type === 'string'
                                                      ? child
                                                      : React.cloneElement( child, {
                                                        alignRight,
                                                        isBig,
                                                        top,
                                                      } ) );

    return (
      <Wrapper { ...this.props }>
        {childrenWithProps}
        {loading && <MidBounceBall bounce={ loading } message={ typeof loading === 'string' ? loading : '' } />}
      </Wrapper>
    );
  }
}
