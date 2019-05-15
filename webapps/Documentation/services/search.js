'use strict';

const path = require('path');

const flatPages = {};

const collectPages = function ({ from, into, parent, parentSlug, section, chapter, version } = {}) {
  if (!from) {
    throw new Error('From is missing.');
  }
  if (!parentSlug) {
    throw new Error('Parent slug is missing.');
  }
  if (!into) {
    throw new Error('Into is missing.');
  }
  if (!version) {
    throw new Error('Version is missing.');
  }

  from.forEach(page => {
    const pagePath = path.join(parentSlug, page.slug);

    if (page.children) {
      const pathDepth = pagePath.match(/\/.+?/gu).length;

      return collectPages({
        from: page.children,
        into,
        parent: page,
        parentSlug: path.join(parentSlug, page.slug),
        section: pathDepth === 1 ? page : section,
        chapter: pathDepth === 2 ? page : chapter,
        version
      });
    }
    if (!page.slug) {
      return;
    }

    const pageMetaData = {
      id: pagePath,
      parent,
      path: pagePath,
      title: page.title,
      keywords: page.keywords,
      keywordsAsString: page.keywords ? page.keywords.join(' ') : undefined,
      section,
      chapter,
      version,
      breadcrumbsAsString: `${section.title} ${chapter && chapter.title}`
    };

    into.push(pageMetaData);
  });
};

const search = {
  initialize ({ metadata }) {
    if (!metadata) {
      throw new Error('Metadata is missing.');
    }

    this.metadata = metadata;
  },

  query ({ query, version }) {
    if (!query) {
      throw new Error('Query is missing.');
    }
    if (!version) {
      throw new Error('Version is missing.');
    }

    if (!flatPages[version]) {
      flatPages[version] = [];

      collectPages({
        from: this.metadata.navigation[version],
        parentSlug: version,
        into: flatPages[version],
        version
      });
    }

    const queryWords = query.
      split(' ').
      filter(word => word !== '');

    const patterns = queryWords.map(word => {
      const pattern = new RegExp(`(\\b${word})`, 'iu');

      return pattern;
    });

    const results = flatPages[version].filter(page => {
      let occurences = 0;

      patterns.forEach(pattern => {
        if (
          pattern.test(page.title) ||
          pattern.test(page.keywordsAsString) ||
          pattern.test(page.breadcrumbsAsString)
        ) {
          occurences += 1;
        }
      });

      return occurences === patterns.length;
    });

    return results;
  }
};

module.exports = search;
