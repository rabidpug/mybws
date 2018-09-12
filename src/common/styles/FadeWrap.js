import React, { Component, } from 'react';

import { Animate, } from 'react-move';
import { easeExpInOut, } from 'd3-ease';

const FadeWrap = WrappedContainer =>
  class FadeWrap extends Component {
    constructor ( props ) {
      super( props );

      this.state = { show: false, };
    }

    componentDidMount () {
      this.setState( { show: true, } );
    }

    componentWillUnmount () {
      this.setState( { show: false, } );
    }

    render () {
      const { show, } = this.state;

      return (
        <Animate
          enter={ {
            opacity : [ 1, ],
            timing  : {
              duration : 300,
              ease     : easeExpInOut,
            },
          } }
          leave={ [
            {
              opacity : [ 0, ],
              timing  : {
                duration : 300,
                ease     : easeExpInOut,
              },
            },
          ] }
          show={ show }
          start={ { opacity: 0, } }
          update={ {
            opacity : [ 1, ],
            timing  : {
              duration : 500,
              ease     : easeExpInOut,
            },
          } }>
          {( { opacity, } ) => ( <WrappedContainer
            style={ { opacity, } }
            { ...this.props } /> )}
        </Animate>
      );
    }
  };

export default FadeWrap;
