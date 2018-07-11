const initialState = {
  auth: {
    __typename      : 'auth',
    JWT             : '',
    isAuthenticated : !!localStorage.getItem( 'auth' ),
    refreshToken    : '',
  },
  browser : window.innerWidth,
  query   : {
    __typename : 'query',
    dimensions : {
      __typename : 'dimensions',
      columnSize : 0,
      pageSize   : 0,
      rowSize    : 0,
    },
    infiniteScroll : false,
    page           : 0,
    params         : {
      __typename     : 'params',
      descendingSort : false,
      exactSearch    : true,
      groupFilters   : [],
      search         : '',
      sort           : [],
      statusFilters  : [],
    },
    scrollTop: 0,
  },
  ui: {
    __typename         : 'ui',
    isMobile           : 'ontouchstart' in window,
    isOnline           : window.navigator.onLine,
    isSidebarCollapsed : true,
    modal              : {
      __typename : 'modal',
      body       : {
        __typename : 'body',
        dbname     : '',
        field      : '',
        items      : [],
        label      : '',
      },
      header: '',
    },
    openKeys : [],
    theme    : 'main',
  },
}

export default initialState
