import React from 'react';
import { StyleCollector } from 'thenativeweb-ux';
import Document, { Head, Html, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
  static async getInitialProps (ctx) {
    const collection = StyleCollector.createCollection();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => (
          <StyleCollector collection={ collection }>
            <App { ...props } />
          </StyleCollector>
        )
      });

    // Run the parent `getInitialProps` using `ctx` that now includes our custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <React.Fragment>
          { initialProps.styles }
          <style type='text/css' id='server-side-styles' dangerouslySetInnerHTML={{ __html: collection.toString() }} />
        </React.Fragment>
      )
    };
  }

  /* eslint-disable class-methods-use-this */
  render () {
    return (
      <Html>
        <Head>
          <link rel='icon' type='image/png' href='/favicon.png' sizes='32x32' />
          <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,600,700|Ubuntu:300,400,500|Ubuntu+Mono|Kalam' rel='stylesheet' />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
  /* eslint-enable class-methods-use-this */
}

export default CustomDocument;
