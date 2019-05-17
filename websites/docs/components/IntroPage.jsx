'use strict';

const classNames = require('classnames'),
      injectSheet = require('react-jss').default,
      PropTypes = require('prop-types'),
      React = require('react'),
      { Product, View } = require('thenativeweb-ux');

const Feed = require('./Feed.jsx'),
      Metadata = require('../services/Metadata');

const styles = theme => ({
  IntroPage: {
    flex: theme.contentFlex,
    width: theme.contentWidth,
    overflow: 'hidden',
    transition: 'width 800ms cubic-bezier(0.190, 1.000, 0.220, 1.000)',
    'will-change': 'width'
  },

  IsCollapsed: {
    flex: '0 0 auto',
    width: '0px',

    '& $Brand': {
      opacity: 0
    }
  },

  Brand: {
    transition: 'opacity 400ms',
    'will-change': 'opacity'
  },

  Title: {
    'font-size': theme.font.size.large,
    'text-align': 'center',
    color: theme.color.brand.white
  },

  [theme.device.small]: {
    IntroPage: {
      'flex-direction': 'column',
      overflow: 'auto',
      '-webkit-overflow-scrolling': 'touch'
    },

    Brand: {
      flex: '0 0 40vh',
      height: '40vh'
    },

    Title: {
      'font-size': theme.font.size.small,
      'text-align': 'center',
      color: theme.color.brand.white
    }
  }
});

const IntroPage = ({ classes, metadata, isCollapsed }) => {
  const componentClasses = classNames(classes.IntroPage, {
    [classes.IsCollapsed]: isCollapsed
  });

  return (
    <View orientation='horizontal' background='dark' className={ componentClasses }>
      <Feed items={ metadata.news } />

      <View className={ classes.Brand } orientation='vertical' alignItems='center' justifyContent='center' adjust='flex'>
        <Product name='wolkenkit' isAnimated={ !isCollapsed } size='xl' />
        <div className={ classes.Title }>Documentation</div>
      </View>
    </View>
  );
};

IntroPage.propTypes = {
  metadata: PropTypes.instanceOf(Metadata).isRequired
};

module.exports = injectSheet(styles)(IntroPage);
