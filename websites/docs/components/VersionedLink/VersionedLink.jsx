import React from 'react';
import { usePageContext } from '../../layouts/PageContext';

const SpecialLink = function ({ href, children, rewriteLatestAs = 'latest' } = {}) {
  const { activePage } = usePageContext();
  let { version } = activePage;

  if (version === 'latest') {
    version = rewriteLatestAs;
  }

  return <a href={ href.replace('#VERSION#', version) }>{ children }</a>;
};

export default SpecialLink;
