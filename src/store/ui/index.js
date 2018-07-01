export { default as thunks, } from './thunks';
const initialState = {
  isOnline           : window.navigator.onLine,
  isSidebarCollapsed : true,
  modal              : false,
  openKeys           : [],
  theme              : 'main',
};

export default initialState;
