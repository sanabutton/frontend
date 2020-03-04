import React, { useMemo, Fragment } from 'react';
import fetch from 'isomorphic-unfetch';

import { FixedHeader, PostArticles, UpdateLog, Header, BroadCaseLinkList, AudioPlayer } from '../components';
import { endpointV1 } from '../constants';
import { AudioProvider } from '../contexts';
import { Broadcast, ButtonInfo, Site } from '../lib/types';
import { arrayFlatten } from '../lib/flatten';
import { toDate } from '../lib/toDate';
import { buttonNormalize } from '../lib/buttonNormalize';
import styled from 'styled-components';

type Props = {
  sites: Site[];
  buttonInfoList: ButtonInfo[];
  broadcasts: Broadcast[];
};

const Container = styled.div`
  padding: 8px;
`;

export default function Index(props: Props) {
  const { broadcasts, buttonInfoList, sites } = props;
  const logs = useMemo(
    () =>
      broadcasts.map((b) => ({
        name: b.title,
        link: `/#${b.id}`,
        createdAt: new Date(b.createdAt),
        updatedAt: b.updatedAt && new Date(b.updatedAt),
      })),
    [broadcasts],
  );

  return (
    <AudioProvider>
      <Container>
        <FixedHeader />
        <Header />
        <UpdateLog logs={logs} />
        <hr style={{ margin: '1em 0' }} />
        {/* <AdArticles></AdArticles> */}
        {broadcasts.map((broadcast) => (
          <Fragment key={broadcast.id}>
            <PostArticles
              title={broadcast.title}
              id={broadcast.id}
              buttonIds={broadcast.buttonIds}
              tweedId={broadcast.tweetId}
              streamId={broadcast.streamId}
              buttonInfoList={buttonInfoList}
            />
            <hr style={{ margin: '1em 0' }} />
          </Fragment>
        ))}
        <BroadCaseLinkList sites={sites} />
        {/* <Footer /> */}
      </Container>
      <AudioPlayer broadcasts={broadcasts} buttonInfoList={buttonInfoList} />
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
  const buttonInfoList: ButtonInfo[] = arrayFlatten(arrayFlatten(posts.map((post) => post.buttons as ButtonInfo[][])));
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
