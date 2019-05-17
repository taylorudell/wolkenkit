'use strict';

const highlight = require('remark-highlight.js'),
      slug = require('remark-slug'),
      withCSS = require('@zeit/next-css');

const withMDX = require('@next/mdx')({
  extension: /\.mdx$/u,
  options: {
    remarkPlugins: [ highlight, slug ]
  }
});

const config = {
  pageExtensions: [ 'js', 'jsx', 'mdx' ]
};

module.exports = withCSS(withMDX(config));
