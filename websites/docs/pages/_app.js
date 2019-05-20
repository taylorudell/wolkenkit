import Documentation from '../layouts/Documentation';
import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import theme from '../theme/docs';
import { ThemeProvider } from 'thenativeweb-ux';
import App, { Container } from 'next/app';

const mdxComponents = {
  wrapper: ({ children }) => <Documentation>{ children }</Documentation>
};

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
        <MDXProvider components={ mdxComponents }>
          <Container>
            <Component { ...pageProps } />
          </Container>
        </MDXProvider>
      </ThemeProvider>
    );
  }
}

export default CustomApp;
