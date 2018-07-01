import ActionIcon from 'Common/components/ActionIcon';
import React from 'react';
import { Tooltip, } from 'react-tippy';

const ArticleActions = ( { activeRole, item, isBig, onClick, } ) => {
  const title = isBig
    ? 'De/Ranging Requests'
    : item.status === 'Open'
      ? 'Open Request Submitted'
      : item.status === 'Available' && item.blockmsg
        ? item.blockmsg
        : item.status === 'Available'
          ? 'Request Ranging'
          : item.status === 'Store Request'
            ? 'Request Deranging'
            : 'Action Not Available';

  return (
    activeRole === 'Store Team' && (
      <span>
        <Tooltip distance={ 25 } title={ title } touchHold>
          <ActionIcon
            icon={ isBig ? 'boxes' : item.status && item.status.includes( 'Available' ) ? 'cart-plus' : 'trash' }
            onClick={ () =>
              onClick( {
                item,
                req: 'De/Ranging Requests',
              } )
            }
            style={ {
              color: isBig
                ? '#fff'
                : item.status === 'Available' && !item.blocked || item.status === 'Store Request'
                  ? '#000'
                  : '#d3d3d3',
              cursor:
                item.status === 'Available' && !item.blocked || item.status === 'Store Request' || isBig
                  ? 'pointer'
                  : 'not-allowed',
            } }
          />
        </Tooltip>
        <Tooltip
          distance={ 25 }
          title={ isBig ? 'Ranging Issues' : item.status === 'Open' ? 'Open Issue Submitted' : 'Ranging Issue' }
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
              color  : isBig ? '#fff' : item.status === 'Open' ? '#d3d3d3' : '#000',
              cursor : item.status === 'Open' && !isBig ? 'not-allowed' : 'pointer',
            } }
          />
        </Tooltip>
      </span>
    )
  );
};

export default ArticleActions;
