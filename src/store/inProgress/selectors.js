import createSelector from 'selectorator';

const selectors = { selectGettingItem: createSelector( [ `inProgress.gettingItem`, ], gettingItem => gettingItem.length > 0 ), };

export default selectors;
