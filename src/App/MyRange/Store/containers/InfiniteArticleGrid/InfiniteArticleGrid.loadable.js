import Loadable from 'react-loadable';
import LoadableLoading from 'Common/helpers/LoadableLoading';
const InfiniteArticleGrid = Loadable( {
  delay   : 300,
  loader  : () => import( /*webpackChunkName: "InfiniteArticleGrid" */ `./InfiniteArticleGrid.container` ),
  loading : LoadableLoading,
  timeout : 10000,
} );

export default InfiniteArticleGrid;
