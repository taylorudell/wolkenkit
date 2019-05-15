'use strict';

const express = require('express');

const getMetadata = require('./getMetadata'),
      getNews = require('./getNews'),
      getPage = require('./getPage'),
      getUrls = require('./getUrls'),
      Repository = require('./Repository');

class V2 {
  constructor ({ baseUrl, contentDirectory, runtimeVersions } = {}) {
    if (!baseUrl) {
      throw new Error('Base url is missing.');
    }
    if (!contentDirectory) {
      throw new Error('Content directory is missing.');
    }
    if (!runtimeVersions) {
      throw new Error('Runtime versions are missing.');
    }

    this.api = express();

    const repository = new Repository({
      baseUrl,
      contentDirectory,
      runtimeVersions
    });

    this.api.get('/page/*', getPage({ repository }));
    this.api.get('/metadata', getMetadata({ repository }));
    this.api.get('/news', getNews({ repository }));
    this.api.get('/urls', getUrls({ repository }));

    // this.api.get('/sitemap', getSitemap());
  }
}

module.exports = V2;
