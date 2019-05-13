'use strict';

const path = require('path');

const ejs = require('ejs'),
      fs = require('fs-extra');

const readMetadata = require('./readMetadata');

const readPage = async function ({ pagePath } = {}) {
  if (!pagePath) {
    throw new Error('Page path is missing.');
  }

  const version = pagePath.split('/')[1] || 'latest';
  const filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'documentation', pagePath, 'index.md');

  try {
    await fs.stat(filePath);
  } catch (ex) {
    throw new Error(`Page with path ${filePath} does not exist.`);
  }

  const metadata = await readMetadata();
  const pageMarkowndWithEjs = await fs.readFile(filePath, 'utf8');

  const markdown = await ejs.render(pageMarkowndWithEjs, {
    current: {
      version,
      versions: metadata.versions[version]
    },
    filename: pagePath,
    async: true
  });

  return markdown;
};

module.exports = readPage;
