'use strict';

const http = require('http');

const express = require('express'),
      flaschenpost = require('flaschenpost'),
      processenv = require('processenv');

const loggerSystem = flaschenpost.getLogger();

const DocumentationApi = require('../../apis/Documentation'),
      DocumentationWebApp = require('../../webapps/Documentation');

const port = processenv('PORT') || 3000;

(async () => {
  try {
    const app = express();

    const documentationApi = new DocumentationApi.Http();

    await documentationApi.initialize({
      nodeEnv: processenv('NODE_ENV') || 'development',
      corsOrigin: '*'
    });

    const documentationWebApp = new DocumentationWebApp();

    await documentationWebApp.initialize({
      nodeEnv: processenv('NODE_ENV') || 'development'
    });

    app.use('/api', documentationApi.api);
    app.use(documentationWebApp.api);

    const server = http.createServer(app);

    server.listen(port, err => {
      if (err) {
        throw err;
      }

      loggerSystem.info(`Website server listening on port ${port}.`);
    });
  } catch (ex) {
    loggerSystem.fatal('An unexpected error occured.', { err: ex });

    /* eslint-disable no-process-exit */
    process.exit(1);
    /* eslint-enable no-process-exit */
  }
})();
