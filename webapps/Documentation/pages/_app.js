import React from 'react';
import theme from '../theme/docs';
import { ThemeProvider } from 'thenativeweb-ux';
import App, { Container } from 'next/app';

class CustomApp extends App {
  /* eslint-disable class-methods-use-this */
  componentDidMount () {
    const style = document.getElementById('server-side-styles');

    if (style) {
      style.parentNode.removeChild(style);
    }
  }
  /* eslint-enable class-methods-use-this */

  render () {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={ theme }>
        <Container>
          <Component { ...pageProps } />
        </Container>
      </ThemeProvider>
    );
  }
}

export default CustomApp;
