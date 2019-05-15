'use strict';

const getUrls = function ({ repository }) {
  if (!repository) {
    throw new Error('Repository is missing.');
  }

  return async function (req, res) {
    try {
      const urls = await repository.readUrls();

      res.send(urls);
    } catch {
      return res.status(500).end();
    }
  };
};

module.exports = getUrls;
