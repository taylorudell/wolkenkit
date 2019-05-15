'use strict';

const classNames = require('classnames'),
      injectSheet = require('react-jss').default,
      PropTypes = require('prop-types'),
      React = require('react');

const Breadcrumbs = require('../Breadcrumbs.jsx'),
      Head = require('../Head.jsx'),
      Markdown = require('../Markdown.jsx'),
      PageFooter = require('../PageFooter.jsx'),
      styles = require('./styles');

class PageContent extends React.Component {
  constructor (props) {
    super(props);

    this.saveContainerRef = this.saveContainerRef.bind(this);
  }

  componentDidMount () {
    const anchor = global.location.hash;

    if (anchor) {
      const anchorElement = global.document.querySelector(anchor);

      if (anchorElement && this.container) {
        this.container.scrollTop = anchorElement.offsetTop;
      }
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.content !== this.props.content && this.container) {
      this.container.scrollTop = 0;
    }
  }

  saveContainerRef (ref) {
    this.container = ref;
  }

  render () {
    const {
      activePath,
      activeVersion,
      breadcrumbs,
      classes,
      content,
      isCollapsed,
      metadata,
      title
    } = this.props;

    let pageTitle = `${activeVersion} | ${metadata.name}`;

    if (title) {
      const breadcrumbsForTitle = breadcrumbs.slice().reverse().join(' | ');

      pageTitle = `${breadcrumbsForTitle} | ${pageTitle}`;
    }

    const componentClasses = classNames(classes.PageContent, {
      [classes.IsCollapsed]: isCollapsed
    });

    return (
      <div ref={ this.saveContainerRef } className={ componentClasses }>
        <Head>
          <title>{ pageTitle }</title>
        </Head>

        <Breadcrumbs breadcrumbs={ breadcrumbs } />

        <Markdown
          className={ classes.Page }
          content={ content }
        />

        <PageFooter
          activePath={ activePath }
          activeVersion={ activeVersion }
        />
      </div>
    );
  }
}

PageContent.propTypes = {
  activePath: PropTypes.array.isRequired,
  activeVersion: PropTypes.string.isRequired,
  metadata: PropTypes.object.isRequired,
  content: PropTypes.string,
  title: PropTypes.string,
  breadcrumbs: PropTypes.array
};

module.exports = injectSheet(styles)(PageContent);
