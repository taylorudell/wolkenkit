import { getBaseStyle as getBlockquoteBaseStyle } from '../Blockquote/Blockquote.jsx';
import PropTypes from 'prop-types';
import React from 'react';
import { classNames, withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  Hint: {
    position: 'relative',
    maxWidth: theme.pageContent.maxWidth,
    marginTop: theme.space(8),
    marginBottom: theme.space(8),

    '&::after': {
      position: 'absolute',
      width: '200px',
      height: '200px',
      left: '10px',
      top: '50%',
      marginTop: '-120px',
      content: '""',
      'background-repeat': 'no-repeat'
    }
  },

  Bubble: {
    ...getBlockquoteBaseStyle(theme),
    marginLeft: `${theme.space(28)}px`,
    borderRadius: theme.grid.stepSize,

    '& strong': {
      fontFamily: 'Kalam',
      fontSize: '24px',
      'letter-spacing': '0.5px'
    },

    '&:after': {
      position: 'absolute',
      'border-color': `transparent ${theme.color.panel.light} transparent transparent`,
      'border-style': 'solid',
      'border-width': theme.grid.stepSize,
      top: '50%',
      content: '""',
      left: 0,
      marginLeft: '205px',
      marginTop: '-10px'
    }
  },

  TypeCongrats: {
    '&::after': {
      'background-image': 'url(/static/mascot/congrats-medium.svg)'
    }
  },
  TypeQuestion: {
    '&::after': {
      'background-image': 'url(/static/mascot/question-medium.svg)'
    }
  },
  TypeTip: {
    '&::after': {
      'background-image': 'url(/static/mascot/tip-medium.svg)'
    }
  },
  TypeWarning: {
    '&::after': {
      'background-image': 'url(/static/mascot/warning-medium.svg)'
    }
  },
  TypeWisdom: {
    '&::after': {
      'background-image': 'url(/static/mascot/wisdom-medium.svg)'
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
      <blockquote className={ classes.Bubble }>
        { children }
      </blockquote>
    </div>
  );
};

Hint.propTypes = {
  type: PropTypes.oneOf([ 'congrats', 'question', 'tip', 'warning', 'wisdom' ])
};

export default withStyles(styles)(Hint);
