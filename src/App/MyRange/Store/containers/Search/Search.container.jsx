import React, { PureComponent, } from 'react';
import { SearchHelpIcon, SearchWrapper, } from './Search.styled';

import Input from 'Common/components/Input';
import PopIcon from 'Common/components/PopIcon';
import SearchHelp from './SearchHelp.component';
import { Tooltip, } from 'react-tippy';
import gqlMyRangeStoreSearch from './Search.gql';

@gqlMyRangeStoreSearch
export default class MyRangeStoreSearch extends PureComponent {
  render () {
    const {
      data: { query: { params: { search, }, }, },
      changeSearch,
    } = this.props;

    return (
      <SearchWrapper>
        <Input
          onChange={ e => changeSearch( { variables: { search: e.target.value, }, } ) }
          placeholder='Search'
          style={ { paddingRight: '1rem', } }
          value={ search }
        />
        <Tooltip html={ <SearchHelp /> } size='small' touchhold>
          <SearchHelpIcon>
            <PopIcon icon='question' only size='xs' />
          </SearchHelpIcon>
        </Tooltip>
      </SearchWrapper>
    );
  }
}
