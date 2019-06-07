import PropTypes from 'prop-types';
import React from 'react';
import { usePageContext } from '..';

const VersionedLink = function ({ href, children, rewriteLatestAs } = {}) {
  const { activePage } = usePageContext();
  let { version } = activePage;

  if (version === 'latest') {
    version = rewriteLatestAs;
  }

  return <a href={ href.replace('#VERSION#', version) }>{ children }</a>;
};

VersionedLink.propTypes = {
  href: PropTypes.string.isRequired,
  rewriteLatestAs: PropTypes.string
};

VersionedLink.defaultProps = {
  rewriteLatestAs: 'latest'
};

export default VersionedLink;
