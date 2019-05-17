import ActivePage from '../../services/ActivePage';
import Base from '../Base.jsx';
import { MDXProvider } from '@mdx-js/react';
import Metadata from '../../services/Metadata';
import PageContent from '../../components/PageContent';
import React from 'react';
import search from '../../services/search';
import { withRouter } from 'next/router';

const mdxComponents = {};

class Documentation extends React.Component {
  constructor (props) {
    super(props);

    const { router } = props;

    const metadata = new Metadata();
    const activePage = new ActivePage({
      metadata,
      path: router.asPath
    });

    this.state = {
      metadata,
      activePage
    };
  }

  componentDidMount () {
    const { metadata } = this.state;

    search.initialize({ metadata });
  }

  render () {
    const {
      activePage,
      metadata
    } = this.state;

    const { children } = this.props;

    return (
      <Base
        activePage={ activePage }
        metadata={ metadata }
      >
        <PageContent
          activePage={ activePage }
          metadata={ metadata }
          isCollapsed={ false }
        >
          <MDXProvider components={ mdxComponents }>
            { children }
          </MDXProvider>
        </PageContent>
      </Base>
    );
  }
}

export default withRouter(Documentation);
