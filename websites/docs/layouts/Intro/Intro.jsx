import ActivePage from '../../services/ActivePage';
import Base from '../Base.jsx';
import IntroPage from '../../components/IntroPage.jsx';
import Metadata from '../../services/Metadata';
import React from 'react';
import search from '../../services/search';
import { withRouter } from 'next/router';

class Intro extends React.Component {
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

    return (
      <Base
        activePage={ activePage }
        metadata={ metadata }
      >
        <IntroPage
          metadata={ metadata }
          isCollapsed={ false }
        />
      </Base>
    );
  }
}

export default withRouter(Intro);
