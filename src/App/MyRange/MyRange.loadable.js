import Loadable from 'react-loadable'
import LoadableLoading from 'Common/helpers/LoadableLoading'
const MyRangeLoadable = Loadable( {
  delay   : 300,
  loader  : () => import( /*webpackChunkName: "MyRange" */ `./MyRange.container` ),
  loading : LoadableLoading,
  timeout : 10000,
} )

export default MyRangeLoadable
