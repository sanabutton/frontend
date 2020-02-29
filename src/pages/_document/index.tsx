import React from 'react';
import Document, { Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { Meta } from './meta';
import { Script } from './script';
import { Css } from './css';
import { Favicon } from './favicon';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <html>
        <Head>
          <Css />
          <Script />
          <Meta />
          <Favicon />
        </Head>
        <body style={{ padding: '8px' }}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
