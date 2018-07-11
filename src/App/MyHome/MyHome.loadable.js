import Loadable from 'react-loadable'
import LoadableLoading from 'Common/helpers/LoadableLoading'
const MyHomeLoadable = Loadable( {
  delay   : 300,
  loader  : () => import( /*webpackChunkName: "MyHome" */ `./MyHome.component` ),
  loading : LoadableLoading,
  timeout : 10000,
} )

export default MyHomeLoadable
