import { usePageContext } from '../../layouts/PageContext';

// Usage: <ActivePage>{ ({ activePage }) => activePage.version === 'latest' ? 'master' : activePage.version }</ActivePage>

const ActivePage = function ({ value, children } = {}) {
  const { activePage, metadata } = usePageContext();

  const versions = metadata.versions[activePage.version];

  if (typeof children === 'function') {
    return children({ ...activePage, versions });
  }

  let transformedValue;

  if (value && value.includes('<%= version %>')) {
    transformedValue = value.replace('<%= version %>', activePage.version);
  }

  return transformedValue;
};

export default ActivePage;
