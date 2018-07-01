export { default as thunks, } from './thunks';
export { default as selectors, } from './selectors';

const initialState = {
  changingProfile  : false,
  connectingSocket : false,
  gettingItem      : [],
  gettingItems     : false,
  showingModal     : false,
};

export default initialState;
