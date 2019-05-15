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

const collectUrls = function ({ from, parent, into, baseUrl } = {}) {
  if (!from) {
    throw new Error('From is missing.');
  }
  if (!parent) {
    throw new Error('Parent is missing.');
  }
  if (!into) {
    throw new Error('Into is missing.');
  }
  if (!baseUrl) {
    throw new Error('Base url is missing.');
  }

  from.forEach(item => {
    if (item.children) {
      return collectUrls({ from: item.children, parent: `${baseUrl}/${parent}/${item.slug}`, into, baseUrl });
    }
    if (!item.slug) {
      return;
    }
    into.push(`${baseUrl}/${parent}/${item.slug}/`);
  });
};

class Repository {
  constructor ({ baseUrl, contentDirectory, runtimeVersions }) {
    if (!baseUrl) {
      throw new Error('Base Url is missing.');
    }
    if (!contentDirectory) {
      throw new Error('Content directory is missing.');
    }
    if (!runtimeVersions) {
      throw new Error('Runtime versions are missing.');
    }

    this.baseUrl = baseUrl;
    this.contentDirectory = contentDirectory;
    this.runtimeVersions = runtimeVersions;
  }

  async readMetadata () {
    if (this.metadata) {
      return this.metadata;
    }

    this.metadata = {
      name: 'wolkenkit Documentation',
      baseUrl: this.baseUrl,
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

  async readUrls () {
    if (this.urls) {
      return this.urls;
    }

    this.urls = [];

    const metadata = await this.readMetadata();

    Object.keys(metadata.navigation).forEach(version => {
      collectUrls({ from: metadata.navigation[version], parent: version, into: this.urls, baseUrl: this.baseUrl });
    });

    return this.urls;
  }
}

module.exports = Repository;
