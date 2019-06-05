import Blockquote from '../components/Blockquote';
import Code from '../components/Code';
import Documentation from '../layouts/Documentation';
import { MDXProvider } from '@mdx-js/react';
import React from 'react';
import theme from '../theme/docs';
import App, { Container } from 'next/app';
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
