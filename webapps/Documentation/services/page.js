'use strict';

const collectPageInfo = function ({ children, path, breadcrumbs }) {
  if (!children) {
    return '';
  }

  const item = children.find(child => child.slug === path[0]);

  if (!item) {
    return '';
  }

  breadcrumbs.push(item.title);

  if (!item.children || path.length === 1) {
    return {
      title: item.title,
      breadcrumbs
    };
  }

  return collectPageInfo({ children: item.children, path: path.slice(1), breadcrumbs });
};

const page = {
  getInfo ({ path, metadata }) {
    const [ version, ...pathWithoutVersion ] = path;

    return collectPageInfo({ children: metadata.navigation[version], path: pathWithoutVersion, breadcrumbs: []});
  },

  getVersion ({ path }) {
    if (!path) {
      throw new Error('Path is missing');
    }

    if (!Array.isArray(path)) {
      throw new Error('Path is not an array.');
    }

    if (path[0]) {
      return path[0];
    }

    return undefined;
  },

  getSection ({ path }) {
    if (!path) {
      throw new Error('Path is missing');
    }

    if (!Array.isArray(path)) {
      throw new Error('Path is not an array.');
    }

    if (path[1]) {
      return path[1];
    }

    return undefined;
  },

  getChapter ({ path }) {
    if (!path) {
      throw new Error('Path is missing');
    }

    if (!Array.isArray(path)) {
      throw new Error('Path is not an array.');
    }

    if (path[2]) {
      return path[2];
    }

    return undefined;
  }
};

module.exports = page;
