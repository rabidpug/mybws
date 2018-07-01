import React, { PureComponent, } from 'react';

import Button from 'Common/components/Button';
import Card from 'Common/components/Card';
import { InfiniteArticleGrid, } from './containers/InfiniteArticleGrid';
import Input from 'Common/components/Input';
import { MidBounceBall, } from 'Common/components/Loaders';
import { MyRangeStoreArticleLoadable, } from './Article';
import PopIcon from 'Common/components/PopIcon';
import { Route, } from 'react-router-dom';
import SearchHelp from './Article/components/SearchHelp';
import Swipeable from 'react-swipeable';
import { Tooltip, } from 'react-tippy';
import connectMyRangeStore from './Store.connect';
import { getPath, } from 'utilibelt';
import { hot, } from 'react-hot-loader';
import { userIsAuthenticated, } from 'Common/helpers/authWrapper';

@hot( module )
@userIsAuthenticated
@connectMyRangeStore
export default class MyRangeStore extends PureComponent {
  constructor ( props ) {
    super( props );

    this.state = {
      fetchTimer   : false,
      forceUnmount : false,
      swipe        : 0,
    };
  }

  componentDidMount () {
    const {
      history: { push, },
      fetchArticles,
      store = {},
      storeID,
    } = this.props;

    fetchArticles( storeID, push );

    document.addEventListener( 'mousedown', this.handleClickOutside );

    window.addEventListener( 'resize', this.checkAndSet, false );

    this.checkAndSet();

    store._id === +storeID && this.setTitle();
  }

  componentDidUpdate ( prevProps ) {
    const { forceUnmount, fetchTimer: timer, } = this.state;
    const {
      history: { push, },
      match: { isExact, },
      params,
      fetchArticles,
      setGettingArticles,
      store,
      storeID,
    } = this.props;

    if (
      prevProps.match.isExact !== isExact ||
      storeID !== prevProps.storeID ||
      store !== prevProps.store && +storeID === getPath( prevProps, 'store._id' )
    ) this.setTitle();
    if ( JSON.stringify( prevProps.params ) !== JSON.stringify( params ) || prevProps.storeID !== storeID ) {
      if ( timer ) clearTimeout( timer );

      setGettingArticles( true );

      const fetchTimer = setTimeout( () => {
        fetchArticles( storeID, push );

        this.setState( { fetchTimer: false, } );
      }, 600 );

      this.setState( { fetchTimer, } );
    }
    if ( isExact && forceUnmount ) this.setState( { forceUnmount: false, } );

    this.checkAndSet( prevProps );
  }

  componentWillUnmount () {
    document.removeEventListener( 'mousedown', this.handleClickOutside );

    window.removeEventListener( 'resize', this.checkAndSet, false );
  }

  setTitle () {
    const { store, } = this.props;

    document.title = `myBWS ${store._id} - ${store.name} Range`;
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
      isSidebarCollapsed,
      handlePageDimensions,
      page: oldPage = 0,
      pageSize: oldPageSize,
      articles,
    } = this.props;

    if (
      this.bodyRef &&
      this.bodyRef.clientHeight &&
      ( isSidebarCollapsed !== prevProps.isSidebarCollapsed ||
        prevProps.pageSize !== oldPageSize ||
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

            handlePageDimensions( {
              columnSize,
              pageSize,
              rowSize,
            } );

            changePage( page );
          }
        }
      }, 200 );
    }
  };

  handleClickOutside = e => {
    const {
      match,
      history: { push, },
    } = this.props;

    if ( !match.isExact && !( this.wrapperRef && this.wrapperRef.contains( e.target ) ) ) this.setState( { forceUnmount: () => push( match.url ), } );
  };

  articleRenderer = () => {
    const { articles = [], page = 0, pageSize = 8, } = this.props;
    const startIndex = page * pageSize;

    return articles
      .slice( startIndex, startIndex + pageSize )
      .map( ( item, i ) => <MyRangeStoreArticleLoadable fetch item={ item } key={ item || `*^%${i}` } /> );
  };

  handleChangePageNo = value => {
    const { changePage, articles, pageSize, page = 0, } = this.props;
    let newValue;
    const maxPage = Math.ceil( articles.length / pageSize );

    if ( typeof value === 'object' ) newValue = value.target.value === '' ? value.target.value : value.target.value - 1;
    else newValue = value ? page + 1 : page - 1;

    changePage( newValue >= maxPage ? 0 : newValue < 0 ? maxPage - 1 : newValue );
  };

  render () {
    const {
      articles = [],
      handleSearchValue,
      match,
      pageSize,
      page = 0,
      fetching,
      message,
      infiniteScroll,
      params: { search, },
    } = this.props;
    const { swipe, forceUnmount, } = this.state;
    const maxPage = articles.length;

    return (
      <Card fullScreen>
        <Card.Header>
          <span
            style={ {
              display    : 'block',
              fontFamily : 'Open Sans, sans-serif',
              fontSize   : '2rem',
              margin     : '0.2rem',
            } }>
            myRange
          </span>
        </Card.Header>
        <Card.Body>
          <div
            ref={ node => this.bodyRef = node }
            style={ {
              height : '100%',
              margin : 'auto',
              width  : '100%',
            } }>
            {infiniteScroll
              ? <InfiniteArticleGrid />
              :               !fetching && (
                <Swipeable
                  innerRef={ swipeRef => this.swipeRef = swipeRef }
                  onSwipedLeft={ ( e, d, isFlick ) => isFlick && this.handleChangePageNo( true ) }
                  onSwipedRight={ ( e, d, isFlick ) => isFlick && this.handleChangePageNo() }>
                  {this.articleRenderer()}
                </Swipeable>
              )
            }
            {!infiniteScroll &&
              <MidBounceBall bounce={ fetching } message={ fetching ? 'Searching the database...' : message } />
            }
          </div>
        </Card.Body>
        <Card.Footer>
          <div
            style={ {
              float     : 'left',
              margin    : '0.4rem',
              textAlign : 'center',
            } }>
            <Input
              onChange={ e => handleSearchValue( e.target.value ) }
              placeholder='Search'
              style={ { paddingRight: '1rem', } }
              value={ search }
            />
            <Tooltip html={ <SearchHelp /> } size='small' touchhold>
              <span
                style={ {
                  left     : '-0.5rem',
                  position : 'relative',
                } }>
                <PopIcon icon='question' only size='xs' />
              </span>
            </Tooltip>
          </div>
          {maxPage > 0 &&
            !infiniteScroll && (
            <div
              style={ {
                float     : 'right',
                textAlign : 'center',
              } }>
              <Button onClick={ () => this.handleChangePageNo() } style={ { padding: 0, } } variant='tertiary'>
                  Previous
              </Button>
              <div
                style={ {
                  display       : 'inline-block',
                  margin        : 'auto',
                  verticalAlign : 'middle',
                  whiteSpace    : 'pre-line',
                } }>
                {'Page '}
                <Input
                  onChange={ this.handleChangePageNo }
                  placeholder='Page'
                  style={ {
                    textAlign : 'center',
                    width     : ( page + 1 ).toString().length * 20 + 20,
                  } }
                  value={ page === '' ? page : ( page + 1 ).toString() }
                />
                <br />
                {` of ${Math.ceil( maxPage / pageSize )}`}
              </div>
              <Button onClick={ () => this.handleChangePageNo( true ) } style={ { padding: 0, } } variant='tertiary'>
                  Next
              </Button>
            </div>
          )}
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
