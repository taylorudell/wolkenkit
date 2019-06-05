import ActivePage from '../../services/ActivePage';
import Base from '../Base.jsx';
import Metadata from '../../services/Metadata';
import React from 'react';
import search from '../../services/search';
import { withRouter } from 'next/router';
import { Product, View, withStyles } from 'thenativeweb-ux';

const styles = theme => ({
  IntroPage: {
    flex: theme.contentFlex,
    width: theme.contentWidth,
    overflow: 'hidden'
  },

  Brand: {},
  IntroContent: {},

  SiteTitle: {
    fontSize: theme.font.size.lg,
    textAlign: 'center',
    color: theme.color.brand.white
  },

  [theme.breakpoints.down('sm')]: {
    IntroPage: {
      flexDirection: 'column-reverse',
      overflow: 'auto',
      '-webkit-overflow-scrolling': 'touch'
    },

    Brand: {
      flex: '0 0 40vh',
      height: '40vh'
    },

    SiteTitle: {
      fontSize: theme.font.size.sm,
      textAlign: 'center',
      color: theme.color.brand.white
    }
  }
});

class Intro extends React.Component {
  constructor (props) {
    super(props);

    const { router } = props;

    const metadata = new Metadata();
    const activePage = new ActivePage({
      metadata,
      path: router.asPath
    });

    this.state = {
      metadata,
      activePage
    };
  }

  componentDidMount () {
    const { metadata } = this.state;

    search.initialize({ metadata });
  }

  render () {
    const {
      activePage,
      metadata
    } = this.state;

    const {
      children,
      classes
    } = this.props;

    return (
      <Base
        activePage={ activePage }
        metadata={ metadata }
      >
        <View orientation='horizontal' background='dark' className={ classes.IntroPage }>
          <View className={ classes.IntroContent } scrollable='auto'>
            { children }
          </View>

          <View className={ classes.Brand } orientation='vertical' alignItems='center' justifyContent='center' adjust='flex'>
            <Product name='wolkenkit' isAnimated={ true } size='xl' />
            <div className={ classes.SiteTitle }>Documentation</div>
          </View>
        </View>
      </Base>
    );
  }
}

export default withRouter(withStyles(styles)(Intro));
