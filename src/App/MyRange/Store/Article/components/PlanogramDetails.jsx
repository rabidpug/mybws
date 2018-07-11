import React from 'react'
import { Tooltip, } from 'react-tippy'
import { formatDate, } from 'Common/helpers/formatDate'
import { getPath, } from 'utilibelt'
const PlanogramDetails = ( { article, planograms, orgdist, supply, } ) => {
  const planogramsNotes = planograms.reduce( ( p, n ) => {
    const [ matchedArticle, ] = getPath(
      n, 'articles.onshow', [], articles =>
        articles.filter( art => article.id === art.article && ( art.notes || art.updated ) )
    )

    if ( p && matchedArticle ) p = `${p}\n`
    if ( matchedArticle ) {
      p = `${p}${n.category}:\n${matchedArticle.notes ? `notes: ${matchedArticle.notes}` : ''}${
        matchedArticle.notes ? '\n' : ''
      }${matchedArticle.updated ? `updated on: ${formatDate( matchedArticle.updated, 'dd/mm/yyyy' )}` : ''}`
    }
    return p
  }, '' )
  const ranging = {};

  [
    'bws',
    'dms',
  ].forEach( org => {
    if ( article[org] && Object.keys( article[org] ).some( dist => article[org][dist].storeCount > 0 ) ) {
      if ( !ranging[org] ) ranging[org] = {}

      Object.keys( article[org] ).forEach( dist => {
        if ( article[org][dist].storeCount > 0 ) ranging[org][dist] = article[org][dist].storeCount
      } )
    }
  } )

  const storePlanograms = planograms.length > 0 && (
    <span style={ { borderBottom: planogramsNotes && '1px dashed black', } }>
      myPlanograms: {planograms.reduce( ( p, n ) => p ? `${p}, ${n.category}` : n.category, '' )}
      <br />
    </span>
  )
  const detailedRanging = ( ranging.bws || ranging.dms ) && (
    <span>
      {ranging.bws && (
        <span>
          BWS
          <br />
          {Object.keys( ranging.bws ).map( ( state, i, arr ) =>
            <span key={ `bws${state}` }>{`${state}: ${ranging.bws[state]}${i < arr.length - 1 ? ' | ' : ''}`}</span> )}
          <br />
        </span>
      )}
      {ranging.dms && (
        <span>
          DANS
          <br />
          {Object.keys( ranging.dms ).map( ( state, i, arr ) =>
            <span key={ `dms${state}` }>{`${state}: ${ranging.dms[state]}${i < arr.length - 1 ? ' | ' : ''}`}</span> )}
        </span>
      )}
    </span>
  )

  const summaryRanging = (
    <span style={ { borderBottom: detailedRanging && '1px dashed black', } }>
      {`Ranging: ${
        ranging.bws
          ? Object.keys( ranging.bws ).reduce( ( p, n ) => {
            p = p + ranging.bws[n]

            return p
          }, 0 )
          : 0
      } BWS | ${
        ranging.dms
          ? Object.keys( ranging.dms ).reduce( ( p, n ) => {
            p = p + ranging.dms[n]

            return p
          }, 0 )
          : 0
      } Dans`}
    </span>
  )
  const priceEA = getPath( article, `${orgdist}.price.ea` )
  const priceMPK = getPath( article, `${orgdist}.price.mpk` )
  const priceCAR = getPath( article, `${orgdist}.price.car` )
  const priceString =
    ( priceEA || priceMPK || priceCAR ) &&
    `Sell Price: ${priceEA ? `$${priceEA}ea` : ''}${priceEA && priceMPK ? ' | ' : ''}${
      priceMPK ? `$${priceMPK}mpk` : ''
    }${( priceEA || priceMPK ) && priceCAR ? ' | ' : ''}${priceCAR ? `$${priceCAR}car` : ''}`
  const performanceString =
    getPath( article, `${orgdist}.performance` ) && `Avg Store Sales: $${getPath( article, `${orgdist}.performance` )}pw`
  const sourceOfSupply = `Source of Supply: ${supply || 'No Supply'}`

  return (
    <span
      style={ {
        flex      : 1,
        overflowX : 'hidden',
        overflowY : 'auto',
        position  : 'relative',
      } }>
      <hr style={ { margin: 0, } } />
      <div>
        <div
          style={ {
            display     : 'inline-block',
            marginRight : '1rem',
          } }>
          {planogramsNotes ? (
            <Tooltip html={ <span style={ { whiteSpace: 'pre-line', } }>{planogramsNotes}</span> } touchhold>
              {storePlanograms}
            </Tooltip>
          )
            : storePlanograms
          }
          {detailedRanging ? (
            <Tooltip html={ detailedRanging } touchhold>
              {summaryRanging}
            </Tooltip>
          )
            : summaryRanging
          }
          <br />
          {sourceOfSupply}
        </div>
        <div style={ { display: 'inline-block', } }>
          {priceString}
          {priceString && performanceString && <br />}
          {performanceString}
          <div style={ { margin: 'auto', } }>
            <a
              href={ `https://bws.com.au/search?searchTerm=${article.description
                .replace( /[\s0-9]{1,}ml/gi, '' )
                .replace( /\s/g, '-' )}` }
              rel='noopener noreferrer'
              target='_blank'>
              bws.com.au
            </a>
            {' | '}
            <a
              href={ `https://www.danmurphys.com.au/product/DM_${article.id}` }
              rel='noopener noreferrer'
              target='_blank'>
              danmurphys.com.au
            </a>
          </div>
        </div>
      </div>
    </span>
  )
}

export default PlanogramDetails
