import ActivePage from '../services/ActivePage';
import Head from '../components/Head';
import Metadata from '../services/Metadata';
import MobileNavigation from '../components/MobileNavigation.jsx';
import Navigation from '../components/navigation/Navigation.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import Symbols from '../components/Symbols.jsx';
import { Application, classNames, View, withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  '@global': {
    body: {
      color: theme.color.brand.dark,
      lineHeight: '1.42857143',
      fontFamily: theme.font.family.default,
      fontWeight: 400
    },

    html: {
      '-webkit-font-smoothing': 'antialiased',
      'font-smoothing': 'antialiased',
      'text-shadow': '1px 1px 1px rgba(0,0,0,0.004)'
    },

    'html, body': {
      overflow: 'hidden'
    },

    '*': {
      'box-sizing': 'border-box'
    },

    'ul, ol': {
      margin: 0
    },

    'a, a:visited, a:active': {
      color: theme.color.brand.highlight,
      textDecoration: 'none'
    },

    table: {
      'border-collapse': 'collapse',
      'border-spacing': 0,

      '& th': {
        textAlign: 'left'
      }
    }
  },

  Base: {
    position: 'absolute !important',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});

const Base = function ({ activePage, classes, className, children, metadata }) {
  const [ showMobileNav, toggleMobileNav ] = React.useState(false);

  const componentClasses = classNames(classes.Base, {
    'wk-mobile--nav-visible': showMobileNav
  }, className);

  return (
    <View orientation='horizontal' className={ componentClasses }>
      <Head>
        <title>{ metadata.title }</title>
      </Head>
      <Application.Services />
      <Symbols />

      <Navigation
        isVisibleOnMobile={ showMobileNav }
        activePage={ activePage }
        metadata={ metadata }
        showLogo={ activePage.isContentPage() }
      />

      { children }

      <MobileNavigation
        onClick={ () => toggleMobileNav(!showMobileNav) }
        isVisible={ showMobileNav }
      />
    </View>
  );
};

Base.propTypes = {
  activePage: PropTypes.instanceOf(ActivePage).isRequired,
  metadata: PropTypes.instanceOf(Metadata).isRequired
};

export default withStyles(styles)(Base);
