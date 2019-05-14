'use strict';

const classNames = require('classnames'),
      injectSheet = require('react-jss').default,
      React = require('react'),
      { Application, View } = require('thenativeweb-ux');

const Symbols = require('../components/Symbols.jsx');

const styles = theme => ({
  '@global': {
    body: {
      color: theme.color.brand.dark,
      'line-height': '1.42857143',
      'font-family': theme.font.family.default,
      'font-weight': 400
    },

    html: {
      '-webkit-font-smoothing': 'antialiased',
      'font-smoothing': 'antialiased',
      'text-shadow': '1px 1px 1px rgba(0,0,0,0.004)'
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
      'text-decoration': 'none'
    },

    table: {
      'border-collapse': 'collapse',
      'border-spacing': 0,

      '& th': {
        'text-align': 'left'
      }
    }
  },

  Page: {
    position: 'absolute !important',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});

const Page = function ({ classes, className, children }) {
  const componentClasses = classNames(classes.Page, className);

  return (
    <View orientation='horizontal' className={ componentClasses }>
      <Application.Services />
      <Symbols />

      { children }
    </View>
  );
};

module.exports = injectSheet(styles)(Page);
