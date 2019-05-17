'use strict';

const Head = require('next/head').default,
      React = require('react');

const redirect = destination => {
  if (!destination) {
    throw new Error('Destination is missing.');
  }

  const RedirectComponent = ({ metaRedirect }) => {
    if (metaRedirect) {
      return (
        <Head>
          <meta httpEquiv='refresh' content={ `0; url=${destination}` } />
        </Head>
      );
    }

    return null;
  };

  RedirectComponent.getInitialProps = function ({ res }) {
    if (res && res.writeHead) {
      res.writeHead(302, { Location: destination });
      res.end();
    }

    return { metaRedirect: true };
  };

  return RedirectComponent;
};

module.exports = redirect;
