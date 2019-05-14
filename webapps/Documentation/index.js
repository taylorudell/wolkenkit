'use strict';

const path = require('path');

const express = require('express'),
      next = require('next');

class Documentation {
  async initialize ({ nodeEnv, contentDirectory }) {
    if (!nodeEnv) {
      throw new Error('Node env is missing.');
    }
    this.nodeEnv = nodeEnv;

    /* eslint-disable callback-return */
    const nextApp = next({
      dev: this.nodeEnv,
      dir: __dirname
    });
    /* eslint-enable callback-return */

    const handle = nextApp.getRequestHandler();

    await nextApp.prepare();

    this.api = express();

    this.api.get('/:version/:section/:chapter/:page', (req, res) => {
      const { version, section, chapter, page } = req.params;

      return nextApp.render(req, res, '/index', { version, section, chapter, page });
    });

    this.api.use('/', express.static(path.join(__dirname, 'static')));
    this.api.use('/', express.static(contentDirectory));

    this.api.get('*', (req, res) => handle(req, res));

    this.handle = handle;
  }
}

module.exports = Documentation;
