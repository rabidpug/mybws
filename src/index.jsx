import 'react-hot-loader'

import React, { PureComponent, } from 'react'
import { ThemeProvider, injectGlobal, } from 'styled-components'

import { ApolloProvider, } from 'react-apollo'
import App from './App'
import { InMemoryCache, } from 'apollo-cache-inmemory'
import LoggingIn from './App/components/LoggingIn'
import { Router, } from 'react-router-dom'
import apollo from './graphql'
import createHistory from 'history/createBrowserHistory'
import localforage from 'localforage'
import { persistCache, } from 'apollo-cache-persist'
import registerServiceWorker from './registerServiceWorker'
import { render, } from 'react-dom'
import styles from 'Common/styles'

const history = createHistory()

class Index extends PureComponent {
  state = {
    client : null,
    loaded : false,
  }

  async componentDidMount () {
    const cache = new InMemoryCache()

    const client = apollo( cache )

    try {
      await persistCache( {
        cache,
        maxSize : false,
        storage : localforage,
      } )
    } catch ( error ) {
      console.error('Error restoring Apollo cache', error) //eslint-disable-line
    }

    this.setState( {
      client,
      loaded: true,
    } )
  }

  render () {
    const { client, loaded, } = this.state

    return loaded ? (
      <ApolloProvider client={ client }>
        <ThemeProvider theme={ styles.themes.main }>
          <Router history={ history }>
            <App loaded={ loaded } />
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    )
      : <LoggingIn />
  }
}

render( <Index />, document.getElementById( 'root' ) )

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
`

registerServiceWorker()
