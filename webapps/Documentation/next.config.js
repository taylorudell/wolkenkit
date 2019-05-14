'use strict';

const withCSS = require('@zeit/next-css');

const config = {
  async exportPathMap () {
    // TODO: Generate urls bases on metadata

    // return {
    //   '/latest/getting-started/understanding-wolkenkit/why-wolkenkit/': { page: '/index' }
    // };
  }
};

module.exports = withCSS(config);
