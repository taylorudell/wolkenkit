'use strict';

const express = require('express');

const getMetadata = require('./getMetadata'),
      getPage = require('./getPage'),
      Repository = require('./Repository');

class V2 {
  constructor ({ contentDirectory, runtimeVersions } = {}) {
    if (!contentDirectory) {
      throw new Error('Content directory is missing.');
    }
    if (!runtimeVersions) {
      throw new Error('Runtime versions are missing.');
    }

    this.api = express();

    const repository = new Repository({
      contentDirectory,
      runtimeVersions
    });

    this.api.get('/page/*', getPage({ repository }));
    this.api.get('/metadata', getMetadata({ repository }));

    // this.api.get('/sitemap', getSitemap());
    // this.api.get('/content/:version/:section/:chapter/:page')
  }
}

module.exports = V2;
