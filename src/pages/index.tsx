import React, { useMemo, Fragment } from 'react';
import fetch from 'isomorphic-unfetch';

import { FixedHeader, PostArticles, UpdateLog, Header, BroadCaseLinkList } from '../components';
import { endpointV1 } from '../constants';
import { AudioProvider } from '../contexts';
import { BroadCast, ButtonInfo, Site } from '../lib/types';
import { arrayFlatten } from '../lib/flatten';
import { toDate } from '../lib/toDate';
import { buttonNormalize } from '../lib/buttonNormalize';

type Props = {
  sites: Site[];
  buttons: ButtonInfo[];
  broadCasts: BroadCast[];
};

export default function Index(props: Props) {
  const { broadCasts, buttons, sites } = props;
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
      {broadCasts.map((broadCast) => (
        <Fragment key={broadCast.id}>
          <PostArticles
            title={broadCast.title}
            id={broadCast.id}
            buttons={broadCast.buttons.map((id) => buttons[id])}
            tweedId={broadCast.tweedId}
            streamId={broadCast.streamId}
          />
          <hr style={{ margin: '1em 0' }} />
        </Fragment>
      ))}
      <BroadCaseLinkList sites={sites} />
      {/* <Footer /> */}
    </AudioProvider>
  );
}

Index.getInitialProps = async (): Promise<Props> => {
  const posts: any[] = await fetch(`${endpointV1}/posts.json`).then((r) => r.json());

  const sites: Site[] = posts
    .map((post) => ({
      id: post.id,
      slug: post.slug,
      date: new Date(post.date),
    }))
    .reverse();
  const buttons: ButtonInfo[] = arrayFlatten(arrayFlatten(posts.map((post) => post.buttons as ButtonInfo[][])));
  const broadCasts: BroadCast[] = posts
    .map((d: { [key: string]: any }) => ({
      id: d.id,
      title: d.title,
      streamId: d.stream_id,
      tweedId: d.tweed_id,
      categories: d.categories,
      buttons: buttonNormalize(d.buttons, buttons),
      createdAt: toDate(d.date),
      updatedAt: d.last_modified_at && toDate(d.last_modified_at),
    }))
    .reverse();

  return {
    sites,
    buttons,
    broadCasts,
  };
};
