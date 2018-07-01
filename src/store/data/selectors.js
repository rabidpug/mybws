import createSelector from 'selectorator';
import { getPath, } from 'utilibelt';

const selectors = {
  articles   : { getById: id => createSelector( [ `data.articles.${id}`, ] ), },
  itemStatus : ( store, article ) =>
    createSelector( [
      `data.articles.${article}`,
      `data.stores.${store}`,
      'data.planograms',
    ],
                    ( article, store, allpogs ) => {
                      if (  article, store, allpogs  ) {
                        const planograms = Object.keys( allpogs )
                          .filter( key =>
                            getPath(
                              allpogs, `${key}.stores`, [], res => res.includes( +store._id )
                            ) &&
                getPath(
                  allpogs, `${key}.articles.onshow`, false, res => res.some( art => art.article === +article._id )
                ) )
                          .map( key => allpogs[key] );

                        return { planograms, };
                      } else return false;
                    } ),
  planograms: {
    getByStoreArticle: ( store, article ) =>
      createSelector( [ 'data.planograms', ], planograms =>
        Object.keys( planograms )
          .filter( key =>
            getPath(
              planograms, `${key}.stores`, [], res => res.includes( +store )
            ) &&
              getPath(
                planograms, `${key}.articles.onshow`, false, res => res.some( art => art.article === +article )
              ) )
          .map( key => planograms[key] ) ),
  },
  stores: { getById: id => createSelector( [ `data.stores.${id}`, ] ), },
};

export default selectors;
