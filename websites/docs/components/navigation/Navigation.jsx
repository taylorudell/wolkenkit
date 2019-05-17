'use strict';

const classNames = require('classnames'),
      injectSheet = require('react-jss').default,
      isEqual = require('lodash/isEqual'),
      PropTypes = require('prop-types'),
      React = require('react'),
      { Icon, Brand } = require('thenativeweb-ux');

const ActivePage = require('../../services/ActivePage'),
      BarBottom = require('../BarBottom.jsx'),
      MenuBar = require('./MenuBar.jsx'),
      Metadata = require('../../services/Metadata'),
      PageMenu = require('./PageMenu.jsx'),
      Search = require('./Search.jsx'),
      VersionBar = require('./VersionBar.jsx');

const styles = theme => ({
  Navigation: {
    position: 'relative',
    flex: theme.sidebarFlex,
    width: theme.sidebarWidth,
    height: '100%',
    display: 'flex',
    'flex-direction': 'column',
    'background-color': theme.color.brand.dark,
    overflow: 'hidden'
  },

  Content: {
    display: 'flex',
    flex: '1 1 100%',
    'flex-direction': 'column',
    'z-index': theme.zIndex.navigation + 1,
    position: 'relative'
  },

  Pattern: {
    'z-index': theme.zIndex.pattern
  },

  Mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '498px',
    'background-image': 'url("/static/pattern/background-overlay.png")',
    'background-repeat': 'repeat-x',
    'background-size': '1px 498px',
    'z-index': theme.zIndex.pattern + 1
  },

  SocialBar: {
    '& a': {
      display: 'flex',
      'margin-right': theme.grid.stepSize * 3
    },

    '& a:last-child': {
      'margin-right': 0
    }
  },

  SocialIcon: {
    width: 22,
    height: 22,
    fill: 'currentColor'
  },

  [theme.device.small]: {
    Navigation: {
      position: 'fixed',
      top: 0,
      left: 0,
      'pointer-events': 'none',
      'z-index': theme.zIndex.navigation,
      flex: theme.sidebarFlexMobile,
      width: theme.sidebarWidthMobile,
      transform: `translate(-30%,0)`,
      transition: 'transform 500ms cubic-bezier(0.190, 1.000, 0.220, 1.000), opacity 400ms cubic-bezier(0.190, 1.000, 0.220, 1.000)',
      'will-change': 'transform',
      opacity: 0
    },

    IsVisibleOnMobile: {
      'pointer-events': 'auto',
      transform: 'translate(0,0)',
      opacity: 1
    }
  }
});

class Navigation extends React.Component {
  static getDerivedStateFromProps (props, state) {
    if (!isEqual(state.previousActivePath, props.activePage.path)) {
      return {
        previousActivePath: props.activePage.path,
        activePath: props.activePage.path,
        expandedPath: props.activePage.path
      };
    }

    return null;
  }

  constructor (props) {
    super(props);

    this.state = {
      showSearch: false
    };

    this.handleNavigate = this.handleNavigate.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleShowSearch = this.handleShowSearch.bind(this);
    this.handleSearchClose = this.handleSearchClose.bind(this);
  }

  handleNavigate (newPath) {
    this.setState({
      expandedPath: newPath
    });
  }

  handleBack () {
    const { activePage } = this.props;

    this.setState({
      expandedPath: [ activePage.language, activePage.version ]
    });
  }

  handleShowSearch () {
    this.setState({
      showSearch: true
    });
  }

  handleSearchClose () {
    this.setState({
      showSearch: false
    });
  }

  render () {
    const {
      activePage,
      classes,
      isVisibleOnMobile,
      metadata,
      showLogo
    } = this.props;

    const {
      expandedPath,
      showSearch
    } = this.state;

    const expandedBreadcrumbs = activePage.getBreadcrumbs({ path: expandedPath });

    const componentClasses = classNames(classes.Navigation, {
      [classes.IsVisibleOnMobile]: isVisibleOnMobile
    });

    return (
      <div className={ componentClasses }>
        <Brand.Pattern className={ classes.Pattern } />

        <div className={ classes.Mask } />

        <div className={ classes.Content }>
          <VersionBar
            activePage={ activePage }
            metadata={ metadata }
            showLogo={ showLogo }
          />

          <MenuBar
            backLabel={ expandedBreadcrumbs && expandedBreadcrumbs[0] }
            onBack={ this.handleBack }
            onShowSearch={ this.handleShowSearch }
          />

          <PageMenu
            activePage={ activePage }
            expandedPath={ expandedPath }
            metadata={ metadata }
            onNavigate={ this.handleNavigate }
          />

          <BarBottom className={ classes.SocialBar }>
            <a href='https://github.com/thenativeweb/wolkenkit' target='_blank' rel='noopener noreferrer'>
              <Icon className={ classes.SocialIcon } name='github' />
            </a>
            <a href='http://slackin.wolkenkit.io' target='_blank' rel='noopener noreferrer'>
              <Icon className={ classes.SocialIcon } name='slack' />
            </a>
            <a href='http://stackoverflow.com/questions/tagged/wolkenkit' target='_blank' rel='noopener noreferrer'>
              <Icon className={ classes.SocialIcon } name='stackoverflow' />
            </a>
          </BarBottom>

          { showSearch ? <Search version={ activePage.version } onClose={ this.handleSearchClose } /> : null }
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  activePage: PropTypes.instanceOf(ActivePage).isRequired,
  isVisibleOnMobile: PropTypes.bool.isRequired,
  metadata: PropTypes.instanceOf(Metadata).isRequired,
  showLogo: PropTypes.bool.isRequired
};

module.exports = injectSheet(styles)(Navigation);
