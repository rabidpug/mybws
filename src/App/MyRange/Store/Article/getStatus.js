import { getPath, } from 'utilibelt';
export default function getStatus ( article, planograms, store ) {
  if ( article && store && planograms ) {
    const orgdist = `${store.organisation}.${store.district}`;
    const hasPrice = getPath(
      article, `${orgdist}.price`, false, res => Object.entries( res ).some( ( [
        , value,
      ] ) => value )
    );
    const supply =
      getPath(
        article, `${orgdist}.dc`, false, res =>
          res.reduce( ( p, n ) => {
            if ( p === 'State DC' ) return p;
            else if ( store.dcs.includes( n ) && n !== 3985 ) return n === 3998 ? 'National DC' : 'State DC';
            else return p;
          }, false )
      ) || getPath(
        article, `${orgdist}.dsd`, false, res => res.length > 0 ? 'Direct Vendor' : ''
      );
    const isRanged = getPath( article, `${orgdist}.storeCount` );
    const { isStandard, isPromo, isRequest, } = planograms.reduce( ( p, n ) => {
      if ( n.category === 'Promo Store - Total' ) p.isRequest = true;
      else if ( n.standard ) p.isStandard = true;
      else p.isPromo = true;
      return p;
    }, {} );
    const isAvailable = hasPrice && supply && isRanged;
    const status = isRequest
      ? 'Customer 1st'
      : isStandard
        ? 'Pog Range'
        : isPromo
          ? 'Promo/Season'
          : isAvailable
            ? 'Available'
            : 'Not Available';

    const isBlocked =
      article.allowpath &&
      article.allowvalues &&
      !article.allowvalues.some( value => getPath( store, article.allowpath ).includes( value ) );

    return {
      isBlocked,
      status,
      supply,
    };
  } else return false;
}
