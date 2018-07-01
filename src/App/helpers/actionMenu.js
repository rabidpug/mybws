import $ from 'redux-methods';
import TopBar from '../containers/TopBar';
import { store, } from 'Store';

const actionMenu = [
  {
    actionMenuItems: [
      {
        action          : () => store.dispatch( $.user.doLogOut() ),
        icon            : 'sign-out-alt',
        isAuthenticated : true,
        key             : '1',
        label           : 'Log Out',
      },
    ],
    component : TopBar,
    path      : '/myProfile',
  },
  {
    actionMenuItems: [
      {
        icon            : 'filter',
        isAuthenticated : true,
        key             : 'filters',
        label           : 'Filter',
        subMenu         : [
          {
            action: () =>
              store.dispatch( $.query.toggleStatus( [
                'filters.status.Pog Range',
                'filters.status.Open Request',
                'filters.status.Available',
                'filters.status.Not Available',
                'filters.status.Customer 1st',
                'filters.status.Promo/Season',
              ] ) ),
            icon            : 'star',
            isAuthenticated : true,
            key             : 'status',
            label           : 'Status',
            subMenu         : [
              {
                action          : () => store.dispatch( $.query.toggleStatus( 'filters.status.Pog Range' ) ),
                icon            : 'tasks',
                isAuthenticated : true,
                key             : 'Pog Range',
                label           : 'My Planogram Range',
              },
              {
                action          : () => store.dispatch( $.query.toggleStatus( 'filters.status.Promo/Season' ) ),
                icon            : 'chart-line',
                isAuthenticated : true,
                key             : 'Promo/Season',
                label           : 'My Promo/Season Range',
              },
              {
                action          : () => store.dispatch( $.query.toggleStatus( 'filters.status.Customer 1st' ) ),
                icon            : 'cart-plus',
                isAuthenticated : true,
                key             : 'Customer 1st',
                label           : 'My Customer 1st Range',
              },
              {
                action          : () => store.dispatch( $.query.toggleStatus( 'filters.status.Open Request' ) ),
                icon            : 'clock',
                isAuthenticated : true,
                key             : 'Open Request',
                label           : 'My Open Requests',
              },
              {
                action          : () => store.dispatch( $.query.toggleStatus( 'filters.status.Available' ) ),
                icon            : 'check-circle',
                isAuthenticated : true,
                key             : 'Available',
                label           : 'My Available Products',
              },
              {
                action          : () => store.dispatch( $.query.toggleStatus( 'filters.status.Not Available' ) ),
                icon            : 'times-circle',
                isAuthenticated : true,
                key             : 'Not Available',
                label           : 'Not Available Products',
              },
            ],
          },
          {
            action: () =>
              store.dispatch( $.query.toggleStatus( [
                `filters.group.Wine - Red`,
                `filters.group.Wine - White`,
                `filters.group.Wine - Sparkling`,
                `filters.group.Wine - Imported`,
                `filters.group.Wine - Cask & Fortified`,
                `filters.group.Spirits - Glass`,
                `filters.group.Spirits - RTD & Cider`,
                `filters.group.Non-Liquor - Cigarettes`,
                `filters.group.Non-Liquor - Snackfoods`,
                'filters.group.Non-Liquor - Soft Drinks',
                'filters.group.Beer',
              ] ) ),
            icon            : 'boxes',
            isAuthenticated : true,
            key             : 'category',
            label           : 'Category',
            subMenu         : [
              {
                action: () =>
                  store.dispatch( $.query.toggleStatus( [
                    `filters.group.Wine - Red`,
                    `filters.group.Wine - White`,
                    `filters.group.Wine - Sparkling`,
                    `filters.group.Wine - Imported`,
                    `filters.group.Wine - Cask & Fortified`,
                  ] ) ),
                icon            : 'wine-glass',
                isAuthenticated : true,
                key             : 'Wine',
                label           : 'Wine',
                subMenu         : [
                  {
                    action          : () => store.dispatch( $.query.toggleStatus( `filters.group.Wine - Red` ) ),
                    icon            : 'map-pin',
                    isAuthenticated : true,
                    key             : 'Wine - Red',
                    label           : 'Wine - Red',
                  },
                  {
                    action          : () => store.dispatch( $.query.toggleStatus( `filters.group.Wine - White` ) ),
                    icon            : 'map-pin',
                    isAuthenticated : true,
                    key             : 'Wine - White',
                    label           : 'Wine - White',
                  },
                  {
                    action          : () => store.dispatch( $.query.toggleStatus( `filters.group.Wine - Sparkling` ) ),
                    icon            : 'map-pin',
                    isAuthenticated : true,
                    key             : 'Wine - Sparkling',
                    label           : 'Wine - Sparkling',
                  },
                  {
                    action          : () => store.dispatch( $.query.toggleStatus( `filters.group.Wine - Imported` ) ),
                    icon            : 'map-pin',
                    isAuthenticated : true,
                    key             : 'Wine - Imported',
                    label           : 'Wine - Imported',
                  },
                  {
                    action          : () => store.dispatch( $.query.toggleStatus( `filters.group.Wine - Cask & Fortified` ) ),
                    icon            : 'map-pin',
                    isAuthenticated : true,
                    key             : 'Wine - Cask & Fortified',
                    label           : 'Wine - Cask & Fortified',
                  },
                ],
              },
              {
                action: () =>
                  store.dispatch( $.query.toggleStatus( [
                    `filters.group.Spirits - Glass`,
                    `filters.group.Spirits - RTD & Cider`,
                  ] ) ),
                icon            : 'glass-martini',
                isAuthenticated : true,
                key             : 'Spirits',
                label           : 'Spirits',
                subMenu         : [
                  {
                    action          : () => store.dispatch( $.query.toggleStatus( `filters.group.Spirits - Glass` ) ),
                    icon            : 'map-pin',
                    isAuthenticated : true,
                    key             : 'Spirits - Glass',
                    label           : 'Spirits - Glass',
                  },
                  {
                    action          : () => store.dispatch( $.query.toggleStatus( `filters.group.Spirits - RTD & Cider` ) ),
                    icon            : 'map-pin',
                    isAuthenticated : true,
                    key             : 'Spirits - RTD & Cider',
                    label           : 'Spirits - RTD & Cider',
                  },
                ],
              },
              {
                action: () =>
                  store.dispatch( $.query.toggleStatus( [
                    `filters.group.Non-Liquor - Cigarettes`,
                    `filters.group.Non-Liquor - Snackfoods`,
                    'filters.group.Non-Liquor - Soft Drinks',
                  ] ) ),
                icon: [
                  'fab',
                  'gulp',
                ],
                isAuthenticated : true,
                key             : 'Non-Liquor',
                label           : 'Non-Liquor',
                subMenu         : [
                  {
                    action          : () => store.dispatch( $.query.toggleStatus( `filters.group.Non-Liquor - Cigarettes` ) ),
                    icon            : 'map-pin',
                    isAuthenticated : true,
                    key             : 'Non-Liquor - Cigarettes',
                    label           : 'Non-Liquor - Cigarettes',
                  },
                  {
                    action          : () => store.dispatch( $.query.toggleStatus( `filters.group.Non-Liquor - Snackfoods` ) ),
                    icon            : 'map-pin',
                    isAuthenticated : true,
                    key             : 'Non-Liquor - Snackfoods',
                    label           : 'Non-Liquor - Snackfoods',
                  },
                  {
                    action          : () => store.dispatch( $.query.toggleStatus( `filters.group.Non-Liquor - Soft Drinks` ) ),
                    icon            : 'map-pin',
                    isAuthenticated : true,
                    key             : 'Non-Liquor - Soft Drinks',
                    label           : 'Non-Liquor - Soft Drinks',
                  },
                ],
              },
              {
                action          : () => store.dispatch( $.query.toggleStatus( `filters.group.Beer` ) ),
                icon            : 'beer',
                isAuthenticated : true,
                key             : 'Beer',
                label           : 'Beer',
              },
            ],
          },
        ],
      },
      {
        icon            : 'sort',
        isAuthenticated : true,
        key             : 'sort',
        label           : 'Sort',
        subMenu         : [
          {
            action          : () => store.dispatch( $.query.toggleStatus( 'sort.isDescending' ) ),
            icon            : 'sort-amount-down',
            isAuthenticated : true,
            key             : 'isDescending',
            label           : 'Descending',
          },
          {
            action          : () => store.dispatch( $.query.toggleStatus( 'sort.group' ) ),
            icon            : 'boxes',
            isAuthenticated : true,
            key             : 'group',
            label           : 'Category',
          },
          {
            action          : () => store.dispatch( $.query.toggleStatus( 'sort.description' ) ),
            icon            : 'edit',
            isAuthenticated : true,
            key             : 'description',
            label           : 'Description',
          },
          {
            action          : () => store.dispatch( $.query.toggleStatus( 'sort.price' ) ),
            icon            : 'hand-holding-usd',
            isAuthenticated : true,
            key             : 'price',
            label           : 'Price',
          },
          {
            action          : () => store.dispatch( $.query.toggleStatus( 'sort.performance' ) ),
            icon            : 'hand-holding-usd',
            isAuthenticated : true,
            key             : 'performance',
            label           : 'Average Store Sales',
          },
        ],
      },
      {
        icon            : 'cogs',
        isAuthenticated : true,
        key             : 'settings',
        label           : 'Settings',
        subMenu         : [
          {
            action          : () => store.dispatch( $.query.toggleStatus( 'isExact' ) ),
            icon            : 'search-plus',
            isAuthenticated : true,
            key             : 'isExact',
            label           : 'Search Complete Words',
          },
          {
            action          : () => store.dispatch( $.query.toggleStatus( 'infiniteScroll' ) ),
            icon            : 'spinner',
            isAuthenticated : true,
            key             : 'infiniteScroll',
            label           : 'Infinite Scroll',
          },
        ],
      },
    ],
    component    : TopBar,
    path         : '/myRange',
    selectedKeys : state => ( {
      ...state.query.params,
      infiniteScroll: state.query.infiniteScroll,
    } ),
  },
  {
    actionMenuItems : [],
    component       : TopBar,
    path            : '*',
  },
];

export default actionMenu;
