'use strict';

const docker = require('../../docker'),
      runtimes = require('../../runtimes');

const destroyData = async function ({ configuration, secret }, progress) {
  if (!configuration) {
    throw new Error('Configuration is missing.');
  }
  if (!secret) {
    throw new Error('Secret is missing.');
  }
  if (!progress) {
    throw new Error('Progress is missing.');
  }

  const volumes = await runtimes.getVolumes({
    configuration,
    forVersion: configuration.application.runtime.version,
    secret
  });

  await Promise.all(volumes.map(volume =>
    docker.removeVolume({ configuration, volume })));
};

module.exports = destroyData;
