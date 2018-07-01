import Loadable from 'react-loadable';
import LoadableLoading from 'Common/helpers/LoadableLoading';
const SignInLoadable = Loadable( {
  delay   : 300,
  loader  : () => import( /*webpackChunkName: "SignIn" */ `./SignIn.component` ),
  loading : LoadableLoading,
  timeout : 10000,
} );

export default SignInLoadable;
