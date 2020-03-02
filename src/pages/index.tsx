import React, { useMemo } from 'react';
import fetch from 'isomorphic-unfetch';

import { FixedHeader, PostArticles, UpdateLog, Header } from '../components';
import { endpointV1 } from '../constants';
import { AudioProvider } from '../contexts';
import { BroadCast } from '../lib/types';
import { isDate, set } from 'date-fns';

type Props = {
  broadCasts: BroadCast[];
};

export default function Index(props: Props) {
  const { broadCasts } = props;
  const logs = useMemo(
    () =>
      broadCasts.map((b) => ({
        name: b.title,
        link: `/#${b.id}`,
        createdAt: new Date(b.createdAt),
        updatedAt: b.updatedAt && new Date(b.updatedAt),
      })),
    [broadCasts],
  );

  return (
    <AudioProvider>
      <FixedHeader />
      <Header />
      <UpdateLog logs={logs} />
      <hr style={{ margin: '1em 0' }} />
      {/* <AdArticles></AdArticles> */}
      <PostArticles slugs={[]} buttonsBySlug={{}} />
      {/* <Footer /> */}
    </AudioProvider>
  );
}

Index.getInitialProps = async (): Promise<Props> => {
  const toDate = (s: string) => {
    const d = new Date(s);
    const isCorrectDate = (d1: Date) => isDate(d1) && d.getFullYear() >= 2018;

    return isCorrectDate(d)
      ? d
      : set(d, {
        year: 2017,
        month: 3,
        date: 7,
      });
  };
  const broadCasts: BroadCast[] = (await fetch(`${endpointV1}/posts.json`).then((r) => r.json())).map((d: { [key: string]: any }) => ({
    id: d.id,
    title: d.title,
    streamId: d.stream_id,
    categories: d.categories,
    buttons: d.buttons,
    createdAt: toDate(d.date),
    updatedAt: d.last_modified_at && toDate(d.last_modified_at),
  }));

  return {
    broadCasts,
  };
};
