import $ from 'redux-methods';
import { connect, } from 'react-redux';
const { fetchArticle, } = $.data;
const dispatch = { fetchArticle, };
const state = ( state, props ) => {
  const {
    match = {},
    item = +match.params._id,
    location: { pathname, },
  } = props;
  const [
    , , storeID,
  ] = pathname.split( '/' );

  const store = $.data.stores.getById( storeID )( state );
  const article = $.data.articles.getById( item )( state );
  const orgdist = store && `${store.organisation}.${store.district}`;
  const isBig = !!match.params._id;
  const planograms = isBig && $.data.planograms.getByStoreArticle( storeID, item )( state );

  return {
    activeRole  : $.user.profile.getActiveRole( state ),
    article,
    gettingItem : $.inProgress.selectGettingItem( state ),
    isBig,
    orgdist,
    planograms,
    store,
    storeID,
  };
};
const connectMyRangeStoreArticle = connect( state,
                                            dispatch );

export default connectMyRangeStoreArticle;
