'use strict';

const injectSheet = require('react-jss').default,
      PropTypes = require('prop-types'),
      React = require('react');

const ActivePage = require('../../services/ActivePage'),
      Chapter = require('./Chapter.jsx'),
      Metadata = require('../../services/Metadata'),
      Page = require('./Page.jsx'),
      Section = require('./Section.jsx');

const styles = theme => ({
  PageMenu: {
    flex: '1 1 100%',
    display: 'flex',
    'flex-direction': 'column',
    overflow: 'hidden',
    position: 'relative'
  },

  Levels: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    'flex-direction': 'row',
    transform: 'translate(0, 0)',
    transition: 'transform 500ms cubic-bezier(0.075, 0.820, 0.165, 1.000)',
    'will-change': 'transform'
  },

  Level: {
    flex: '0 0 auto',
    height: '100%',
    overflow: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    width: theme.sidebarWidth
  },

  [theme.device.small]: {
    Level: {
      width: theme.sidebarWidthMobile
    }
  }
});

class PageMenu extends React.Component {
  static renderTopLevel ({ activePage, metadata, onNavigate }) {
    if (!activePage) {
      throw new Error('Active page is missing.');
    }
    if (!metadata) {
      throw new Error('Metadata is missing.');
    }

    return metadata.navigation[activePage.version].map(
      section => {
        const sectionPath = [ activePage.language, activePage.version, section.slug ];

        return (
          <Section
            key={ section.slug }
            isActive={ activePage.section === section.slug }
            title={ section.title }
            path={ sectionPath }
            onClick={ onNavigate }
          />
        );
      }
    );
  }

  static renderSecondLevel ({ activePage, expandedPath, metadata, onNavigate }) {
    if (!activePage) {
      throw new Error('Active page is missing.');
    }
    if (!metadata) {
      throw new Error('Metadata is missing.');
    }

    if (expandedPath.length < 2) {
      return null;
    }

    const [ , , expandedSectionSlug, expandedChapterSlug ] = expandedPath;

    const expandedSection = metadata.navigation[activePage.version].find(item => item.slug === expandedSectionSlug);

    if (!expandedSection || !expandedSection.children) {
      return null;
    }

    return expandedSection.children.map(
      chapter => {
        const itemPath = [ activePage.language, activePage.version, expandedSectionSlug, chapter.slug ];

        if (!chapter.children) {
          return (
            <Page
              key={ chapter.slug }
              isActive={ activePage.path.join('/') === itemPath.join('/') }
              title={ chapter.title }
              path={ itemPath }
            />
          );
        }

        return (
          <Chapter
            key={ chapter.slug }
            activePath={ activePage.path }
            isExpanded={ expandedChapterSlug === chapter.slug }
            isActive={ activePage.path.join('/').startsWith(itemPath.join('/')) }
            path={ itemPath }
            title={ chapter.title }
            pages={ chapter.children }
            onClick={ onNavigate }
          />
        );
      }
    );
  }

  render () {
    const {
      activePage,
      classes,
      expandedPath,
      metadata,
      onNavigate
    } = this.props;

    let levelsStyle = {
      transform: `translate(0, 0)`
    };

    if (expandedPath.length > 2) {
      levelsStyle = {
        transform: `translate(-50%, 0)`
      };
    }

    return (
      <div className={ classes.PageMenu }>
        <div className={ classes.Levels } style={ levelsStyle }>
          <div className={ classes.Level }>
            {
              PageMenu.renderTopLevel({
                activePage,
                metadata,
                onNavigate
              })
            }
          </div>
          <div className={ classes.Level }>
            {
              PageMenu.renderSecondLevel({
                activePage,
                metadata,
                expandedPath,
                onNavigate
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

PageMenu.propTypes = {
  activePage: PropTypes.instanceOf(ActivePage).isRequired,
  expandedPath: PropTypes.array.isRequired,
  metadata: PropTypes.instanceOf(Metadata).isRequired,
  onNavigate: PropTypes.func.isRequired
};

module.exports = injectSheet(styles)(PageMenu);
