import Documentation from '../layouts/Documentation';
import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import theme from '../theme/docs';
import App, { Container } from 'next/app';
import { Blockquote, Code } from '../components';
import { removeServerSideStyles, ThemeProvider } from 'thenativeweb-ux';

const mdxComponents = {
  blockquote: Blockquote,
  code: Code,
  wrapper: ({ children }) => <Documentation>{ children }</Documentation>
};

class CustomApp extends App {
  /* eslint-disable class-methods-use-this */
  componentDidMount () {
    removeServerSideStyles();
  }
  /* eslint-enable class-methods-use-this */

  render () {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <ThemeProvider theme={ theme }>
          <MDXProvider components={ mdxComponents }>
            <Component { ...pageProps } />
          </MDXProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default CustomApp;
