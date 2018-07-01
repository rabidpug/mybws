export { default as thunks, } from './thunks';
const initialState = {
  dimensions: {
    columnSize : 0,
    pageSize   : 0,
    rowSize    : 0,
  },
  infiniteScroll : false,
  items          : [],
  message        : 'Select at least one Status and Category from the Filter menu or enter a search below.',
  page           : 0,
  params         : {
    filters: {
      group: {
        Beer                       : false,
        'Non-Liquor - Cigarettes'  : false,
        'Non-Liquor - Snackfoods'  : false,
        'Non-Liquor - Soft Drinks' : false,
        'Spirits - Glass'          : false,
        'Spirits - RTD & Cider'    : false,
        'Wine - Cask & Fortified'  : false,
        'Wine - Imported'          : false,
        'Wine - Red'               : false,
        'Wine - Sparkling'         : false,
        'Wine - White'             : false,
      },
      status: {
        Available       : false,
        'Customer 1st'  : false,
        'Not Available' : false,
        'Open Request'  : false,
        'Pog Range'     : false,
        'Promo/Season'  : false,
      },
    },
    isExact : true,
    search  : '',
    sort    : {
      description  : true,
      group        : false,
      isDescending : false,
      performance  : false,
      price        : false,
    },
  },
  scrollTop: 0,
};

export default initialState;
