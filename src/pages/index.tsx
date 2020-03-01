import React from 'react';
import fetch from 'isomorphic-unfetch';
import { addDays } from 'date-fns';

import { FixedHeader, PostArticles, UpdateLog, Header } from '../components';
import { endpoint, endpointV1 } from '../constants';
import { AudioProvider } from '../contexts';
import { ButtonsBySlug, ButtonInfo } from '../lib/types';

function getDecodedTitleFromEncodedPath(path: string) {
  const matchResult = path.match(/\/api\/button\/(.*)\.json/);

  if (!matchResult) {
    throw new Error();
  }
  const [, encodedTitle] = matchResult;
  const title = decodeURI(encodedTitle);

  return title;
}

type Props = {
  slugs: string[];
  buttonsBySlug: ButtonsBySlug;
};

export default function Index(props: Props) {
  const logs = [
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      name: '感情を取り戻したオタクの配信はここですか？',
      link: '#',
    },
    {
      createdAt: new Date(),
      updatedAt: addDays(new Date(), 1),
      name: '感情を取り戻したオタクの配信はここですか？',
      link: '#',
    },
  ];

  return (
    <AudioProvider>
      <FixedHeader />
      <Header />
      <UpdateLog logs={logs} />
      <hr style={{ margin: '1em 0' }} />
      {/* <AdArticles></AdArticles> */}
      <PostArticles {...props}></PostArticles>
      {/* <Footer /> */}
    </AudioProvider>
  );
}

Index.getInitialProps = async (): Promise<Props> => {
  // /api/button/${urlEncodedTitle}
  const broadcastPaths: string[] = await fetch(`${endpointV1}/post-list.json`).then((r) => r.json());
  const fetchButtonsFromTitle = async (title: string) =>
    ((await fetch(`${endpoint}${title}`).then((r) => r.json())) as ButtonInfo[][]).reduce((a, b) => [...a, ...b]);

  const broadCastButtons = await Promise.all(
    broadcastPaths.map(async (path) => ({
      title: getDecodedTitleFromEncodedPath(path),
      buttons: await fetchButtonsFromTitle(path),
    })),
  );

  const slugs = broadCastButtons.map((o) => o.title);
  const buttonsBySlug: ButtonsBySlug = broadCastButtons
    .map((o) => ({ [o.title]: o.buttons }))
    .reduce((a, b) => ({
      ...a,
      ...b,
    }));

  return {
    slugs,
    buttonsBySlug,
  };
};
