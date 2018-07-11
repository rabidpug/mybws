import React, { Component, } from 'react'

import mergeDeep from '../common/helpers/mergeDeep'

const graphqlSubscriber = ( doc, config ) => WrappedComponent =>
  class extends Component {
    componentDidUpdate () {
      const data = this.props[config.queryName || 'data'] //eslint-disable-line

      if ( !data.loading && !this.subscription ) this.subscribe()
    }

    subscribe () {
      const data = this.props[config.queryName || 'data'] //eslint-disable-line

      const { subscribeToMore, } = data

      this.subscription = subscribeToMore( {
        document : doc,
        onError  : () => null,
        updateQuery ( previousResult, { subscriptionData, } ) {
          const newResult = { [config.propName]: subscriptionData.data[config.modelName], }

          return mergeDeep( {}, previousResult, newResult )
        },
        variables: config.variables && config.variables( this.props ),
      } )
    }

    render () {
      return <WrappedComponent { ...this.props } />
    }
  }

export default graphqlSubscriber
