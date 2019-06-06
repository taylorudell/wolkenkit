import ActivePage from '../services/ActivePage';
import Metadata from '../services/Metadata';
import PropTypes from 'prop-types';
import React from 'react';
import { Application, classNames, withStyles } from 'thenativeweb-ux';
import { Head, Icons, Navigation } from '../components';

const styles = theme => ({
  '@global': {
    body: {
      color: theme.color.brand.dark,
      lineHeight: '1.45',
      fontFamily: theme.font.family.default,
      fontWeight: 400
    },

    'html, body': {
      overflow: 'hidden'
    },

    '*': {
      'box-sizing': 'border-box'
    },

    'ul, ol': {
      margin: 0
    },

    'a, a:visited, a:active': {
      color: theme.color.brand.highlight,
      textDecoration: 'none'
    },

    table: {
      'border-collapse': 'collapse',
      'border-spacing': 0,

      '& th': {
        textAlign: 'left'
      }
    }
  },

  Base: {
    position: 'absolute !important',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});

const Base = function ({ activePage, classes, className, children, metadata }) {
  const componentClasses = classNames(classes.Base, className);

  return (
    <Application orientation='horizontal' className={ componentClasses }>
      <Head>
        <title>{ metadata.title }</title>
      </Head>
      <Application.Services />

      <Icons />

      <Navigation
        activePage={ activePage }
        metadata={ metadata }
      />

      { children }
    </Application>
  );
};

Base.propTypes = {
  activePage: PropTypes.instanceOf(ActivePage).isRequired,
  metadata: PropTypes.instanceOf(Metadata).isRequired
};

export default withStyles(styles)(Base);
