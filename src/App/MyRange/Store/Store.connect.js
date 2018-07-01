import $ from 'redux-methods';
import { connect, } from 'react-redux';

const {
  params: { search: { set: handleSearchValue, }, },
  page: { set: changePage, },
  dimensions: { add: handlePageDimensions, },
  fetchArticles,
} = $.query;
const { changePublic, } = $.user;
const { gettingItems: { set: setGettingArticles, }, } = $.inProgress;
const dispatch = {
  changePage,
  changePublic,
  fetchArticles,
  handlePageDimensions,
  handleSearchValue,
  setGettingArticles,
};
const state = ( state, props ) => {
  const { location: { pathname, }, } = props;
  const [
    , , storeID,
  ] = pathname.split( '/' );
  const store = state.data.stores[+storeID];

  return {
    articles           : state.query.items,
    fetching           : state.inProgress.gettingItems,
    infiniteScroll     : state.query.infiniteScroll,
    isSidebarCollapsed : !state.browser > 1200 && state.ui.isSidebarCollapsed,
    message            : state.inProgress.gettingArticles ? 'Searching the database...' : state.query.message,
    page               : state.query.page,
    pageSize           : state.query.dimensions.pageSize,
    params             : state.query.params,
    profile            : state.user.profile,
    store,
    storeID,
  };
};
const connectMyRangeStore = connect( state,
                                     dispatch );

export default connectMyRangeStore;
