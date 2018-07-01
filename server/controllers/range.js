'use strict';

const Instance = require( 'express-locator' ).get( 'Instance' );

class RangeController extends Instance {
  async search ( req, res ) {
    const {
      params: { store: storeNumber, article: _id, },
      query,
      user,
    } = req;
    const $search = query.search;

    const conf = {
      fields: {
        _id   : 1,
        group : 1,
      },
      query : { group: { $ne: 'Exclude', }, },
      sort  : {},
    };
    const filters = JSON.parse( query.filters || '{}' );
    const sort = JSON.parse( query.sort || '{}' );

    const ascdesc = sort.isDescending ? -1 : 1;

    if ( $search && query.isExact && isNaN( $search ) ) {
      conf.fields.score = { $meta: 'textScore', };

      conf.sort.score = { $meta: 'textScore', };

      conf.query.$text = { $search, };
    } else if ( $search && isNaN( $search ) ) {
      const $regex = `^.{0,}${$search
        .split( '' )
        .filter( v => v !== ' ' )
        .map( v => `${v}]*+${v})` )
        .join( '' )}.{1,})`;

      conf.query.$or = [
        ...conf.query.$or || [],
        ...[
          'description',
          'group',
          'category',
          'subcategory',
          'segment',
        ].map( field => ( {
          [field]: {
            $options: 'i',
            $regex,
          },
        } ) ),
      ];

      conf.fields.category = 1;

      conf.fields.description = 1;

      conf.fields.segment = 1;

      conf.fields.subcategory = 1;
    } else if ( $search || _id ) {
      conf.query.$or = [
        ...conf.query.$or || [],
        { 'cass.ea': +( _id || $search ), },
        { 'cass.mpk': +( _id || $search ), },
        { 'cass.car': +( _id || $search ), },
      ];

      conf.fields.cass = 1;
    }
    const { status = {}, } = filters;
    const $in = Object.keys( filters.group || {} ).filter( v => filters.group[v] );
    const hasStatusFilters = !Object.keys( status ).every( one => !status[one] );

    if ( !_id && !( $search && !$in.length ) ) conf.query.group = { $in, };

    if ( !_id && !$search && ( !hasStatusFilters || !$in.length ) ) res.json( { msg: 'initial', } );
    else {
      const store = await this.Store.findById( storeNumber );

      if ( store ) {
        const { organisation, district, } = store;
        const orgdist = `${organisation}.${district}`;

        if ( sort.group ) conf.sort.group = ascdesc;
        if ( sort.price ) {
          conf.sort[`${orgdist}.price.ea`] = ascdesc;

          conf.fields[`${orgdist}.price.ea`] = 1;
        }
        if ( sort.performance ) {
          conf.sort[`${orgdist}.performance`] = ascdesc;

          conf.fields[`${orgdist}.performance`] = 1;
        }
        if ( sort.description ) {
          conf.sort.description = ascdesc;

          conf.fields.description = 1;
        }

        conf.fields[orgdist] = 1;

        const identity = {
          orgdist,
          store,
          user,
        };

        if ( _id ) conf.query._id = +_id;

        const notavailable = await this.notAvailable( conf, identity, _id );
        const [
          ranged = [],
          request = [],
          allpromo = [],
        ] = await this.ranged( conf, identity, _id );
        const allavail = await this.available( conf, identity, _id );

        const available = allavail.filter( article => !ranged.includes( article ) && !request.includes( article ) && !allpromo.includes( article ) );
        const promo = allpromo.filter( article => !ranged.includes( article ) && !request.includes( article ) );
        const override = _id || $search && !hasStatusFilters;
        const arts = [
          ...status['Pog Range'] || override ? ranged : [],
          ...status['Promo/Season'] || override ? promo : [],
          ...status['Customer 1st'] || override ? request : [],
          ...status.Available || override ? available : [],
          ...status['Not Available'] || override ? notavailable : [],
        ].filter( ( v, i, a ) => a.indexOf( v ) === i );

        if ( _id && arts[0] ) {
          const rawart = await this.Article.findById( arts[0] );

          if ( rawart ) {
            const blocks = await this.Block.find();
            const article = rawart.toJSON();

            article.status = request.includes( article._id )
              ? 'Customer 1st'
              : ranged.includes( article._id )
                ? 'Pog Range'
                : promo.includes( article._id )
                  ? 'Promo/Season'
                  : available.includes( article._id )
                    ? 'Available'
                    : 'Not Available';

            const [ relevantBlock, ] = blocks.filter( block => block.articles.includes( article._id ) );

            if ( relevantBlock ) {
              article.blockmsg = relevantBlock.message;

              if ( relevantBlock.allowpath && relevantBlock.allowvalues ) {
                article.blocked = !relevantBlock.allowvalues.some( value =>
                  store[relevantBlock.allowpath].includes( value ) );
              } else article.blocked = false;
            }

            res.json( {
              article,
              store,
            } );
          }
        } else {
          conf.query._id = { $in: arts, };

          const { score, } = conf.fields;

          conf.fields = { _id: 1, };

          if ( score ) conf.fields.score = score;
          const articles = await this.Article.find( conf.query, conf.fields ).sort( conf.sort );
          const msg =
            articles.length === 0 &&
            `Your search yielded no results. Try something else${
              $search && query.isExact ? ', or switch off "Search Complete Words" in the Settings menu' : ''
            }.`;

          res.json( {
            articles: articles.map( art => art._id ),
            msg,
            store,
          } );
        }
      } else res.json( { error: 'The provided store number does not exist', } );
    }
  }

  available ( conf, identity ) {
    const query = { ...conf.query, };

    if ( identity.store.organisation === 'bws' && identity.store.dcs.includes( 3985 ) ) identity.store.dcs.splice( identity.store.dcs.indexOf( 3985 ), 1 );

    query.$and = [
      ...query.$and || [],
      {
        $or: [
          { [`${identity.orgdist}.dc`]: { $in: identity.store.dcs, }, },
          { [`${identity.orgdist}.dsd`]: { $ne: null, }, },
        ],
      },
      {
        $or: [
          { [`${identity.orgdist}.price.ea`]: { $ne: null, }, },
          { [`${identity.orgdist}.price.mpk`]: { $ne: null, }, },
          { [`${identity.orgdist}.price.car`]: { $ne: null, }, },
        ],
      },
      { [`${identity.orgdist}.storeCount`]: { $gt: 0, }, },
    ];

    return this.Article.distinct( '_id', query );
  }

  notAvailable ( conf, identity ) {
    if ( identity.store.organisation === 'bws' && identity.store.dcs.includes( 3985 ) ) identity.store.dcs.splice( identity.store.dcs.indexOf( 3985 ), 1 );
    const query = {
      $or: [
        {
          $and: [
            { [`${identity.orgdist}.dc`]: { $nin: identity.store.dcs, }, },
            { [`${identity.orgdist}.dsd`]: null, },
          ],
        },
        {
          $and: [
            { [`${identity.orgdist}.price.ea`]: null, },
            { [`${identity.orgdist}.price.mpk`]: null, },
            { [`${identity.orgdist}.price.car`]: null, },
          ],
        },
        { [`${identity.orgdist}.storeCount`]: { $lte: 0, }, },
        { [`${identity.orgdist}.storeCount`]: null, },
      ],
    };

    return this.Article.distinct( '_id', conf.query ).where( query );
  }

  ranged ( conf, identity, _id ) {
    return new Promise( ( resolve, reject ) => {
      this.Planogram.find( { stores: identity.store._id, } )
        .populate( {
          match  : conf.query,
          path   : 'n.articles.onshow.article',
          select : '_id category group',
        } )
        .then( pogs => {
          let ranged = [];
          let request = [];
          let promo = [];

          pogs.forEach( pog => {
            if ( pog.articles.onshow ) {
              if ( pog.category.includes( 'Promo Store' ) ) {
                request = [
                  ...request,
                  ...pog.articles.onshow
                    .map( articlePosition => articlePosition.article )
                    .filter( art => !_id || art === +_id ),
                ];
              } else if ( pog.standard ) {
                ranged = [
                  ...ranged,
                  ...pog.articles.onshow
                    .map( articlePosition => articlePosition.article )
                    .filter( art => !_id || art === +_id ),
                ];
              } else {
                promo = [
                  ...promo,
                  ...pog.articles.onshow
                    .map( articlePosition => articlePosition.article )
                    .filter( art => !_id || art === +_id ),
                ];
              }
            }
          } );

          resolve( [
            ranged,
            request,
            promo,
          ] );
        } )
        .catch( e => reject( e ) );
    } );
  }
}

module.exports = RangeController;
