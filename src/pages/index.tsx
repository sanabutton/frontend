import React, { useEffect, useMemo, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import { AudioMenu, BroadCaseLinkList, Broadcasts, Button, FixedHeader, Header, NatoriSana, UpdateLog, Notifications } from '../components';
import { endpoint, endpointV1, host } from '../constants';
import { AppState, Broadcast, ButtonInfo, Site } from '../lib/types';
import { arrayFlatten } from '../lib/flatten';
import { toDate } from '../lib/toDate';
import { buttonNormalize } from '../lib/buttonNormalize';
import { audioPlayer } from '../audio-player';
import { getSourceTypeTextAndLink } from '../lib/getSourceTypeTextAndLink';
import styled from 'styled-components';

type Props = {
  sites: Site[];
  buttonInfoList: ButtonInfo[];
  broadcasts: Broadcast[];
};

const Container = styled.div`
  padding: 8px;
`;

function getThumbnailUrl(streamId?: string, tweetId?: string): string {
  if (streamId) {
    return `https://img.youtube.com/vi/${streamId}/hqdefault.jpg`;
  } else if (tweetId) {
    return `${host}/images/twitter-logo.png`;
  } else {
    return `${host}/images/thumbnail.png`;
  }
}

function copyUrlToClipboard() {
  const url = document.querySelector<HTMLInputElement>('input#share-url')!;

  url.select();
  document.execCommand('copy');
}

export default function Index(props: Props) {
  const { broadcasts, buttonInfoList, sites } = props;
  const [searchWord, setSearchWord] = useState('');
  const [state, setState] = useState<AppState>({});
  const [isPlaying, setIsPlaying] = useState(false);

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

  const audioTitle = useMemo(() => (state.audioId !== undefined ? buttonInfoList[state.audioId].value : undefined), [state.audioId]);
  const buttonUrl = useMemo(() => (state.audioId !== undefined ? `${endpoint}/#${state.audioId}` : endpoint), [state.audioId]);
  const twitterShareUrl = useMemo(() => {
    if (state.audioId !== undefined) {
      return `https://twitter.com/intent/tweet?text=${audioTitle}&url=${endpoint}/%23${state.audioId}&hashtags=さなボタン`;
    } else {
      return 'https://twitter.com/intent/tweet?text=さなボタン';
    }
  }, [state.audioId, audioTitle, buttonUrl]);

  const searchedButtonIds = useMemo(() => {
    if (searchWord === '') return [];

    return props.buttonInfoList
      .map((buttonInfo, idx) => {
        const searchTexts = searchWord.split(/[\x20\u3000\t]+/);

        const isMatch = searchTexts.map((w) => `${buttonInfo.value}`.includes(w)).some((b) => b);

        return isMatch && idx;
      })
      .filter((b): b is number => !!b);
  }, [props.buttonInfoList, searchWord]);
  const searchedButtonInfos = useMemo(() => {
    return searchedButtonIds.map((id) => [id, buttonInfoList[id]] as [number, ButtonInfo]);
  }, [searchedButtonIds, props.buttonInfoList]);
  // const isShowSearchResult = useMemo(() => searchedButtonIds.length > 0, [searchedButtonInfos]);

  const handleButtonClick = (id: number) => audioPlayer.emitAudioId(id);

  const playCurrentAudio = () => {
    audioPlayer.playCurrentAudio();
  };

  const stop = () => {
    audioPlayer.stop();
  };

  const toggleRandom = (bool: boolean) => {
    audioPlayer.setRandom(bool);
  };
  const toggleRepeat = (bool: boolean) => {
    audioPlayer.setRepeat(bool);
  };

  const onAudioIdEmit = (audioId: number) => {
    const broadcast = broadcasts.find(({ buttonIds }) => buttonIds.includes(audioId));

    if (!broadcast) {
      return;
    }
    const { title, streamId, tweedId } = broadcast;

    const [, link] = getSourceTypeTextAndLink(streamId, tweedId);
    const thumbnailUrl = getThumbnailUrl(streamId, tweedId);

    setState({
      audioId,
      sourceTitle: title,
      sourceLink: link,
      thumbnailUrl,
      streamId,
      tweedId,
    });

    audioPlayer.playNextAudio(audioId);
  };

  const onStartedEmit = () => {
    setIsPlaying(true);
  };

  const onStoppedEmit = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    const audioNameList = buttonInfoList.map((i) => i['file-name']);

    audioPlayer.setAudioNameList(audioNameList);
    audioPlayer.eventEmitter.on('play', onAudioIdEmit);
    audioPlayer.eventEmitter.on('started', onStartedEmit);
    audioPlayer.eventEmitter.on('stopped', onStoppedEmit);
  }, []);

  useEffect(() => {
    const { hash } = window.location;

    if (!hash) {
      return;
    }

    const audioId = Number(hash.slice(1));

    if (Number.isInteger(audioId)) {
      audioPlayer.emitAudioId(audioId);
    }
  }, []);

  return (
    <>
      <Container>
        <FixedHeader onSearch={setSearchWord}>
          {useMemo(
            () => searchedButtonInfos.map(([id, info]) => <Button key={id} id={id} buttonInfo={info} onButtonClick={handleButtonClick} />),
            [searchedButtonInfos],
          )}
        </FixedHeader>
        <Header />
        {/* <SearchResult show={isShowSearchResult}></SearchResult> */}
        <UpdateLog logs={logs} />
        <hr style={{ margin: '1em 0' }} />
        <Notifications buttonInfoList={buttonInfoList} />
        <Broadcasts broadcasts={broadcasts} buttonInfoList={buttonInfoList} onButtonClick={handleButtonClick} />
        <BroadCaseLinkList sites={sites} />
        <NatoriSana />
        {/* <Footer /> */}
      </Container>
      <AudioMenu
        audioTitle={audioTitle}
        sourceTitle={state.sourceTitle}
        thumbnailUrl={state.thumbnailUrl}
        sourceLink={state.sourceLink}
        isPlaying={isPlaying}
        onPlayClick={playCurrentAudio}
        onStopClick={stop}
        onRandomToggle={toggleRandom}
        onRepeatToggle={toggleRepeat}
      >
        <div>
          <div>
            <button>
              <a href={twitterShareUrl}>Twitter でシェア</a>
            </button>
          </div>
          <div>
            <input
              type="url"
              id="share-url"
              value={buttonUrl}
              style={{
                fontSize: '16px',
                transform: 'scale(0.8)',
              }}
            />
            <button onClick={copyUrlToClipboard}>URL をコピー</button>
          </div>
        </div>
      </AudioMenu>
    </>
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
