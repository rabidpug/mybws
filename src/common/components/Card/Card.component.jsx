import { CardBody, CardFooter, CardHeader, CardWrapper, } from './Card.styles';
import React, { PureComponent, } from 'react';

export default class Card extends PureComponent {
  static Body = CardBody;

  static Footer = CardFooter;

  static Header = CardHeader;

  render () {
    return <CardWrapper { ...this.props } />;
  }
}
