import ActivePage from '../../services/ActivePage';
import Metadata from '../../services/Metadata';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles';
import { Breadcrumbs, Head, PageFooter } from '..';
import { classNames, withStyles } from 'thenativeweb-ux';

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
    const { container } = this;
    const { content } = this.props;

    if (prevProps.content !== content && container) {
      container.scrollTop = 0;
    }
  }

  saveContainerRef (ref) {
    this.container = ref;
  }

  render () {
    const {
      activePage,
      children,
      classes,
      isCollapsed,
      metadata
    } = this.props;

    let pageTitle = `${activePage.version} | ${metadata.title}`;

    const breadcrumbsForTitle = activePage.breadcrumbs.slice().reverse().join(' | ');

    pageTitle = `${breadcrumbsForTitle} | ${pageTitle}`;

    const componentClasses = classNames(classes.PageContent, {
      [classes.IsCollapsed]: isCollapsed
    });

    return (
      <div ref={ this.saveContainerRef } className={ componentClasses }>
        <Head>
          <title>{ pageTitle }</title>
        </Head>

        <Breadcrumbs breadcrumbs={ activePage.breadcrumbs } />

        <article
          className={ classes.Article }
        >
          { children }
        </article>

        <PageFooter
          activePage={ activePage }
        />
      </div>
    );
  }
}

PageContent.propTypes = {
  activePage: PropTypes.instanceOf(ActivePage).isRequired,
  metadata: PropTypes.instanceOf(Metadata).isRequired
};

export default withStyles(styles)(PageContent);
