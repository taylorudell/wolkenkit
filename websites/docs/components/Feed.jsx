'use strict';

const injectSheet = require('react-jss').default,
      PropTypes = require('prop-types'),
      React = require('react');

const Bar = require('./Bar/index.jsx'),
      FeedFallback = require('./FeedFallback.jsx'),
      FeedItem = require('./FeedItem.jsx');

const styles = theme => ({
  Feed: {
    display: 'flex',
    'flex-direction': 'column',
    overflow: 'hidden',
    background: theme.color.panel.dark,
    width: '37.5vw'
  },

  PlaceholderBar: {},

  Title: {
    padding: [ 0, theme.grid.stepSize * 3, 0, theme.grid.stepSize * 3 ],
    'font-weight': 600
  },

  Items: {
    flex: '1 1 100%',
    overflow: 'auto',
    '-webkit-overflow-scrolling': 'touch'
  },

  LoadingIndicator: {
    padding: [ 0, theme.grid.stepSize * 3.5 ]
  },

  [theme.device.small]: {
    Feed: {
      overflow: 'visible',
      flex: '1 1 auto',
      width: '100%',
      display: 'block'
    },

    PlaceholderBar: {
      display: 'none'
    },

    Title: {
      padding: theme.grid.stepSize * 1.5
    }
  }
});

class Feed extends React.PureComponent {
  static renderItems ({ items }) {
    if (!items) {
      return <FeedFallback />;
    }

    return items.map(item => <FeedItem key={ `${item.date.year}${item.date.month}${item.date.day}${item.title}` } item={ item } />);
  }

  render () {
    const { classes, items } = this.props;

    return (
      <div className={ classes.Feed }>
        <Bar className={ classes.PlaceholderBar } />
        <Bar><div className={ classes.Title }>News</div></Bar>
        <div className={ classes.Items }>
          { Feed.renderItems({ classes, items }) }
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
  items: PropTypes.array.isRequired
};

module.exports = injectSheet(styles)(Feed);
