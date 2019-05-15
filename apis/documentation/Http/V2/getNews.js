'use strict';

const getPage = function ({ repository }) {
  if (!repository) {
    throw new Error('Repository is missing.');
  }

  return async function (req, res) {
    try {
      const news = await repository.readNews();

      res.json(news);
    } catch {
      return res.status(500).end();
    }
  };
};

module.exports = getPage;
