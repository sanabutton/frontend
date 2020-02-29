import React from 'react';

import fetch from 'isomorphic-unfetch';
import { FixedHeader, PostArticles, UpdateLog, Header } from '../components';
import { endpoint, endpointV1 } from '../constants';
import { ButtonsBySlug } from '../lib/types';
import { addDays } from 'date-fns';

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
    <>
      <FixedHeader />
      <Header />
      <UpdateLog logs={logs} />
      {/* <AdArticles></AdArticles> */}
      {/* <Footer /> */}
      <PostArticles {...props}></PostArticles>
    </>
  );
}

Index.getInitialProps = async (): Promise<Props> => {
  // /api/button/${urlEncodedTitle}
  const broadcastPaths: string[] = await fetch(`${endpointV1}/post-list.json`).then((r) => r.json());

  const slugs = [];
  const buttonsBySlug: ButtonsBySlug = {};

  for (const path of broadcastPaths) {
    const title = getDecodedTitleFromEncodedPath(path);
    const [buttons] = await fetch(`${endpoint}${path}`).then((r) => r.json());

    slugs.push(title);
    buttonsBySlug[title] = buttons;
  }

  return {
    slugs,
    buttonsBySlug,
  };
};
