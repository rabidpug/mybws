import MiniCard from 'Common/components/MiniCard';
import React from 'react';
import { formatDate, } from 'Common/helpers/formatDate';
import noImage from 'Assets/noImage.png';
const Message = ( { message, timestamp, userProfile, isUser, } ) => (
  <MiniCard alignRight={ isUser }>
    <MiniCard.Header
      avatar={ userProfile.photos === 'Anonymous' ? noImage : userProfile.photos }
      description={ formatDate( timestamp ) }
      title={ userProfile.displayNames }
    />
    <MiniCard.Body message={ message } />
  </MiniCard>
);

export default Message;
