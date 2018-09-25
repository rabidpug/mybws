import React, { PureComponent, } from 'react';

import ArticleActions from './components/ArticleActions';
import { LoadBar, } from 'Common/components/Loaders';
import MiniCard from 'Common/components/MiniCard';
import PlanogramDetails from './components/PlanogramDetails';
import SlideWrap from 'Common/styles/SlideWrap';
import { getPath, } from 'utilibelt';
import getStatus from './getStatus';
import gqlMyRangeStoreArticle from './Article.gql';
import noProductImage from 'Assets/noProductImage.webp';
import { withRouter, } from 'react-router-dom';

@SlideWrap
@withRouter
@gqlMyRangeStoreArticle
class MyRangeStoreArticle extends PureComponent {
  componentDidMount () {
    const { item, } = this.props;

    !item && this.setTitle();
  }

  componentDidUpdate () {
    const {
      error,
      history: { push, },
      location,
      match: { params, },
    } = this.props;

    if ( params._id && error ) push( location.pathname.replace( `/${params._id}`, '' ) );
  }

  setTitle () {
    const { article = {}, store = {}, } = this.props;

    if ( article.id && store.id ) document.title = `myRange | ${store.id} - ${store.name} | ${article.id} - ${article.description}`;
  }

  handleOpenBig = () => {
    const { history, loading, article, match, } = this.props;
    const isBig = !!match.params._id;

    if ( !loading && !isBig ) history.push( `${match.url}/${article.id}` );
  };

  handleCloseBig = () => {
    const { unmountMe, history, match, } = this.props;

    unmountMe( () => history.push( match.url.replace( `/${match.params._id}`, '' ) ) );
  };

  render () {
    const { article, user, store, planograms, loading, match, style, } = this.props;
    const isBig = !!match.params._id;

    if ( loading ) {
      return (
        <MiniCard
          isBig={ isBig } loading={ loading } style={ style }
          top>
          <MiniCard.Header description='' ribbon='Loading...' title='' />
          <MiniCard.Body isBig={ isBig }>
            <LoadBar />
          </MiniCard.Body>
        </MiniCard>
      );
    }
    const { role, } = user;
    const { organisation, district, } = store;
    const orgdist = `${organisation}.${district}`;
    const { status, supply, isBlocked, } = getStatus( article, planograms, store );

    if ( isBlocked ) article.blocked = isBlocked;
    const imgUrl = `https://media.danmurphys.com.au/dmo/product/${article.id}-1.png?impolicy=PROD_SM`;
    const ribbonColor = [
      'Pog Range',
      'Promo/Season',
      'Customer 1st',
    ].includes( status )
      ? '#eda12a'
      : status === 'Available'
        ? '#29dc3f'
        : '#f34859';

    return (
      <MiniCard isBig={ isBig } style={ style } top>
        <MiniCard.Header
          avatar={ imgUrl }
          data-for='global'
          description={ `${article.id || ''}\n${article.group || ''}` }
          noimg={ noProductImage }
          onClick={ this.handleOpenBig }
          onCloseClick={ isBig && this.handleCloseBig }
          placeholder={ `${imgUrl}XS` }
          ribbon={ status }
          ribbonColor={ ribbonColor }
          stamp={ `$${getPath( article,
                               `${orgdist}.price.mpk`,
                               getPath( article, `${orgdist}.price.ea`, getPath( article, `${orgdist}.price.car`, ' - ' ) ) )}` }
          title={ article.description || '' }>
          {isBig && <PlanogramDetails
            article={ article } orgdist={ orgdist } planograms={ planograms }
            supply={ supply } />}
        </MiniCard.Header>
        <MiniCard.Body
          isBig={ isBig }
          message={ ArticleActions }
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
export default MyRangeStoreArticle;
