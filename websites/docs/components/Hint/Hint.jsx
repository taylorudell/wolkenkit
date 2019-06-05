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
      backgroundRepeat: 'no-repeat'
    }
  },

  Bubble: {
    ...getBlockquoteBaseStyle(theme),
    marginLeft: `${theme.space(28)}px`,
    borderRadius: theme.space(1),

    '& strong': {
      fontFamily: 'Kalam',
      fontSize: '24px',
      'letter-spacing': '0.5px'
    },

    '&:after': {
      position: 'absolute',
      'border-color': `transparent ${theme.color.panel.light} transparent transparent`,
      'border-style': 'solid',
      'border-width': theme.space(1),
      top: '50%',
      content: '""',
      left: 0,
      marginLeft: '205px',
      marginTop: '-10px'
    }
  },

  TypeCongrats: {
    '&::after': {
      backgroundImage: 'url(/static/mascot/congrats-medium.svg)'
    }
  },
  TypeQuestion: {
    '&::after': {
      backgroundImage: 'url(/static/mascot/question-medium.svg)'
    }
  },
  TypeTip: {
    '&::after': {
      backgroundImage: 'url(/static/mascot/tip-medium.svg)'
    }
  },
  TypeWarning: {
    '&::after': {
      backgroundImage: 'url(/static/mascot/warning-medium.svg)'
    }
  },
  TypeWisdom: {
    '&::after': {
      backgroundImage: 'url(/static/mascot/wisdom-medium.svg)'
    }
  },

  [theme.breakpoints.down('sm')]: {
    Hint: {
      '&:after': {
        left: '50%',
        top: -170,
        marginLeft: -theme.space(10),
        marginTop: 0,
        width: theme.space(20),
        height: theme.space(20)
      }
    },
    Bubble: {
      padding: theme.space(2),
      marginTop: 180,
      marginLeft: 0,

      '&::after': {
        top: 0,
        left: '50%',
        marginTop: -theme.space(2.5),
        marginLeft: -theme.space(1),
        borderColor: `transparent transparent ${theme.color.panel.light} transparent`
      }
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
