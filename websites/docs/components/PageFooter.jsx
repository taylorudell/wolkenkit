import ActivePage from '../services/ActivePage';
import PropTypes from 'prop-types';
import React from 'react';
import { Brand, withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  PageFooter: {
    margin: [ theme.space(4), 0, 0, 0 ],
    padding: [ theme.space(4), theme.space(6) ],
    fontSize: theme.font.size.md,
    fontWeight: 300,

    '& a': {
      fontWeight: 400
    }
  },

  About: {
    borderTop: `1px solid ${theme.color.content.border}`,
    padding: [ theme.space(4), 0, 0, 0 ],
    textAlign: 'center',

    '& p': {
      margin: 0
    }
  },

  Copyright: {
    textAlign: 'center',
    padding: 0,

    '& p': {
      margin: 0
    }
  },

  [theme.device.small]: {
    PageFooter: {
      margin: 0,
      paddingRight: theme.space(2)
    },

    Copyright: {
      marginTop: theme.space(2)
    }
  }
});

const PageFooter = function ({ classes, activePage }) {
  const editThisPageUrl = `https://github.com/thenativeweb/wolkenkit/edit/master/websites/docs/${activePage.path.join('/')}/index.md`;

  return (
    <footer className={ classes.PageFooter }>
      <div className={ classes.About }>
        <Brand.MadeBy size='md' color='light' />
        <p>
          Found a bug? Missing something? Want to contribute? Just <a href={ editThisPageUrl }>edit this page</a>.
        </p>
      </div>
      <div className={ classes.Copyright }>
        <p>
          © Copyright 2016-2018 the native web GmbH. All rights reserved.
        </p>
        <p>
          <a href={ `/${activePage.version}/legal/imprint/` }>Imprint</a>
        </p>
      </div>
    </footer>
  );
};

PageFooter.propTypes = {
  activePage: PropTypes.instanceOf(ActivePage).isRequired
};

export default withStyles(styles)(PageFooter);
