import React from 'react';
import Document, { Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

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
          <meta name="viewport" content="initial-scale=1" />
          <meta name="description" content="名取さなの声が再生されるボタン置き場。" />

          <meta property="og:title" content="さなぼたん（２）" />
          <meta property="og:description" content="名取さなの声が再生されるボタン置き場。" />
          <meta property="og:locale" content="ja_JP" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.natorisana.love" />
          <meta property="og:image" content="https://www.natorisana.love/images/thumbnail.png" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@sanabutton2" />
          <script async src="https://platform.twitter.com/widgets.js"></script>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css"></link>
          <meta name="msapplication-TileColor" content="#2d88ef" />
          <meta name="msapplication-TileImage" content="/favicon/mstile-144x144.png" />
          <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/favicon.ico" />
          <link rel="icon" type="image/vnd.microsoft.icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-touch-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-touch-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="36x36" href="/favicon/android-chrome-36x36.png" />
          <link rel="icon" type="image/png" sizes="48x48" href="/favicon/android-chrome-48x48.png" />
          <link rel="icon" type="image/png" sizes="72x72" href="/favicon/android-chrome-72x72.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon/android-chrome-96x96.png" />
          <link rel="icon" type="image/png" sizes="128x128" href="/favicon/android-chrome-128x128.png" />
          <link rel="icon" type="image/png" sizes="144x144" href="/favicon/android-chrome-144x144.png" />
          <link rel="icon" type="image/png" sizes="152x152" href="/favicon/android-chrome-152x152.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png" />
          <link rel="icon" type="image/png" sizes="256x256" href="/favicon/android-chrome-256x256.png" />
          <link rel="icon" type="image/png" sizes="384x384" href="/favicon/android-chrome-384x384.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/favicon/android-chrome-512x512.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon.png" />
          <link rel="icon" type="image/png" sizes="36x36" href="/favicon/icon-36x36.png" />
          <link rel="icon" type="image/png" sizes="48x48" href="/favicon/icon-48x48.png" />
          <link rel="icon" type="image/png" sizes="72x72" href="/favicon/icon-72x72.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon/icon-96x96.png" />
          <link rel="icon" type="image/png" sizes="128x128" href="/favicon/icon-128x128.png" />
          <link rel="icon" type="image/png" sizes="144x144" href="/favicon/icon-144x144.png" />
          <link rel="icon" type="image/png" sizes="152x152" href="/favicon/icon-152x152.png" />
          <link rel="icon" type="image/png" sizes="160x160" href="/favicon/icon-160x160.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/favicon/icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="196x196" href="/favicon/icon-196x196.png" />
          <link rel="icon" type="image/png" sizes="256x256" href="/favicon/icon-256x256.png" />
          <link rel="icon" type="image/png" sizes="384x384" href="/favicon/icon-384x384.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/favicon/icon-512x512.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/icon-16x16.png" />
          <link rel="icon" type="image/png" sizes="24x24" href="/favicon/icon-24x24.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/icon-32x32.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
