'use strict';

const PropTypes = require('prop-types'),
      React = require('react'),
      Router = require('next/router').default,
      { Product } = require('thenativeweb-ux');

const Bar = require('../Bar/index.jsx'),
      Dropdown = require('../Dropdown.jsx'),
      Link = require('../Link.jsx');

class VersionBar extends React.PureComponent {
  static handleVersionChanged (newVersion) {
    Router.push(`/index?version=${newVersion}`, `/${newVersion}/`);
  }

  renderLogo () {
    const { activeVersion, showLogo } = this.props;

    if (!showLogo) {
      return null;
    }

    return (
      <Link
        href={ `/index?version=${activeVersion}` }
        as={ `/${activeVersion}/` }
      >
        <Product name='wolkenkit' type='typo-only' size='l' />
      </Link>
    );
  }

  render () {
    const { activeVersion, versions } = this.props;

    return (
      <Bar>
        <Bar.Left>
          {this.renderLogo()}
        </Bar.Left>
        <Bar.Right>
          <Dropdown
            options={ versions }
            selected={ activeVersion }
            onChange={ VersionBar.handleVersionChanged }
          />
        </Bar.Right>
      </Bar>
    );
  }
}

VersionBar.propTypes = {
  activeVersion: PropTypes.string.isRequired,
  versions: PropTypes.array.isRequired
};

module.exports = VersionBar;
