'use strict';

const repository = require('./repository');

const getMetadata = function () {
  return async function (req, res) {
    const metadata = await repository.readMetadata();

    res.json(metadata);
  };
};

module.exports = getMetadata;
