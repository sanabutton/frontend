import React, { Fragment } from 'react';
export function Meta() {
  const title = 'さなぼたん（２）';
  const description = '名取さなの声が再生されるボタン置き場。';

  return (
    <Fragment>
      <meta name="viewport" content="initial-scale=1" />
      <meta name="description" content={description} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.natorisana.love" />
      <meta property="og:image" content="https://www.natorisana.love/images/thumbnail.png" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@sanabutton2" />
    </Fragment>
  );
}
