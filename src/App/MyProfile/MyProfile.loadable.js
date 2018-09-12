import Loadable from 'react-loadable';
import LoadableLoading from 'Common/helpers/LoadableLoading';
const MyProfileLoadable = Loadable( {
  delay   : 300,
  loader  : () => import( /*webpackChunkName: "MyProfile" */ `./MyProfile.container` ),
  loading : LoadableLoading,
  timeout : 10000,
} );

export default MyProfileLoadable;
