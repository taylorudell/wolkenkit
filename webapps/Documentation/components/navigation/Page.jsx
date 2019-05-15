'use strict';

const classNames = require('classnames'),
      injectSheet = require('react-jss').default,
      PropTypes = require('prop-types'),
      React = require('react');

const Link = require('../Link.jsx'),
      pageService = require('../../services/page');

const styles = theme => ({
  Page: {
    'list-style-type': 'none',
    margin: 0,

    '& a, & a:visited': {
      position: 'relative',
      display: 'block',
      padding: [ theme.grid.stepSize * 0.5, theme.grid.stepSize, theme.grid.stepSize * 0.5, theme.grid.stepSize * 3.5 ],
      color: theme.color.brand.white,
      opacity: 0.5
    },

    '& a:hover, & a:focus': {
      opacity: 1,
      'text-decoration': 'none',
      'background-color': 'transparent'
    }
  },

  IsEmphasized: {
    '& a': {
      opacity: 1
    },

    '& a:hover': {
      color: theme.color.brand.highlight
    }
  },

  IsActive: {
    '& a:link, & a:hover, & a:visited': {
      opacity: 1,
      color: theme.color.brand.highlight,
      'font-weight': 600
    }
  }
});

class Page extends React.PureComponent {
  getPrettyUrl () {
    return `/${this.props.path.join('/')}/`;
  }

  getUrl () {
    const { version, section, chapter, page } = pageService.getComponents({ path: this.props.path });

    return `/index?version=${version}&section=${section}&chapter=${chapter}&page=${page}`;
  }

  render () {
    const { classes, isActive, isEmphasized, title } = this.props;

    const componentClasses = classNames(classes.Page, {
      [classes.IsActive]: isActive,
      [classes.IsEmphasized]: isEmphasized
    });

    return (
      <li className={ componentClasses }>
        <Link href={ this.getUrl() } as={ this.getPrettyUrl() }>{ title }</Link>
      </li>
    );
  }
}

Page.propTypes = {
  isActive: PropTypes.bool.isRequired,
  isEmphasized: PropTypes.bool.isRequired,
  path: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};

module.exports = injectSheet(styles)(Page);
