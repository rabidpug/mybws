import $ from 'redux-methods';
import { authedAxios, } from 'Common/helpers/axiosHelpers';
const thunks = {
  fetchArticles: ( store, push ) => ( dispatch, getState ) => {
    const {
      query: { params, },
      page,
      pageSize,
    } = getState();

    const setDone = $.inProgress.gettingItems.set( false );

    const hasRequiredParams =
      Object.keys( params.filters.group ).some( filter => params.filters.group[filter] ) &&
        Object.keys( params.filters.status ).some( filter => params.filters.status[filter] ) ||
      params.search;

    if ( hasRequiredParams ) {
      return authedAxios()
        .get( `/v1/range/${store}`, { params, } )
        .then( res => {
          if ( res.data.error ) push( '/' );
          else {
            if ( !getState().data.stores[+store] && store ) {
              dispatch( $.data.stores.addFromId( res.data.store ) );

              dispatch( $.data.fetchPlanogram( +store ) );
            }

            dispatch( $.tutti(
              $.query.items.set( res.data.articles ),
              $.query.message.set( res.data.error || res.data.msg ),
              $.query.page.set( page * pageSize > res.data.articles ? Math.floor( res.data.articles.length / pageSize ) : page ),
              setDone
            ) );
          }
        } )
        .catch( e => {
          dispatch( $.tutti(
            $.query.message.set( e.message ),
            $.query.items.set( [] ),
            $.query.page.set( 0 ),
            $.query.message.reset(),
            setDone
          ) );
        } );
    } else dispatch( $.tutti( $.query.items.set( [] ), $.query.page.set( 0 ), $.query.message.reset() ) );

    return dispatch( setDone );
  },
  toggleStatus: stat => dispatch => {
    if ( stat === 'infiniteScroll' ) return dispatch( $.query.infiniteScroll.toggle() );
    if ( typeof stat === 'string' ) stat = [ stat, ];

    stat.forEach( load => {
      let data = $.query.params;

      const parts = load.includes( '.' ) ? load.split( '.' ) : [ load, ];

      for ( let i = 0; i < parts.length; i++ ) {
        if ( i === parts.length - 1 ) dispatch( data[parts[i]].toggle() );
        else if ( data[parts[i]] ) data = data[parts[i]];
        else {
          data[parts[i]] = {};

          data = data[parts[i]];
        }
      }
    } );
  },
};

export default thunks;
