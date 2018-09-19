import React, { PureComponent, } from 'react';

import { InfiniteArticleGrid, } from '../InfiniteArticleGrid';
import { MidBounceBall, } from 'Common/components/Loaders';
import { MyRangeStoreArticleLoadable, } from '../../Article';
import Swipeable from 'react-swipeable';
import gqlMyRangeStoreArticles from './Articles.gql';
import { withRouter, } from 'react-router-dom';

@withRouter
@gqlMyRangeStoreArticles
class MyRangeStoreArticles extends PureComponent {
  handleChangePageNo = value => {
    const {
      changePage,
      maxPage,
      data: { query: { page = 0, }, },
    } = this.props;
    let newValue;

    if ( typeof value === 'object' ) newValue = value.target.value === '' ? value.target.value : value.target.value - 1;
    else newValue = value ? page + 1 : page - 1;

    changePage( { variables: { page: newValue >= maxPage ? 0 : newValue < 0 ? maxPage - 1 : newValue, }, } );
  };

  articleRenderer = () => {
    const {
      articles = [],
      data: {
        query: {
          page = 0,
          dimensions: { pageSize = 8, },
        },
      },
    } = this.props;

    const startIndex = page * pageSize;

    return articles
      .slice( startIndex, startIndex + pageSize )
      .map( item => <MyRangeStoreArticleLoadable item={ item } key={ item } /> );
  };

  render () {
    const {
      data: {
        query: {
          infiniteScroll,
          dimensions: { columnSize, },
        },
      },
      loading,
      message,
      articles = [],
    } = this.props;

    return infiniteScroll ? (
      <InfiniteArticleGrid
        array={ articles }
        columnCount={ columnSize }
        component={ MyRangeStoreArticleLoadable }
        loading={ loading }
        message={ message }
        rowHeight={ 320 }
      />
    ) : loading || articles.length === 0 ? (
      <MidBounceBall
        bounce={ loading }
        message={
          loading
            ? 'Searching the database...'
            : message ||
              'There are no results to display. Select at least one Status and Category from the Filter menu or enter a search below.'
        }
      />
    ) : (
      <Swipeable
        onSwipedLeft={ ( e, d, isFlick ) => isFlick && this.handleChangePageNo( true ) }
        onSwipedRight={ ( e, d, isFlick ) => isFlick && this.handleChangePageNo() }>
        {this.articleRenderer()}
      </Swipeable>
    );
  }
}
export default MyRangeStoreArticles;
