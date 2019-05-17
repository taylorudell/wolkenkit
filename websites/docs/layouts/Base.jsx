const classNames = require('classnames'),
      injectSheet = require('react-jss').default,
      PropTypes = require('prop-types'),
      React = require('react'),
      { Application, View } = require('thenativeweb-ux');

const ActivePage = require('../services/ActivePage'),
      Head = require('../components/Head.jsx'),
      Metadata = require('../services/Metadata'),
      MobileNavigation = require('../components/MobileNavigation.jsx'),
      Navigation = require('../components/navigation/Navigation.jsx'),
      Symbols = require('../components/Symbols.jsx');

const styles = theme => ({
  '@global': {
    body: {
      color: theme.color.brand.dark,
      'line-height': '1.42857143',
      'font-family': theme.font.family.default,
      'font-weight': 400
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
      'text-decoration': 'none'
    },

    table: {
      'border-collapse': 'collapse',
      'border-spacing': 0,

      '& th': {
        'text-align': 'left'
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

module.exports = injectSheet(styles)(Base);
