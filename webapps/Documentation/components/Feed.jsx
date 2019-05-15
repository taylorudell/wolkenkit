'use strict';

const injectSheet = require('react-jss').default,
      PropTypes = require('prop-types'),
      React = require('react');

const api = require('../services/api'),
      Bar = require('./Bar/index.jsx'),
      FeedFallback = require('./FeedFallback.jsx'),
      FeedItem = require('./FeedItem.jsx'),
      LoadingIndicator = require('./LoadingIndicator.jsx');

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
  static renderItems ({ classes, feed, isLoading }) {
    if (isLoading) {
      return <LoadingIndicator className={ classes.LoadingIndicator } />;
    }

    if (!feed) {
      return <FeedFallback />;
    }

    return feed.map(item => <FeedItem key={ `${item.date.year}${item.date.month}${item.date.day}${item.title}` } item={ item } />);
  }

  constructor () {
    super();

    this.state = {
      isLoading: true,
      feed: undefined
    };
  }

  async componentDidMount () {
    const { path } = this.props;

    try {
      const feed = await api.get({ path, avoidCache: true });

      this.setState({
        feed
      });
    } catch (ex) {
      // Left blank intentionally
    } finally {
      this.setState({
        isLoading: false
      });
    }
  }

  render () {
    const { classes } = this.props;
    const { feed, isLoading } = this.state;

    return (
      <div className={ classes.Feed }>
        <Bar className={ classes.PlaceholderBar } />
        <Bar><div className={ classes.Title }>News</div></Bar>
        <div className={ classes.Items }>
          { Feed.renderItems({ classes, feed, isLoading }) }
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
  path: PropTypes.string.isRequired
};

module.exports = injectSheet(styles)(Feed);
