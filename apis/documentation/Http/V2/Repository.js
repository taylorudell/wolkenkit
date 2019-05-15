'use strict';

const path = require('path');

const ejs = require('ejs'),
      fs = require('fs-extra'),
      semver = require('semver');

const slugify = function (text) {
  if (typeof text === 'string') {
    return text.toLowerCase().replace(/ /g, '-').
      replace(/[^A-Za-z0-9-]/g, '');
  }

  if (Array.isArray(text)) {
    const items = text;

    return items.map(item => {
      if (item.children) {
        return { ...item, slug: slugify(item.title), children: slugify(item.children) };
      }

      return { ...item, slug: slugify(item.title) };
    });
  }

  throw new Error('Invalid operation.');
};

class Repository {
  constructor ({ contentDirectory, runtimeVersions }) {
    if (!contentDirectory) {
      throw new Error('Content directory is missing.');
    }
    if (!runtimeVersions) {
      throw new Error('Runtime versions are missing.');
    }

    this.contentDirectory = contentDirectory;
    this.runtimeVersions = runtimeVersions;
  }

  async readMetadata () {
    if (this.metadata) {
      return this.metadata;
    }

    this.metadata = {
      name: 'wolkenkit Documentation',
      baseUrl: 'https://docs.wolkenkit.io',
      navigation: {},
      versions: {}
    };

    /* eslint-disable global-require */
    this.runtimeVersions.forEach(runtimeVersion => {
      const metadataForVersion = require(path.join(this.contentDirectory, runtimeVersion, 'metadata'));

      this.metadata.navigation[runtimeVersion] = slugify(metadataForVersion.navigation);
      this.metadata.versions[runtimeVersion] = metadataForVersion.versions;
    });
    /* eslint-enable global-require */

    this.metadata.stable = semver.maxSatisfying(this.runtimeVersions.filter(version => version !== 'latest'), '*') || 'latest';

    return this.metadata;
  }

  async readNews ({} = {}) {
    const filePath = path.join(this.contentDirectory, 'news.json');

    const newsAsPlainText = await fs.readFile(filePath, 'utf8');

    const news = JSON.parse(newsAsPlainText);

    return news;
  }

  async readPage ({ pagePath } = {}) {
    if (!pagePath) {
      throw new Error('Page path is missing.');
    }

    const version = pagePath.split('/')[1] || 'latest';
    const filePath = path.join(this.contentDirectory, pagePath, 'index.md');

    try {
      await fs.stat(filePath);
    } catch (ex) {
      throw new Error(`Page with path ${filePath} does not exist.`);
    }

    const metadata = await this.readMetadata();
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
  }
}

module.exports = Repository;
