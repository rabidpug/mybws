import React, { Component, } from 'react';

const graphqlSubscriber = ( doc, config ) => WrappedComponent =>
  class extends Component {
    componentDidMount () {
      const { props, } = this;
      const data = props[config.queryName || 'data'];

      if ( !data.loading && !this.subscription ) this.subscribe();
    }

    componentDidUpdate () {
      const { props, } = this;
      const data = props[config.queryName || 'data'];

      if ( !data.loading && !this.subscription ) this.subscribe();
    }

    subscribe () {
      const { props, } = this;
      const data = props[config.queryName || 'data'];

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
