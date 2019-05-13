'use strict';

const express = require('express');

const getMetadata = require('./getMetadata'),
      getPage = require('./getPage');

class V2 {
  constructor () {
    this.api = express();

    this.api.get('/page/*', getPage());
    this.api.get('/metadata', getMetadata());

    // this.api.get('/sitemap', getSitemap());
    // this.api.get('/content/:version/:section/:chapter/:page')
  }
}

module.exports = V2;
