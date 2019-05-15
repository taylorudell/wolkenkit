'use strict';

const withCSS = require('@zeit/next-css');

const config = {
  async exportPathMap (defaultPathMap, { dev }) {
    if (dev) {
      return defaultPathMap;
    }

    // TODO: Generate urls bases on metadata
    // return {
    //   '/latest/getting-started/understanding-wolkenkit/why-wolkenkit/': {
    //     page: '/index',
    //     query: {
    //       version: 'latest',
    //       section: 'getting-started',
    //       chapter: 'understanding-wolkenkit',
    //       page: 'why-wolkenkit'
    //     }
    //   }
    // };

    return {};
  }
};

module.exports = withCSS(config);
