'use strict';

const path = require('path');

const assert = require('assertthat');

const applicationManager = require('../../../../../common/application/applicationManager');

suite('[common/application] invalidWithAggregatesMissing', () => {
  test('throws an error.', async () => {
    await assert.that(async () => {
      await applicationManager.load({
        directory: path.join(__dirname, '..', '..', '..', '..', 'shared', 'common', 'application', 'invalidWithAggregatesMissing')
      });
    }).is.throwingAsync('Too few properties defined (0), minimum 1 (at ./server/writeModel/planning).');
  });
});