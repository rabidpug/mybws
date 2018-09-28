import { compose, } from 'redux';
import gql from 'graphql-tag';
import { graphql, } from 'react-apollo';
import storeFromPath from 'Common/helpers/storeFromPath';

const gqlMyRangeStore = compose(
  graphql( gql`
      query StoreRangeParams {
        ui @client {
          isSidebarCollapsed
        }
        query @client {
          infiniteScroll
          page
          dimensions {
            pageSize
          }
          params {
            search
            exactSearch
            sort
            descendingSort
            statusFilters
            groupFilters
          }
        }
      }
    `,
           { name: 'data', } ),
  graphql( gql`
      query GetStoreRange(
        $store: Int
        $groupFilters: [String]
        $statusFilters: [String]
        $descendingSort: Boolean
        $sort: [String]
        $exactSearch: Boolean
        $search: String
      ) {
        getRange(
          store: $store
          groupFilters: $groupFilters
          statusFilters: $statusFilters
          descendingSort: $descendingSort
          sort: $sort
          exactSearch: $exactSearch
          search: $search
        )
      }
    `,
           {
             name: 'range',
             options ( {
               location: { pathname, },
               data: { query: { params = {}, }, },
             } ) {
               const pathStore = storeFromPath( pathname );

               return {
                 fetchPolicy : 'network-only',
                 variables   : {
                   ...params,
                   store: parseInt( pathStore ),
                 },
               };
             },
             skip ( { location: { pathname, }, } ) {
               const pathStore = storeFromPath( pathname );

               return !( pathStore.length === 4 && +pathStore );
             },
           } ),
  graphql( gql`
      query GetStoreDetails($id: Int) {
        getStore(id: $id) {
          id
          organisation
          name
        }
      }
    `,
           {
             name: 'store',
             options ( { location: { pathname, }, } ) {
               const [
                 , pathStore = '',
               ] = pathname.match( /(?:\/)([0-9]{4})(?:\/|$)/ ) || [];

               return { variables: { id: +pathStore, }, };
             },
             skip ( { location: { pathname, }, } ) {
               const [
                 , pathStore = '',
               ] = pathname.match( /(?:\/)([0-9]{4})(?:\/|$)/ ) || [];

               return !( pathStore.length === 4 && +pathStore );
             },
           } ),
  graphql( gql`
      mutation RangeChangePage($page: Int) {
        changePage(page: $page) @client
      }
    `,
           { name: 'changePage', } ),
  graphql( gql`
      mutation RangeChangeDimensions($columnSize: Float, $pageSize: Float, $rowSize: Float) {
        changeDimensions(columnSize: $columnSize, pageSize: $pageSize, rowSize: $rowSize) @client
      }
    `,
           { name: 'changeDimensions', } )
);

export default gqlMyRangeStore;
