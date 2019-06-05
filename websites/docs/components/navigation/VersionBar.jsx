import ActivePage from '../../services/ActivePage';
import Bar from '../Bar/index.jsx';
import Dropdown from '../Dropdown.jsx';
import Link from '../Link.jsx';
import Metadata from '../../services/Metadata';
import { Product } from 'thenativeweb-ux';
import PropTypes from 'prop-types';
import React from 'react';
import Router from 'next/router';

class VersionBar extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleVersionChanged = this.handleVersionChanged.bind(this);
  }

  handleVersionChanged (newVersion) {
    const { activePage } = this.props;

    Router.push(`/${activePage.language}/${newVersion}`);
  }

  renderLogo () {
    const { activePage } = this.props;

    return (
      <Link
        href={ `/${activePage.language}/${activePage.version}` }
      >
        <Product name='wolkenkit' type='typo-only' size='lg' />
      </Link>
    );
  }

  render () {
    const { activePage, metadata } = this.props;

    return (
      <Bar>
        <Bar.Left>
          {this.renderLogo()}
        </Bar.Left>
        <Bar.Right>
          <Dropdown
            options={ Object.keys(metadata.versions) }
            selected={ activePage.version }
            onChange={ this.handleVersionChanged }
          />
        </Bar.Right>
      </Bar>
    );
  }
}

VersionBar.propTypes = {
  activePage: PropTypes.instanceOf(ActivePage).isRequired,
  metadata: PropTypes.instanceOf(Metadata).isRequired
};

export default VersionBar;
