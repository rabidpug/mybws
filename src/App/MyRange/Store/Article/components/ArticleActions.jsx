import ActionIcon from 'Common/components/ActionIcon'
import React from 'react'
import { Tooltip, } from 'react-tippy'

const ArticleActions = ( { role, item, isBig, onClick, status, } ) => {
  const title = isBig
    ? 'De/Ranging Requests'
    : status === 'Open'
      ? 'Open Request Submitted'
      : status === 'Available' && item.blockmsg
        ? item.blockmsg
        : status === 'Available'
          ? 'Request Ranging'
          : status === 'Store Request'
            ? 'Request Deranging'
            : 'Action Not Available'

  return (
    role === 'Store Team' && (
      <span>
        <Tooltip distance={ 25 } title={ title } touchHold>
          <ActionIcon
            icon={ isBig ? 'boxes' : status && status.includes( 'Available' ) ? 'cart-plus' : 'trash' }
            onClick={ () =>
              onClick( {
                item,
                req: 'De/Ranging Requests',
              } )
            }
            style={ {
              color: isBig
                ? '#fff'
                : status === 'Available' && !item.blocked || status === 'Store Request'
                  ? '#000'
                  : '#d3d3d3',
              cursor:
                status === 'Available' && !item.blocked || status === 'Store Request' || isBig
                  ? 'pointer'
                  : 'not-allowed',
            } }
          />
        </Tooltip>
        <Tooltip
          distance={ 25 }
          title={ isBig ? 'Ranging Issues' : status === 'Open' ? 'Open Issue Submitted' : 'Ranging Issue' }
          touchHold>
          <ActionIcon
            icon='exclamation'
            onClick={ () =>
              onClick( {
                item,
                req: 'Ranging Issues',
              } )
            }
            style={ {
              color  : isBig ? '#fff' : status === 'Open' ? '#d3d3d3' : '#000',
              cursor : status === 'Open' && !isBig ? 'not-allowed' : 'pointer',
            } }
          />
        </Tooltip>
      </span>
    )
  )
}

export default ArticleActions
