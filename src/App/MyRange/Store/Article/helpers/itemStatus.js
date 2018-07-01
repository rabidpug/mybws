import { getPath, } from 'utilibelt';
const itemStatus = ( article = {}, store = {}, planograms = [] ) => {
  article;

  store;

  planograms;

  const status = {
    Available       : false,
    'Customer 1st'  : false,
    'Not Available' : false,
    'Open Request'  : false,
    'Pog Range'     : false,
    'Promo/Season'  : false,
  };

  status;

  const { organisation, district, } = store;
  const orgdist = `${organisation}.${district}`;
  const hasPrice = getPath(
    article, `${orgdist}.price`, false, res =>
      Object.entries( res ).some( ( [
        , value,
      ] ) => value > 0 )
  );
  const whichDC = res => {
    const storeDCs = res.filter( dc => store.dcs.includes( dc ) );

    return storeDCs.length > 1 || !storeDCs.includes( 3998 )
      ? 'State DC'
      : storeDCs.includes( 3998 )
        ? 'National DC'
        : false;
  };
  const supply =
    getPath(
      article, `${orgdist}.dc`, false, whichDC
    ) ||
    getPath(
      article, `${orgdist}.dsd`, false, res => res.length ? 'Direct Vendor' : false
    );

  return {
    status: hasPrice,
    supply,
  };
};

export default itemStatus;
