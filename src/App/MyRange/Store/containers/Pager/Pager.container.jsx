import { InfoWrapper, PagerWrapper, } from './Pager.styled';
import React, { PureComponent, } from 'react';

import Button from 'Common/components/Button';
import Input from 'Common/components/Input';
import gqlMyRangeStorePager from './Pager.gql';

@gqlMyRangeStorePager
export default class MyRangeStorePager extends PureComponent {
  handleChange = value => {
    const {
      changePage,
      maxPage,
      data: { query: { page = 0, }, },
    } = this.props;
    let newValue;

    if ( typeof value === 'object' ) newValue = value.target.value === '' ? value.target.value : value.target.value - 1;
    else newValue = value ? page + 1 : page - 1;

    changePage( { variables: { page: newValue >= maxPage ? 0 : newValue < 0 ? maxPage - 1 : newValue, }, } );
  }

  render () {
    const {
      maxPage,
      data: {
        query: {
          page = 0,
          dimensions: { pageSize = 8, },
        },
      },
    } = this.props;

    return (
      <PagerWrapper>
        <Button onClick={ () => this.handleChange() } style={ { padding: 0, } } variant='tertiary'>
          Previous
        </Button>
        <InfoWrapper>
          {'Page '}
          <Input
            onChange={ this.handleChange }
            placeholder='Page'
            style={ {
              textAlign : 'center',
              width     : ( page + 1 ).toString().length * 20 + 20,
            } }
            value={ page === '' ? page : ( page + 1 ).toString() }
          />
          <br />
          {` of ${Math.ceil( maxPage / pageSize )}`}
        </InfoWrapper>
        <Button onClick={ () => this.handleChange( true ) } style={ { padding: 0, } } variant='tertiary'>
          Next
        </Button>
      </PagerWrapper>
    );
  }
}
