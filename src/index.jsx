import 'react-hot-loader';

import React, { PureComponent, } from 'react';

import { ApolloProvider, } from 'react-apollo';
import App from './App';
import { InMemoryCache, } from 'apollo-cache-inmemory';
import LoggingIn from './App/components/LoggingIn';
import { Router, } from 'react-router-dom';
import { ThemeProvider, } from 'styled-components';
import apollo from './graphql';
import history from './history';
import localforage from 'localforage';
import { persistCache, } from 'apollo-cache-persist';
import registerServiceWorker from './registerServiceWorker';
import { render, } from 'react-dom';
import styles from 'Common/styles';

class Index extends PureComponent {
  state = {
    client : null,
    loaded : false,
  };

  async componentDidMount () {
    const cache = new InMemoryCache();

    const client = apollo( cache );

    try {
      await persistCache( {
        cache,
        maxSize : false,
        storage : localforage,
      } );
    } catch ( error ) {}

    this.setState( {
      client,
      loaded: true,
    } );
  }

  render () {
    const { client, loaded, } = this.state;

    return loaded ? (
      <ApolloProvider client={ client }>
        <ThemeProvider theme={ styles.themes.main }>
          <Router history={ history }>
            <App loaded={ loaded } />
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    )
      : <LoggingIn />;
  }
}

render( <Index />, document.getElementById( 'root' ) );

registerServiceWorker();
