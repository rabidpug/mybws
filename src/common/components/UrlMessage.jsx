import React from 'react';

const urlsFinder = /(?:http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([a-z0-9]+(?:[-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(?::[0-9]{1,5})?(?:\/.[a-z]{2,5})?)(?![a-z0-9])/gi;

const UrlMessage = ( { message, } ) => (
  <span
    dangerouslySetInnerHTML={ {
      __html: message.replace( urlsFinder,
                               match => `<a
            href='https://${match}'
            target='_blank' style='display:inline-block'>
            ${match}
          </a>` ),
    } }
  />
);

export default UrlMessage;
