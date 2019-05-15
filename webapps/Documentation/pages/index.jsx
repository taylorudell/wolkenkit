import api from '../services/api';
import classNames from 'classnames';
import Head from '../components/Head.jsx';
import IntroPage from '../components/IntroPage.jsx';
import MobileNavigation from '../components/MobileNavigation.jsx';
import Navigation from '../components/navigation/Navigation.jsx';
import page from '../services/page';
import Page from '../components/Page.jsx';
import PageContent from '../components/PageContent/index.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import search from '../services/search';

class Home extends React.Component {
  static async getInitialProps ({ asPath, query }) {
    const activePath = asPath.split('/').filter(item => item);

    let metadata,
        pageContent;

    try {
      metadata = await api.get({ path: 'metadata' });
    } catch {
      metadata = {};
    }

    // Query for page content only if we're not at the root level
    if (query.section && query.chapter && query.page) {
      try {
        pageContent = await api.get({ path: `page/${asPath}` });
      } catch {
        pageContent = '';
      }
    }

    const pageInfo = page.getInfo({ metadata, path: activePath });
    const isRootPath = activePath.length <= 1;

    return {
      activePath,
      activeVersion: query.version,
      metadata,
      pageContent,
      pageInfo,
      isRootPath
    };
  }

  constructor (props) {
    super(props);

    this.handleMobileNavigationClick = this.handleMobileNavigationClick.bind(this);

    this.state = {
      showMobileNav: false
    };
  }

  componentDidMount () {
    const { metadata } = this.props;

    search.initialize({ metadata });
  }

  handleMobileNavigationClick () {
    const { showMobileNav } = this.state;

    this.setState({
      showMobileNav: !showMobileNav
    });
  }

  render () {
    const {
      showMobileNav
    } = this.state;

    const {
      activePath,
      activeVersion,
      pageContent,
      pageInfo,
      metadata,
      isRootPath
    } = this.props;

    const componentClasses = classNames({
      'wk-mobile--nav-visible': showMobileNav
    });

    return (
      <Page className={ componentClasses }>
        <Head>
          <title>Hans{ metadata.name }</title>
        </Head>

        <IntroPage
          isCollapsed={ !isRootPath }
        />

        <Navigation
          showLogo={ !isRootPath }
          activePath={ activePath }
          metadata={ metadata }
          activeVersion={ activeVersion }
          isVisibleOnMobile={ showMobileNav }
        />

        <PageContent
          activePath={ activePath }
          activeVersion={ activeVersion }
          breadcrumbs={ pageInfo.breadcrumbs }
          content={ pageContent }
          isCollapsed={ isRootPath }
          title={ pageInfo.title }
          metadata={ metadata }
        />

        <MobileNavigation
          onClick={ this.handleMobileNavigationClick }
          isVisible={ showMobileNav }
        />
      </Page>
    );
  }
}

Home.propTypes = {
  activePath: PropTypes.array.isRequired,
  activeVersion: PropTypes.string.isRequired,
  metadata: PropTypes.object.isRequired,
  pageContent: PropTypes.string,
  pageInfo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

export default Home;
