import Loadable from 'react-loadable'
import LoadableLoading from 'Common/helpers/LoadableLoading'
const MyRangeStoreLoadable = Loadable( {
  delay   : 300,
  loader  : () => import( /*webpackChunkName: "MyRangeStore" */ `./Store.container` ),
  loading : LoadableLoading,
  timeout : 10000,
} )

export default MyRangeStoreLoadable
