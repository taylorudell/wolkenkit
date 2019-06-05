import Bar from './Bar/index.jsx';
import React from 'react';
import { withStyles } from 'thenativeweb-ux';

const styles = Bar.extendStyle(theme => ({
  Bar: {
    background: theme.color.brand.dark,
    borderBottom: 0,
    borderTop: '1px solid rgba(255,255,255, 0.1)',
    justifyContent: 'center'
  }
}));

const BarBottom = ({ children, classes, className = '', style }) => (
  <Bar className={ `${classes.Bar} ${className}` } style={ style }>
    { children }
  </Bar>
);

export default withStyles(styles)(BarBottom);
