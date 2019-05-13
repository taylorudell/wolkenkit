import axios from 'axios';
import classNames from 'classnames';
import Head from '../components/Head.jsx';
import injectSheet from 'react-jss';
import IntroPage from '../components/IntroPage.jsx';
import MobileNavigation from '../components/MobileNavigation.jsx';
import Navigation from '../components/navigation/Navigation.jsx';
import page from '../services/page';
import PageContent from '../components/PageContent/index.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles';
import Symbols from '../components/Symbols.jsx';
import { Application, View } from 'thenativeweb-ux';

class Docs extends React.Component {
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

  handlePageClick (path) {
    const { history } = this.props;

    this.setState({
      showMobileNav: false
    });

    history.push(path);
  }

  handleLogoClick () {
    const { history } = this.props;
    const { activeVersion } = this.state;

    this.setState({
      showMobileNav: false
    });

    history.push(`/${activeVersion}/`);
  }

  handleVersionChange (newVersion) {
    const { history } = this.props;

    history.push(`/${newVersion}/`);
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
      classes,
      metadata
    } = this.props;

    const pageInfo = page.getInfo({ metadata, path: activePath });

    const isRootPath = activePath.length <= 1;

    const componentClasses = classNames(classes.Docs, {
      'wk-mobile--nav-visible': showMobileNav
    });

    return (
      <View orientation='horizontal' className={ componentClasses }>
        <Application.Services />
        <Symbols />

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
      </View>
    );
  }
}

Docs.propTypes = {
  activePath: PropTypes.array.isRequired,
  activeVersion: PropTypes.string.isRequired,
  metadata: PropTypes.object.isRequired,
  pageContent: PropTypes.string,
  pageInfo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

export default injectSheet(styles)(Docs);
