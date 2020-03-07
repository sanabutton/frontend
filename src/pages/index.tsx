import React from 'react';
import fetch from 'isomorphic-unfetch';

import { App, AppProps } from '../components';
import { endpointV1 } from '../constants';
import { AudioProvider } from '../contexts';
import { Broadcast, ButtonInfo, Site } from '../lib/types';
import { arrayFlatten } from '../lib/flatten';
import { toDate } from '../lib/toDate';
import { buttonNormalize } from '../lib/buttonNormalize';

type Props = AppProps;

export default function Index(props: Props) {
  return (
    <AudioProvider>
      <App {...props} />
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
  const buttonInfoList: ButtonInfo[] = arrayFlatten(arrayFlatten(posts.map((post) => post.buttons as ButtonInfo[][]).reverse()));
  const broadcasts: Broadcast[] = posts
    .map((d: { [key: string]: any }) => ({
      id: d.id,
      title: d.title,
      streamId: d.stream_id,
      tweedId: d.tweed_id,
      categories: d.categories,
      buttonIds: buttonNormalize(d.buttons, buttonInfoList),
      createdAt: toDate(d.date),
      updatedAt: d.last_modified_at && toDate(d.last_modified_at),
    }))
    .reverse();

  return {
    sites,
    buttonInfoList,
    broadcasts,
  };
};
