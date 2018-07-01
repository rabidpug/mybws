import { BounceBall, LoadBar, } from 'Common/components/Loaders';
import React, { PureComponent, } from 'react';

import ArticleActions from './components/ArticleActions';
import MiniCard from 'Common/components/MiniCard';
import PlanogramDetails from './components/PlanogramDetails';
import SlideWrap from 'Common/styles/SlideWrap';
import connectMyRangeStoreArticle from './Article.connect';
import { getPath, } from 'utilibelt';
import noProductImage from 'Assets/noProductImage.png';
import { toast, } from 'react-toastify';
import { userIsAuthenticated, } from 'Common/helpers/authWrapper';
import { withRouter, } from 'react-router-dom';

@SlideWrap
@userIsAuthenticated
@withRouter
@connectMyRangeStoreArticle
export default class MyRangeStoreArticle extends PureComponent {
  constructor ( props ) {
    super( props );

    this.state = {
      gettingBig : false,
      swipe      : 0,
    };
  }

  componentDidMount () {
    const { item, store: { _id: store, } = {}, article: current = {}, match, fetchArticle, storeID, } = this.props;
    const article = +( item || match.params._id );

    if ( current._id !== article && !isNaN( article ) ) {
      const timer = setTimeout( () => {
        fetchArticle( {
          article,
          store: store || storeID,
        } );
      }, 600 );

      this.setState( { timer, } );
    }

    current._id && current._id === +getPath( match, 'params._id' ) && this.setTitle();
  }

  componentDidUpdate ( prevProps ) {
    const {
      gettingItem,
      article = {},
      history: { push, },
      location,
      match: { params = {}, },
    } = this.props;

    if ( prevProps.gettingItem && !gettingItem && !article._id && params._id ) {
      toast.error( 'The provided article number does not exist' );

      push( location.pathname.replace( `/${params._id}`, '' ) );
    }
    if (
      article._id &&
      ( getPath( prevProps, 'article._id' ) !== article._id || getPath( prevProps, 'match.params._id' ) !== params._id ) &&
      article._id === +params._id
    ) this.setTitle();
  }

  componentWillUnmount () {
    const { timer, } = this.state;

    if ( timer ) clearTimeout( timer );
  }

  setTitle () {
    const { article, } = this.props;

    document.title = `myBWS ${article._id} - ${article.description} Range Details`;
  }

  render () {
    const {
      activeRole,
      article = {},
      orgdist,
      store,
      bodyHeight,
      match = {},
      planograms,
      history = {},
      isBig,
      swipe,
      unmountMe,
      style,
      item,
    } = this.props;
    const isLoading = +( item || match.params._id ) !== +article._id;
    const altUrl = `https://edgmedia.bws.com.au/bws/media/products/${article._id}-1.png?impolicy=Prod_`;
    const imgUrl = `https://media.danmurphys.com.au/dmo/product/${article._id}-1.png?impolicy=PROD_`;

    return isLoading ? (
      <MiniCard isBig={ isBig } loading top>
        <MiniCard.Header />
        <MiniCard.Body>
          <LoadBar />
        </MiniCard.Body>
      </MiniCard>
    ) : (
      <MiniCard
        isBig={ isBig }
        loading={ isLoading }
        screenOffset={ bodyHeight }
        style={
          isBig && swipe
            ? {
              ...style,
              transform  : `translateY(-${swipe}px)`,
              transition : swipe === bodyHeight ? 'transform 0.3s' : 'none',
            }
            : style
        }
        top>
        <MiniCard.Header
          alt={ `${altUrl}Retina_SM` }
          avatar={ isLoading ? null : `${imgUrl}RETINA_SM` }
          data-for='global'
          description={
            !isLoading &&
            `${article._id}
          ${article.group}`
          }
          noimg={ noProductImage }
          onClick={ () => !isLoading && !isBig && history.push( `${match.url}/${article._id}` ) }
          onCloseClick={
            isBig
              ? () => {
                unmountMe( () => history.push( match.url.replace( `/${match.params._id}`, '' ) ) );
              }
              : null
          }
          placeholder={ isLoading ? null : `${imgUrl}XS` }
          ribbon={ !isLoading && ( article.status || 'Loading...' ) }
          ribbonColor={
            [
              'Pog Range',
              'Promo/Season',
              'Customer 1st',
            ].includes( article.status )
              ? '#eda12a'
              : article.status === 'Available'
                ? '#29dc3f'
                : '#f34859'
          }
          stamp={
            !isLoading &&
            `$${getPath( article,
                         `${orgdist}.price.mpk`,
                         getPath( article, `${orgdist}.price.ea`, getPath( article, `${orgdist}.price.car`, ' - ' ) ) )}`
          }
          title={ article.description || '' }>
          {isBig &&
            ( planograms
              ? <PlanogramDetails
                article={ article } orgdist={ orgdist } planograms={ planograms }
                store={ store } />
              : (
                <div
                  style={ {
                    bottom   : '15%',
                    left     : '15%',
                    position : 'absolute',
                  } }>
                  <BounceBall />
                  <span style={ { marginLeft: 16, } }>Loading additional info...</span>
                </div>
              ) )}
        </MiniCard.Header>
        <MiniCard.Body
          isBig={ isBig }
          message={ !isLoading && ArticleActions }
          messageProps={ {
            activeRole,
            isBig,
            item    : article,
            onClick : d => d,
          } }>
          <LoadBar />
        </MiniCard.Body>
      </MiniCard>
    );
  }
}
