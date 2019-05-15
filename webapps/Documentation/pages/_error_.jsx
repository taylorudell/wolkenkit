import Head from '../components/Head.jsx';
import Page from '../components/Page.jsx';
import React from 'react';
import theme from '../theme/docs';
import { ThemeProvider } from 'thenativeweb-ux';

const Error = function ({ statusCode }) {
  return (
    <ThemeProvider theme={ theme }>
      <Page>
        <Head>
          <title>404</title>
        </Head>

        {
          statusCode ?
            `An error ${statusCode} occurred on server` :
            'An error occurred on client'
        }
      </Page>
    </ThemeProvider>
  );
};

Error.getInitialProps = function ({ res, err }) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;

  return { statusCode };
};

export default Error;
