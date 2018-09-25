import React, { PureComponent, } from 'react';

import Card from 'Common/components/Card';
import { HeaderWrapper, } from './Store.styled';
import { MyRangeStoreArticleLoadable, } from './Article';
import MyRangeStoreArticles from './containers/Articles/Articles.container';
import MyRangeStorePager from './containers/Pager/Pager.container';
import MyRangeStoreSearch from './containers/Search/Search.container';
import { Route, } from 'react-router-dom';
import Swipeable from 'react-swipeable';
import gqlMyRangeStore from './Store.gql';
import { hot, } from 'react-hot-loader';
import storeFromPath from 'Common/helpers/storeFromPath';

@hot( module )
@gqlMyRangeStore
class MyRangeStore extends PureComponent {
  constructor ( props ) {
    super( props );

    this.state = {
      forceUnmount : false,
      swipe        : 0,
    };
  }

  componentDidMount () {
    document.addEventListener( 'mousedown', this.handleClickOutside );

    window.addEventListener( 'resize', this.checkAndSet, false );

    this.checkAndSet();

    this.setTitle();
  }

  componentDidUpdate ( prevProps ) {
    const { forceUnmount, } = this.state;
    const {
      match: { isExact, },
      history: { push, },
      location: { pathname, },
      store: { getStore: store, loading, },
    } = this.props;
    const {
      location: { pathname: oldPath, },
      store: { getStore: prevStore, },
    } = prevProps;
    const pathStore = storeFromPath( pathname );

    const oldStore = storeFromPath( oldPath );

    if ( prevProps.match.isExact !== isExact || pathStore !== oldStore || store !== prevStore ) this.setTitle();
    if ( !loading && !store ) push( location.pathname.replace( `/${pathStore}`, '' ) );
    if ( isExact && forceUnmount ) this.setState( { forceUnmount: false, } );

    this.checkAndSet( prevProps );
  }

  componentWillUnmount () {
    document.removeEventListener( 'mousedown', this.handleClickOutside );

    window.removeEventListener( 'resize', this.checkAndSet, false );
  }

  setTitle () {
    const { store: { getStore: store, }, } = this.props;

    if ( store ) document.title = `myRange | ${store.id} - ${store.name}`;
  }

  onSwiped = (
    e, deltaX, deltaY, isFlick
  ) => {
    const { swipe, } = this.state;
    const {
      history: { push, },
      match,
    } = this.props;

    if ( swipe > window.innerHeight / 3 || isFlick ) {
      this.setState( { swipe: window.innerHeight, } );

      setTimeout( () => {
        push( match.url );

        this.setState( { swipe: 0, } );
      }, 400 );
    } else this.setState( { swipe: 0, } );
  };

  onSwipingUp = ( e, swipe ) => {
    this.setState( { swipe, } );
  };

  checkAndSet = ( prevProps = {} ) => {
    const {
      changePage,
      data: { browser, },
      data: { ui: { isSidebarCollapsed, }, },
      changeDimensions,
      data: {
        query: {
          page: oldPage = 0,
          dimensions: { pageSize: oldPageSize, },
        },
      },
      range: { getRange: articles = [], } = {},
    } = this.props;
    const {
      range: { getRange = [], } = {},
      data: {
        browser: prevBrowser,
        ui: { isSidebarCollapsed: prevIsCollapsed, } = {},
        query: { dimensions: { pageSize: prevPageSize, } = {}, } = {},
      } = {},
    } = prevProps;
    const collapsed = browser > 1200 ? false : isSidebarCollapsed;
    const prevCollapsed = prevBrowser > 1200 ? false : prevIsCollapsed;

    if (
      this.bodyRef &&
      this.bodyRef.clientHeight &&
      ( collapsed !== prevCollapsed ||
        prevPageSize !== oldPageSize ||
        this.bodyRef.clientHeight < this.bodyRef.scrollHeight )
    ) {
      setTimeout( () => {
        if ( this.bodyRef && this.bodyRef.clientHeight ) {
          const columnSize = Math.floor( this.bodyRef.clientWidth / 182 );
          const rowSize = Math.floor( this.bodyRef.clientHeight / 332 );

          if ( rowSize && columnSize && rowSize * columnSize !== oldPageSize ) {
            let page = 0;
            const pageSize = columnSize * rowSize;

            if ( oldPageSize ) {
              const oldStartIndex = oldPage * oldPageSize;

              page = Math.ceil( Math.min( articles.length, Math.max( 0, oldStartIndex / pageSize ) ) );

              if ( oldPage ) while ( !( oldStartIndex >= pageSize * page && oldStartIndex < pageSize * page + pageSize ) ) oldStartIndex < pageSize * page ? page-- : page++;
            }

            changeDimensions( {
              variables: {
                columnSize,
                pageSize,
                rowSize,
              },
            } );

            changePage( { variables: { page, }, } );
          }
        }
      }, 200 );
    } else if ( articles.length !== getRange.length ) changePage( 0 );
  };

  handleClickOutside = e => {
    const {
      match,
      history: { push, },
    } = this.props;

    if ( !match.isExact && !( this.wrapperRef && this.wrapperRef.contains( e.target ) ) ) this.setState( { forceUnmount: () => push( match.url ), } );
  };

  render () {
    const {
      range: { getRange = [], loading, error: { message, } = '', } = {},
      match,
      data: {
        query: {
          infiniteScroll,
          dimensions: { pageSize, },
        },
      },
    } = this.props;
    const { swipe, forceUnmount, } = this.state;

    const maxPage = Math.ceil( getRange.length / pageSize );

    return (
      <Card fullScreen>
        <Card.Header>
          <HeaderWrapper>myRange</HeaderWrapper>
        </Card.Header>
        <Card.Body>
          <div
            ref={ node => this.bodyRef = node }
            style={ {
              height : '100%',
              margin : 'auto',
              width  : '100%',
            } }>
            <MyRangeStoreArticles articles={ getRange } loading={ loading } message={ message } />
          </div>
        </Card.Body>
        <Card.Footer>
          <MyRangeStoreSearch />
          {maxPage > 0 && !infiniteScroll && <MyRangeStorePager maxPage={ maxPage } />}
        </Card.Footer>
        <Swipeable
          innerRef={ wrapperRef => this.wrapperRef = wrapperRef }
          onSwiped={ this.onSwiped }
          onSwipingUp={ this.onSwipingUp }>
          <Route
            path={ `${match.url}/:_id` }
            render={ () => <MyRangeStoreArticleLoadable forceUnmount={ forceUnmount } swipe={ swipe } /> }
          />
        </Swipeable>
      </Card>
    );
  }
}
export default MyRangeStore;
