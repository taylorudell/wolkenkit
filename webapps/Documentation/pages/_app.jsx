import React from 'react';
import theme from '../theme/docs';
import { ThemeProvider } from 'thenativeweb-ux';
import App, { Container } from 'next/app';

class DocsApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      pageProps
    };
  }

  render () {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <ThemeProvider theme={ theme }>
          <Component { ...pageProps } />
        </ThemeProvider>
      </Container>
    );
  }
}

export default DocsApp;
