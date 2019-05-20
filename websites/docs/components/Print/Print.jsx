'use strict';

const { usePageContext } = require('../../layouts/PageContext');

// Usage: <Print>{ ({ activePage }) => activePage.version === 'latest' ? 'master' : activePage.version }</Print>

const Print = function ({ value, children } = {}) {
  const { activePage } = usePageContext();

  if (typeof children === 'function') {
    return children({ activePage });
  }

  let transformedValue;

  if (value.includes('<%= version %>')) {
    transformedValue = value.replace('<%= version %>', activePage.version);
  }

  return transformedValue;
};

module.exports = Print;
