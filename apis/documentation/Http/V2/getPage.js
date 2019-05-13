'use strict';

const repository = require('./repository');

const getPage = function () {
  return async function (req, res) {
    const pagePath = req.url.replace('/page', '');

    try {
      const pageContent = await repository.readPage({ pagePath });

      res.send(pageContent);
    } catch (ex) {
      return res.status(500).end();
    }
  };
};

module.exports = getPage;
