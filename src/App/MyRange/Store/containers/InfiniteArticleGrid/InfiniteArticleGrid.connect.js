// import $ from 'Store';
import { MyRangeStoreArticleLoadable, } from '../../Article';
import { connect, } from 'react-redux';

const state = state => {
  const columnCount = state.query.dimensions.columnSize;
  const maxPage = state.query.items.length;
  const inProgress = state.inProgress.gettingItems;
  const array = state.query.items;

  return {
    Component  : MyRangeStoreArticleLoadable,
    array,
    columnCount,
    loading    : !!inProgress,
    maxPage,
    message    : inProgress ? 'Searching the database...' : state.query.message,
    paramaters : state.query.params,
    rowCount   : maxPage ? Math.ceil( maxPage / columnCount ) : 0,
    rowHeight  : 340,
  };
};
const dispatch = dispatch => ( {
  loadMoreRows ( payload ) {
    // return dispatch( $.query.handleScroll( payload ) );
    dispatch;

    return payload;
  },
} );

const connectInfiniteArticleGrid = connect( state,
                                            dispatch );

export default connectInfiniteArticleGrid;
