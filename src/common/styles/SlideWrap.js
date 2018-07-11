import React, { Component, } from 'react'

import { Animate, } from 'react-move'
import { easeExpInOut, } from 'd3-ease'

const SlideWrap = WrappedContainer =>
  class SlideWrap extends Component {
    constructor ( props ) {
      super( props )

      this.state = { show: false, }
    }

    componentDidMount () {
      this.setState( { show: true, } )
    }

    componentDidUpdate ( prevProps ) {
      const { forceUnmount, } = this.props

      if ( !prevProps.forceUnmount && forceUnmount ) {
        this.setState( { show: false, } )

        setTimeout( () => forceUnmount(), 400 )
      }
    }

    componentWillUnmount () {
      this.setState( { show: false, } )
    }

    doUnmount = cb => {
      this.setState( { show: false, } )

      setTimeout( () => cb(), 400 )
    };

    render () {
      const { show, } = this.state
      const { item, } = this.props

      return (
        <Animate
          enter={ {
            scale  : [ 0.97, ],
            timing : {
              duration : 300,
              ease     : easeExpInOut,
            },
            translate: [ 0, ],
          } }
          leave={ [
            {
              scale  : [ 0.97, ],
              timing : {
                duration : 300,
                ease     : easeExpInOut,
              },
              translate: [ -200, ],
            },
          ] }
          show={ show }
          start={ {
            scale     : [ 1, ],
            translate : [ -200, ],
          } }
          update={ { scale: [ 1, ], } }>
          {( { translate, scale, } ) => (
            <WrappedContainer
              style={ {
                transform       : `${item ? 'scale' : 'translateY'}(${item ? scale : translate}${item ? '' : '%'})`,
                transformOrigin : 'center top',
              } }
              { ...this.props }
              unmountMe={ this.doUnmount }
            />
          )}
        </Animate>
      )
    }
  }

export default SlideWrap
