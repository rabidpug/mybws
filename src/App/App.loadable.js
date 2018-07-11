import Loadable from 'react-loadable'
import LoadableLoading from 'Common/helpers/LoadableLoading'
const App = Loadable( {
  delay   : 300,
  loader  : () => import( /*webpackChunkName: "App" */ `./App.container` ),
  loading : LoadableLoading,
  timeout : 10000,
} )

export default App
