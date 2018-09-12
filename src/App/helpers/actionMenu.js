import TopBar from '../containers/TopBar';
import client from '../../graphql';
import gql from 'graphql-tag';

const toggleStatus = keys => {
  client().mutate( {
    mutation: gql`
      mutation($keys: [String]) {
        updateOpenKeysSet(keys: $keys) @client
      }
    `,
    variables: { keys, },
  } );
};

const actionMenu = [
  {
    actionMenuItems: [
      {
        action: () =>
          client().mutate( {
            mutation: gql`
              mutation {
                logout @client
              }
            `,
          } ),
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
              toggleStatus( [
                'statusFilters.Pog Range',
                'statusFilters.Open Request',
                'statusFilters.Available',
                'statusFilters.Not Available',
                'statusFilters.Customer 1st',
                'statusFilters.Promo/Season',
              ] ),
            icon            : 'star',
            isAuthenticated : true,
            key             : 'status',
            label           : 'Status',
            subMenu         : [
              {
                action          : () => toggleStatus( [ 'statusFilters.Pog Range', ] ),
                icon            : 'tasks',
                isAuthenticated : true,
                key             : 'Pog Range',
                label           : 'My Planogram Range',
              },
              {
                action          : () => toggleStatus( [ 'statusFilters.Promo/Season', ] ),
                icon            : 'chart-line',
                isAuthenticated : true,
                key             : 'Promo/Season',
                label           : 'My Promo/Season Range',
              },
              {
                action          : () => toggleStatus( [ 'statusFilters.Customer 1st', ] ),
                icon            : 'cart-plus',
                isAuthenticated : true,
                key             : 'Customer 1st',
                label           : 'My Customer 1st Range',
              },
              {
                action          : () => toggleStatus( [ 'statusFilters.Open Request', ] ),
                icon            : 'clock',
                isAuthenticated : true,
                key             : 'Open Request',
                label           : 'My Open Requests',
              },
              {
                action          : () => toggleStatus( [ 'statusFilters.Available', ] ),
                icon            : 'check-circle',
                isAuthenticated : true,
                key             : 'Available',
                label           : 'My Available Products',
              },
              {
                action          : () => toggleStatus( [ 'statusFilters.Not Available', ] ),
                icon            : 'times-circle',
                isAuthenticated : true,
                key             : 'Not Available',
                label           : 'Not Available Products',
              },
            ],
          },
          {
            action: () =>
              toggleStatus( [
                `groupFilters.Wine - Red`,
                `groupFilters.Wine - White`,
                `groupFilters.Wine - Sparkling`,
                `groupFilters.Wine - Imported`,
                `groupFilters.Wine - Cask & Fortified`,
                `groupFilters.Spirits - Glass`,
                `groupFilters.Spirits - RTD & Cider`,
                `groupFilters.Non-Liquor - Cigarettes`,
                `groupFilters.Non-Liquor - Snackfoods`,
                'groupFilters.Non-Liquor - Soft Drinks',
                'groupFilters.Beer',
              ] ),
            icon            : 'boxes',
            isAuthenticated : true,
            key             : 'category',
            label           : 'Category',
            subMenu         : [
              {
                action: () =>
                  toggleStatus( [
                    `groupFilters.Wine - Red`,
                    `groupFilters.Wine - White`,
                    `groupFilters.Wine - Sparkling`,
                    `groupFilters.Wine - Imported`,
                    `groupFilters.Wine - Cask & Fortified`,
                  ] ),
                icon            : 'wine-glass',
                isAuthenticated : true,
                key             : 'Wine',
                label           : 'Wine',
                subMenu         : [
                  {
                    action          : () => toggleStatus( [ `groupFilters.Wine - Red`, ] ),
                    icon            : 'map-pin',
                    isAuthenticated : true,
                    key             : 'Wine - Red',
                    label           : 'Wine - Red',
                  },
                  {
                    action          : () => toggleStatus( [ `groupFilters.Wine - White`, ] ),
                    icon            : 'map-pin',
                    isAuthenticated : true,
                    key             : 'Wine - White',
                    label           : 'Wine - White',
                  },
                  {
                    action          : () => toggleStatus( [ `groupFilters.Wine - Sparkling`, ] ),
                    icon            : 'map-pin',
                    isAuthenticated : true,
                    key             : 'Wine - Sparkling',
                    label           : 'Wine - Sparkling',
                  },
                  {
                    action          : () => toggleStatus( [ `groupFilters.Wine - Imported`, ] ),
                    icon            : 'map-pin',
                    isAuthenticated : true,
                    key             : 'Wine - Imported',
                    label           : 'Wine - Imported',
                  },
                  {
                    action          : () => toggleStatus( [ `groupFilters.Wine - Cask & Fortified`, ] ),
                    icon            : 'map-pin',
                    isAuthenticated : true,
                    key             : 'Wine - Cask & Fortified',
                    label           : 'Wine - Cask & Fortified',
                  },
                ],
              },
              {
                action: () => toggleStatus( [
                  `groupFilters.Spirits - Glass`,
                  `groupFilters.Spirits - RTD & Cider`,
                ] ),
                icon            : 'glass-martini',
                isAuthenticated : true,
                key             : 'Spirits',
                label           : 'Spirits',
                subMenu         : [
                  {
                    action          : () => toggleStatus( [ `groupFilters.Spirits - Glass`, ] ),
                    icon            : 'map-pin',
                    isAuthenticated : true,
                    key             : 'Spirits - Glass',
                    label           : 'Spirits - Glass',
                  },
                  {
                    action          : () => toggleStatus( [ `groupFilters.Spirits - RTD & Cider`, ] ),
                    icon            : 'map-pin',
                    isAuthenticated : true,
                    key             : 'Spirits - RTD & Cider',
                    label           : 'Spirits - RTD & Cider',
                  },
                ],
              },
              {
                action: () =>
                  toggleStatus( [
                    `groupFilters.Non-Liquor - Cigarettes`,
                    `groupFilters.Non-Liquor - Snackfoods`,
                    'groupFilters.Non-Liquor - Soft Drinks',
                  ] ),
                icon: [
                  'fab',
                  'gulp',
                ],
                isAuthenticated : true,
                key             : 'Non-Liquor',
                label           : 'Non-Liquor',
                subMenu         : [
                  {
                    action          : () => toggleStatus( [ `groupFilters.Non-Liquor - Cigarettes`, ] ),
                    icon            : 'map-pin',
                    isAuthenticated : true,
                    key             : 'Non-Liquor - Cigarettes',
                    label           : 'Non-Liquor - Cigarettes',
                  },
                  {
                    action          : () => toggleStatus( [ `groupFilters.Non-Liquor - Snackfoods`, ] ),
                    icon            : 'map-pin',
                    isAuthenticated : true,
                    key             : 'Non-Liquor - Snackfoods',
                    label           : 'Non-Liquor - Snackfoods',
                  },
                  {
                    action          : () => toggleStatus( [ `groupFilters.Non-Liquor - Soft Drinks`, ] ),
                    icon            : 'map-pin',
                    isAuthenticated : true,
                    key             : 'Non-Liquor - Soft Drinks',
                    label           : 'Non-Liquor - Soft Drinks',
                  },
                ],
              },
              {
                action          : () => toggleStatus( [ `groupFilters.Beer`, ] ),
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
            action          : () => toggleStatus( [ 'descendingSort', ] ),
            icon            : 'sort-amount-down',
            isAuthenticated : true,
            key             : 'descendingSort',
            label           : 'Descending',
          },
          {
            action          : () => toggleStatus( [ 'sort.group', ] ),
            icon            : 'boxes',
            isAuthenticated : true,
            key             : 'group',
            label           : 'Category',
          },
          {
            action          : () => toggleStatus( [ 'sort.description', ] ),
            icon            : 'edit',
            isAuthenticated : true,
            key             : 'description',
            label           : 'Description',
          },
          {
            action          : () => toggleStatus( [ 'sort.price', ] ),
            icon            : 'hand-holding-usd',
            isAuthenticated : true,
            key             : 'price',
            label           : 'Price',
          },
          {
            action          : () => toggleStatus( [ 'sort.performance', ] ),
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
            action          : () => toggleStatus( [ 'exactSearch', ] ),
            icon            : 'search-plus',
            isAuthenticated : true,
            key             : 'exactSearch',
            label           : 'Search Complete Words',
          },
          {
            action          : () => toggleStatus( [ 'infiniteScroll', ] ),
            icon            : 'spinner',
            isAuthenticated : true,
            key             : 'infiniteScroll',
            label           : 'Infinite Scroll',
          },
        ],
      },
    ],
    component : TopBar,
    path      : '/myRange',
  },
  {
    actionMenuItems : [],
    component       : TopBar,
    path            : '*',
  },
];

export default actionMenu;
