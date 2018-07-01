export { default as thunks, } from './thunks';
export { default as selectors, } from './selectors';
const initialState = {
  isAuthenticated : !!localStorage.getItem( 'JWT' ),
  profile         : {},
  socket          : false,
};

export default initialState;
