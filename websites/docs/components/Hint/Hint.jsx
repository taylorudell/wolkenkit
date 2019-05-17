'use strict';

const classNames = require('classnames'),
      injectSheet = require('react-jss').default,
      PropTypes = require('prop-types'),
      React = require('react');

const styles = theme => ({
  Hint: {
    position: 'relative',
    'max-width': theme.pageContent.maxWidth,
    'margin-top': theme.grid.stepSize * 6,
    'margin-bottom': theme.grid.stepSize * 6,

    '& blockquote': {
      'border-left': 'none',
      'margin-left': '224px',
      'border-radius': theme.grid.stepSize,

      '& strong': {
        'font-family': 'Kalam',
        'font-size': '24px',
        'letter-spacing': '0.5px'
      }
    },
    '& blockquote:after': {
      position: 'absolute',
      'border-color': `transparent ${theme.color.panel.light} transparent transparent`,
      'border-style': 'solid',
      'border-width': theme.grid.stepSize,
      top: '50%',
      content: '""',
      left: 0,
      'margin-left': '205px',
      'margin-top': theme.grid.stepSize / -2
    },

    '&::after': {
      position: 'absolute',
      width: '200px',
      height: '200px',
      left: '10px',
      top: '50%',
      'margin-top': '-100px',
      content: '""',
      'background-repeat': 'no-repeat'
    }
  },

  TypeCongrats: {
    '&::after': {
      'background-image': `url('/static/mascot/congrats-medium.svg')`
    }
  },
  TypeQuestion: {
    '&::after': {
      'background-image': `url('/static/mascot/question-medium.svg')`
    }
  },
  TypeTip: {
    '&::after': {
      'background-image': `url('/static/mascot/tip-medium.svg')`
    }
  },
  TypeWarning: {
    '&::after': {
      'background-image': `url('/static/mascot/warning-medium.svg')`
    }
  },
  TypeWisdom: {
    '&::after': {
      'background-image': `url('/static/mascot/wisdom-medium.svg')`
    }
  }
});

const Hint = ({ children, classes, className = '', style, type }) => {
  const componentClasses = classNames(classes.Hint, {
    [classes.TypeCongrats]: type === 'congrats',
    [classes.TypeQuestion]: type === 'question',
    [classes.TypeTip]: type === 'tip',
    [classes.TypeWarning]: type === 'warning',
    [classes.TypeWisdom]: type === 'wisdom'
  }, className);

  return (
    <div className={ componentClasses } style={ style }>
      { children }
    </div>
  );
};

Hint.propTypes = {
  type: PropTypes.oneOf([ 'congrats', 'question', 'tip', 'warning', 'wisdom' ])
};

module.exports = injectSheet(styles)(Hint);
