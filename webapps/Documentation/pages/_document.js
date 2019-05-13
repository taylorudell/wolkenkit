import Document from 'next/document';
import React from 'react';
import { StyleCollector } from 'thenativeweb-ux';

export default class AppDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const collection = StyleCollector.createCollection();

    const renderedPage = renderPage(Page => props => (
      <StyleCollector collection={ collection }>
        <Page { ...props } />
      </StyleCollector>
    ));

    const styles = (
      <style type='text/css' data-meta='jss-ssr' dangerouslySetInnerHTML={{ __html: collection.toString() }} />
    );

    return { ...renderedPage, styles };
  }
}
