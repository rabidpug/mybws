import React, { Component, } from 'react';

const graphqlSubscriber = ( doc, config ) => WrappedComponent =>
  class extends Component {
    componentDidMount () {
      const data = this.props[config.queryName || 'data'] //eslint-disable-line

      if ( !data.loading && !this.subscription ) this.subscribe();
    }

    componentDidUpdate () {
      const data = this.props[config.queryName || 'data'] //eslint-disable-line

      if ( !data.loading && !this.subscription ) this.subscribe();
    }

    subscribe () {
      const data = this.props[config.queryName || 'data'] //eslint-disable-line

      const { subscribeToMore, } = data;

      this.subscription = subscribeToMore( {
        document    : doc,
        onError     : () => null,
        updateQuery : ( previousResult, { subscriptionData, } ) => ( { [config.propName]: subscriptionData.data[config.modelName], } ),
        variables   : config.variables && config.variables( this.props ),
      } );
    }

    render () {
      return <WrappedComponent sub={ this.subscription } { ...this.props } />;
    }
  };

export default graphqlSubscriber;
