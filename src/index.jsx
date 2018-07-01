import 'react-hot-loader';

import { history, store, } from 'Store';

import $ from 'redux-methods';
import App from './App';
import { ConnectedRouter, } from 'react-router-redux';
import NODE_ENV from './env';
import { Provider, } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Themer from 'Common/containers/Themer';
import { injectGlobal, } from 'styled-components';
import registerServiceWorker from './registerServiceWorker';

NODE_ENV !== 'production' &&
  module.hot &&
  module.hot.accept( './store', () => store.replaceReducer( require( './store' ).store ) );

ReactDOM.render( <Provider store={ store }>
  <Themer>
    <ConnectedRouter history={ history }>
      <App />
    </ConnectedRouter>
  </Themer>
</Provider>,
                 document.getElementById( 'root' ) );

injectGlobal`
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width: 100%;
  font-family: 'Lora', serif;
  font-weight: 400;
  font-size: 16px;
}
h1,h2,h3,h4,h5 {
  font-family: 'Open Sans', sans-serif;
  font-weight: 700;
}
ul, menu, dir {
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    -webkit-padding-start: 0;
}
`;

window.addEventListener( 'online', () => store.dispatch( $.ui.isOnline.set( true ) ) );

window.addEventListener( 'offline', () => store.dispatch( $.ui.isOnline.set( false ) ) );

registerServiceWorker();
