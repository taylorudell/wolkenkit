import markdownIt from 'markdown-it';
import memoize from 'lodash/memoize';
import PropTypes from 'prop-types';
import React from 'react';

const markdown = markdownIt({
  html: true
});

const renderMarkdown = memoize(content => markdown.render(content));

const Markdown = function ({ component, className, content }) {
  return React.createElement(component, { className, dangerouslySetInnerHTML: { __html: renderMarkdown(content) }});
};

Markdown.propTypes = {
  className: PropTypes.string,
  component: PropTypes.string,
  content: PropTypes.string
};

Markdown.defaultProps = {
  component: 'article',
  content: ''
};

export default Markdown;
