import 'react-virtualized/styles.css';

import { AutoSizer, List, } from 'react-virtualized';
import React, { PureComponent, } from 'react';

import { MidBounceBall, } from './Loaders';

export default class InfiniteGrid extends PureComponent {
  rowRenderer = ( { index, key, style, isVisible, isScrolling, } ) => {
    const { component: Component, array, columnCount, } = this.props;
    const startIndex = index * columnCount;

    return (
      <div key={ key } style={ style }>
        {array
          .slice( startIndex, startIndex + columnCount )
          .map( item => <Component fetch={ !isScrolling && isVisible } item={ item } key={ item } /> )}
      </div>
    );
  };

  render () {
    const { loading, message, columnCount, rowHeight, paramaters, loadMoreRows, array, } = this.props;

    return (
      <AutoSizer>
        {( { height, width, } ) => (
          <List
            containerStyle={ {
              margin  : 'auto',
              outline : 'none',
            } }
            height={ height }
            noRowsRenderer={ () => <MidBounceBall bounce={ loading } message={ message } /> }
            onRowsRendered={ loadMoreRows }
            paramaters={ paramaters }
            rowCount={ Math.ceil( array.length / columnCount ) }
            rowHeight={ rowHeight }
            rowRenderer={ this.rowRenderer }
            style={ { outline: 'none', } }
            width={ width }
          />
        )}
      </AutoSizer>
    );
  }
}
