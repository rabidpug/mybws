import { ModalWrap, Wrapper, } from './MiniCard.styles';
import React, { PureComponent, } from 'react';

import Body from './components/Body';
import Header from './components/Header';
import { MidBounceBall, } from '../Loaders';

export default class MiniCard extends PureComponent {
  static Header = Header

  static Body = Body

  render () {
    const { children, alignRight, top, isBig, loading, modal, show, } = this.props;
    const childrenWithProps = React.Children.map( children,
                                                  child =>
                                                    typeof child.type === 'string'
                                                      ? child
                                                      : React.cloneElement( child, {
                                                        alignRight,
                                                        isBig,
                                                        top,
                                                      } ) );

    return modal ? (
      <ModalWrap show={ show }>
        <Wrapper { ...this.props } modal={ modal } show={ show }>
          {childrenWithProps}
          {loading && <MidBounceBall bounce={ loading } message={ typeof loading === 'string' ? loading : '' } />}
        </Wrapper>
      </ModalWrap>
    ) : (
      <Wrapper { ...this.props }>
        {childrenWithProps}
        {loading && <MidBounceBall bounce={ loading } message={ typeof loading === 'string' ? loading : '' } />}
      </Wrapper>
    );
  }
}
