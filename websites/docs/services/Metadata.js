'use strict';

const semver = require('semver');

const { baseUrl, title, versions, news } = require('../configuration');

const slugify = function (text) {
  if (typeof text === 'string') {
    return text.toLowerCase().replace(/ /gu, '-').
      replace(/[^A-Za-z0-9-]/gu, '');
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

const collectUrls = function ({ from, parent, into } = {}) {
  if (!from) {
    throw new Error('From is missing.');
  }
  if (!parent) {
    throw new Error('Parent is missing.');
  }
  if (!into) {
    throw new Error('Into is missing.');
  }
  if (baseUrl === undefined) {
    throw new Error('Base url is missing.');
  }

  for (const item of from) {
    if (item.children) {
      return collectUrls({ from: item.children, parent: `${parent}/${item.slug}`, into, baseUrl });
    }
    if (!item.slug) {
      return;
    }
    into.push(`/${parent}/${item.slug}/`);
  }
};

class Metadata {
  constructor () {
    this.baseUrl = baseUrl;
    this.news = news;
    this.title = title;

    this.navigation = {};
    this.versions = {};

    /* eslint-disable global-require */

    for (const runtimeVersion of versions) {
      const navigationForRuntimeVersion = require(`../configuration/${runtimeVersion}/navigation`);
      const versionsForRuntimeVersion = require(`../configuration/${runtimeVersion}/versions`);

      this.navigation[runtimeVersion] = slugify(navigationForRuntimeVersion);
      this.versions[runtimeVersion] = versionsForRuntimeVersion;
    }
    /* eslint-enable global-require */

    this.stable = semver.maxSatisfying(versions.filter(version => version !== 'latest'), '*') || 'latest';
  }

  getSitemap () {
    const urls = [];

    for (const runtimeVersions of versions) {
      collectUrls({ from: this.navigation[runtimeVersions], parent: runtimeVersions, into: urls });
    }

    return urls;
  }
}

module.exports = Metadata;
