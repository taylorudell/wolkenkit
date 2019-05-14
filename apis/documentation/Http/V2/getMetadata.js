'use strict';

const getMetadata = function ({ repository }) {
  if (!repository) {
    throw new Error('Repository is missing.');
  }

  return async function (req, res) {
    const metadata = await repository.readMetadata();

    res.json(metadata);
  };
};

module.exports = getMetadata;
