'use strict';

const PropTypes = require('prop-types'),
      React = require('react'),
      Router = require('next/router').default,
      { Product } = require('thenativeweb-ux');

const ActivePage = require('../../services/ActivePage'),
      Bar = require('../Bar/index.jsx'),
      Dropdown = require('../Dropdown.jsx'),
      Link = require('../Link.jsx'),
      Metadata = require('../../services/Metadata');

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
    const { activePage, showLogo } = this.props;

    if (!showLogo) {
      return null;
    }

    return (
      <Link
        href={ `/${activePage.language}/${activePage.version}` }
      >
        <Product name='wolkenkit' type='typo-only' size='l' />
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

module.exports = VersionBar;
