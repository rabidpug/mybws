import SideBar from '../containers/SideBar'

const navMenu = [
  {
    component : SideBar,
    menuItems : [
      {
        icon            : 'home',
        isAuthenticated : true,
        key             : 'sub1',
        label           : 'myHome',
        path            : '/',
      },
      {
        icon            : 'sign-in-alt',
        isAuthenticated : false,
        key             : 'item2',
        label           : 'Sign In',
        path            : '/signin',
      },
      {
        icon            : 'wine-glass',
        isAuthenticated : true,
        key             : 'item3',
        label           : 'myRange',
        path            : '/myRange',
      },
      {
        icon            : 'user',
        isAuthenticated : true,
        key             : 'item4',
        label           : 'myProfile',
        path            : '/myProfile',
      },
    ],
    path: '*',
  },
]

export default navMenu
