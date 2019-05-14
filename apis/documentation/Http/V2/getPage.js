'use strict';

const getPage = function ({ repository }) {
  if (!repository) {
    throw new Error('Repository is missing.');
  }

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
