import * as initialState from './initialState';
import * as methods from './methods';
import * as selectors from './selectors';
import * as thunks from './thunks';

import { applyMiddleware, combineReducers, compose, createStore, } from 'redux';
import { connectRouter, routerMiddleware, } from 'connected-react-router';
import { createPassthroughReducers, methodsEnhancer, } from 'redux-methods';
import { createResponsiveStateReducer, responsiveStoreEnhancer, } from 'redux-responsive';
import persistState, { mergePersistedState, } from 'redux-localstorage';

import adapter from 'redux-localstorage/lib/adapters/localStorage';
import { composeWithDevTools, } from 'redux-devtools-extension/developmentOnly';
import createHistory from 'history/createBrowserHistory';
import filter from 'redux-localstorage-filter';
import thunk from 'redux-thunk';

export const history = createHistory();
const middleware = [
  routerMiddleware( history ),
  thunk,
];

const reducer = connectRouter( history )( compose( mergePersistedState() )( combineReducers( {
  ...createPassthroughReducers( initialState ),
  browser: createResponsiveStateReducer( null, {
    extraFields: () => ( {
      bodyHeight : window.innerHeight - 64,
      bodyWidth  : window.innerWidth - 64,
    } ),
  } ),
} ) ) );

const storage = compose( filter( 'query' ) )( adapter( window.localStorage ) );

export const store = createStore( reducer,
                                  initialState,
                                  composeWithDevTools(
                                    persistState( storage, 'myBWSsavestate' ),
                                    methodsEnhancer( methods, thunks, selectors ),
                                    responsiveStoreEnhancer,
                                    applyMiddleware( ...middleware )
                                  ) );
