import Loadable from 'react-loadable';
import LoadableLoading from 'Common/helpers/LoadableLoading';
const MyRangeStoreArticleLoadable = Loadable( {
  delay   : 300,
  loader  : () => import( /*webpackChunkName: "MyRangeStoreArticle" */ `./Article.container` ),
  loading : LoadableLoading,
  timeout : 10000,
} );

export default MyRangeStoreArticleLoadable;
