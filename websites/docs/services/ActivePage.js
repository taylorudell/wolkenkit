'use strict';

const collectBreadcrumbs = function ({ language, children, path, into } = {}) {
  if (!language) {
    throw new Error('Language is missing.');
  }
  if (!path) {
    throw new Error('Path is missing.');
  }
  if (!children) {
    throw new Error('Children are missing.');
  }
  if (!into) {
    throw new Error('Into is missing.');
  }

  const item = children.find(child => child.slug === path[0]);

  into.push(item.title);

  if (!item.children || path.length === 1) {
    return;
  }

  collectBreadcrumbs({
    language,
    children: item.children,
    path: path.slice(1),
    into
  });
};

class ActivePage {
  constructor ({ metadata, path } = {}) {
    if (!metadata) {
      throw new Error('Metadata is missing.');
    }
    if (!path) {
      throw new Error('Path is missing.');
    }

    this.cleanedPath = path;

    if (path.indexOf('#')) {
      const [ pathWithoutAnchor ] = path.split('#');

      this.cleanedPath = pathWithoutAnchor;
    }

    if (path.indexOf('?')) {
      const [ pathWithoutQuery ] = path.split('?');

      this.cleanedPath = pathWithoutQuery;
    }

    this.metadata = metadata;
    this.path = this.cleanedPath.split('/').filter(item => item);

    const [ language, version, section, chapter, page ] = this.path;

    this.language = language;
    this.version = version;
    this.section = section;
    this.chapter = chapter;
    this.page = page;

    this.title = '';

    this.breadcrumbs = this.getBreadcrumbs({ path: this.path });
    this.title = this.breadcrumbs[this.breadcrumbs.length - 1];
  }

  isContentPage () {
    return this.path.length === 5;
  }

  getBreadcrumbs ({ path }) {
    const [ language, version, section, chapter, page ] = path;
    const pathWithoutLanguageAndVersion = [ section, chapter, page ].filter(item => item);
    const breadcrumbs = [];

    // If we're not a content page e.g. `/en-US/latest` there are no breadcrumbs.
    if (path.length <= 2) {
      return breadcrumbs;
    }

    collectBreadcrumbs({
      language,
      path: pathWithoutLanguageAndVersion,
      children: this.metadata.navigation[version],
      into: breadcrumbs
    });

    return breadcrumbs;
  }
}

module.exports = ActivePage;
