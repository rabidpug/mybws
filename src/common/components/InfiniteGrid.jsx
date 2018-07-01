import 'react-virtualized/styles.css';

import { AutoSizer, List, } from 'react-virtualized';
import React, { PureComponent, } from 'react';

import { MidBounceBall, } from './Loaders';

export default class InfiniteGrid extends PureComponent {
  rowRenderer = ( { index, key, style, isVisible, isScrolling, } ) => {
    const { Component, array, columnCount, maxPage, rowCount, } = this.props;
    const arr = [];
    const startIndex = index * columnCount;

    for ( let i = startIndex; i < Math.min( maxPage, startIndex * columnCount ); i++ ) arr.push( array[i] || `*^%${i}` );
    return (
      <div key={ key } style={ style }>
        {array
          .slice( startIndex, Math.min( maxPage, startIndex + columnCount * rowCount ) )
          .map( ( item, i ) =>
            <Component fetch={ !isScrolling && isVisible } item={ item || `*^%${i}` } key={ item || `*^%${i}` } /> )}
      </div>
    );
  };

  render () {
    const { loading, message, rowCount, rowHeight, paramaters, loadMoreRows, } = this.props;

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
            rowCount={ rowCount }
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
