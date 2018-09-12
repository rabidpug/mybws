const storeFromPath = pathname => {
  const [
    , pathStore = '',
  ] = pathname.match( /(?:\/)([0-9]{4})(?:\/|$)/ ) || [];

  return pathStore;
};

export default storeFromPath;
