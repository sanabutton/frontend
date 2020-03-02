import React, { useMemo, Fragment } from 'react';
import fetch from 'isomorphic-unfetch';

import { FixedHeader, PostArticles, UpdateLog, Header } from '../components';
import { endpointV1 } from '../constants';
import { AudioProvider } from '../contexts';
import { BroadCast, ButtonInfo } from '../lib/types';
import { arrayFlatten } from '../lib/flatten';
import { toDate } from '../lib/toDate';
import { buttonNormalize } from '../lib/buttonNormalize';

type Props = {
  buttons: ButtonInfo[];
  broadCasts: BroadCast[];
};

export default function Index(props: Props) {
  const { broadCasts, buttons } = props;
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
      {/* <Footer /> */}
    </AudioProvider>
  );
}

Index.getInitialProps = async (): Promise<Props> => {
  const posts: any[] = await fetch(`${endpointV1}/posts.json`).then((r) => r.json());
  const buttons: ButtonInfo[] = arrayFlatten(arrayFlatten(posts.map((post) => post.buttons as ButtonInfo[][])));

  const broadCasts: BroadCast[] = posts
    .map((d: { [key: string]: any }) => ({
      id: d.id,
      title: d.title,
      streamId: d.stream_id,
      tweetId: d.tweed_id,
      categories: d.categories,
      buttons: buttonNormalize(d.buttons, buttons),
      createdAt: toDate(d.date),
      updatedAt: d.last_modified_at && toDate(d.last_modified_at),
    }))
    .reverse();

  return {
    buttons,
    broadCasts,
  };
};
