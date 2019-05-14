import axios from 'axios';
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
import theme from '../theme/docs';
import { ThemeProvider } from 'thenativeweb-ux';

class Home extends React.Component {
  static async getInitialProps ({ asPath }) {
    const activePath = asPath.split('/').filter(item => item);
    const activeVersion = page.getVersion({ path: activePath });

    const metdataResponse = await axios.get('http://localhost:3000/api/v2/metadata');
    const pageContentResponse = await axios.get(`http://localhost:3000/api/v2/page/${asPath}`);

    return {
      activePath,
      activeVersion,
      metadata: metdataResponse.data,
      pageContent: pageContentResponse.data
    };
  }

  constructor (props) {
    super(props);

    this.handleMobileNavigationClick = this.handleMobileNavigationClick.bind(this);

    this.state = {
      activePath: props.activePath,
      activeVersion: props.activeVersion,
      pageContent: props.pageContent,
      pageInfo: props.pageInfo,
      showMobileNav: false
    };
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
      metadata
    } = this.props;

    const pageInfo = page.getInfo({ metadata, path: activePath });

    const isRootPath = activePath.length <= 1;

    const componentClasses = classNames({
      'wk-mobile--nav-visible': showMobileNav
    });

    return (
      <ThemeProvider theme={ theme }>
        <Page className={ componentClasses }>
          <Head>
            <title>{ metadata.name }</title>
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
            onLogoClick={ this.handleLogoClick }
            onPageClick={ this.handlePageClick }
            onVersionChange={ this.handleVersionChange }
          />

          <PageContent
            activePath={ activePath }
            activeVersion={ activeVersion }
            content={ pageContent }
            isCollapsed={ isRootPath }
            info={ pageInfo }
            metadata={ metadata }
          />

          <MobileNavigation
            onClick={ this.handleMobileNavigationClick }
            isVisible={ showMobileNav }
          />
        </Page>
      </ThemeProvider>
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
