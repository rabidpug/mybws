import { BounceBall, LoadBar, } from 'Common/components/Loaders';
import React, { PureComponent, } from 'react';

import ArticleActions from './components/ArticleActions';
import MiniCard from 'Common/components/MiniCard';
import PlanogramDetails from './components/PlanogramDetails';
import SlideWrap from 'Common/styles/SlideWrap';
import { getPath, } from 'utilibelt';
import getStatus from './getStatus';
import gqlMyRangeStoreArticle from './Article.gql';
import noProductImage from 'Assets/noProductImage.webp';
import { toast, } from 'react-toastify';
import { withRouter, } from 'react-router-dom';

@SlideWrap
@withRouter
@gqlMyRangeStoreArticle
export default class MyRangeStoreArticle extends PureComponent {
  constructor ( props ) {
    super( props );

    this.state = {
      gettingBig : false,
      swipe      : 0,
    };
  }

  componentDidMount () {
    const { item, } = this.props;

    !item && this.setTitle();
  }

  componentDidUpdate ( prevProps ) {
    const {
      article: { error, } = {},
      history: { push, },
      location,
      match: { params = {}, },
    } = this.props;

    const { article: { error: pastError, } = {}, } = prevProps;

    if ( error !== pastError && error && params._id ) {
      toast.error( 'The provided article number does not exist' );

      push( location.pathname.replace( `/${params._id}`, '' ) );
    }
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
      article: {
        getArticle: article = {},
        getUser: { role, } = {},
        getStore: store = {},
        getPlanograms: planograms = [],
        loading = !article.id,
      } = {},
      match = {},
      history = {},
      swipe,
      unmountMe,
      style,
    } = this.props;
    const { organisation, district, } = store;
    const orgdist = `${organisation}.${district}`;
    const { status, supply, isBlocked, } = getStatus( article, planograms, store );

    if ( isBlocked ) article.blocked = isBlocked;
    const isBig = !!match.params._id;
    const altUrl = `https://edgmedia.bws.com.au/bws/media/products/${article.id}-1.png?impolicy=Prod_`;
    const imgUrl = `https://media.danmurphys.com.au/dmo/product/${article.id}-1.png?impolicy=PROD_`;

    return (
      <MiniCard
        isBig={ isBig }
        loading={ loading }
        style={
          isBig && swipe
            ? {
              ...style,
              transform: `translateY(-${swipe}px)`,
            }
            : style
        }
        top>
        <MiniCard.Header
          alt={ `${altUrl}Retina_SM` }
          avatar={ loading ? null : `${imgUrl}RETINA_SM` }
          data-for='global'
          description={
            !loading &&
            `${article.id}
          ${article.group}`
          }
          noimg={ noProductImage }
          onClick={ () => !loading && !isBig && history.push( `${match.url}/${article.id}` ) }
          onCloseClick={
            isBig
              ? () => {
                unmountMe( () => history.push( match.url.replace( `/${match.params._id}`, '' ) ) );
              }
              : null
          }
          placeholder={ loading ? null : `${imgUrl}XS` }
          ribbon={ !loading && ( status || 'Loading...' ) }
          ribbonColor={
            [
              'Pog Range',
              'Promo/Season',
              'Customer 1st',
            ].includes( status )
              ? '#eda12a'
              : status === 'Available'
                ? '#29dc3f'
                : '#f34859'
          }
          stamp={
            !loading &&
            `$${getPath( article,
                         `${orgdist}.price.mpk`,
                         getPath( article, `${orgdist}.price.ea`, getPath( article, `${orgdist}.price.car`, ' - ' ) ) )}`
          }
          title={ article.description || '' }>
          {isBig &&
            ( planograms && article.description
              ? <PlanogramDetails
                article={ article } orgdist={ orgdist } planograms={ planograms }
                supply={ supply } />
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
          message={ !loading && ArticleActions }
          messageProps={ {
            isBig,
            item    : article,
            onClick : d => d,
            role,
            status,
          } }>
          <LoadBar />
        </MiniCard.Body>
      </MiniCard>
    );
  }
}
