import $ from 'redux-methods';
import { authedAxios, } from 'Common/helpers/axiosHelpers';

const thunks = {
  fetchArticle: ( { store: storeID, article: id, } ) => ( dispatch, getState ) => {
    dispatch( $.inProgress.gettingItem.add( authedAxios().get( `/v1/range/${storeID}/${id}` ) ) );

    const itemLength = getState().inProgress.gettingItem.length;

    setTimeout( () => {
      const items = getState().inProgress.gettingItem;

      if ( items.length === itemLength ) {
        Promise.all( items )
          .then( results => {
            const newArticles = [];
            const newStores = [];
            const newPlanograms = [];

            results.forEach( ( { data: { article, store, planograms, } = {}, } = {} ) => {
              const { data: { articles, stores, }, } = getState();

              article && !articles[+article] && newArticles.push( article ),
              store && !stores[storeID] && newStores.push( store ),
              planograms && newPlanograms.push( planograms );
            } );

            dispatch( $.tutti(
              newArticles.length && $.data.articles.addFromId( newArticles ),
              newStores.length && $.data.stores.addFromId( newStores ),
              newPlanograms.length && $.data.planograms.addFromId( newPlanograms ),
              $.inProgress.gettingItem.set( [] )
            ) );
          } )
          .catch( e => dispatch( $.tutti( $.query.message.set( e.message ), $.inProgress.gettingItem.set( [] ) ) ) );
      }
    }, 600 );
  },
  fetchPlanogram: store => ( dispatch, getState ) => {
    store &&
      authedAxios()
        .get( `/v1/pog/${store}` )
        .then( res => {
          const thisStore = { [store]: getState().data.stores[store], };

          thisStore[store] = {
            ...thisStore[store],
            hasPlanograms: true,
          };

          dispatch( $.data.stores.add( thisStore ) );

          dispatch( $.data.planograms.addFromId( res.data.planograms ) );
        } )
        .catch( e => e );
  },
};

export default thunks;
