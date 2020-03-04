import { FixedHeader } from '../FixedHeader';
import { Header } from '../Header';
import { UpdateLog } from '../UpdateLog';
import React, { Fragment, useCallback, useContext, useMemo } from 'react';
import { PostArticles } from '../PostArticles';
import { BroadCaseLinkList } from '../BroadCastLinkList';
import { AudioPlayer } from '../AudioPlayer';
import { Container } from './styles';
import { Broadcast, ButtonInfo, Site } from '../../lib/types';
import { playAudio } from '../../lib/play-audio';
import { AudioContext } from '../../contexts';
import { Button } from '../Button';

export type AppProps = {
  sites: Site[];
  buttonInfoList: ButtonInfo[];
  broadcasts: Broadcast[];
};

export function App(props: AppProps) {
  const { broadcasts, buttonInfoList, sites } = props;
  const [state, setState] = useContext(AudioContext);
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
  const handleAudioPlay = useCallback(
    (broadcast: Broadcast, buttonId: number) => {
      const fileName = buttonInfoList[buttonId]['file-name'];

      playAudio(state, setState, buttonId, fileName, broadcast.title, broadcast.streamId, broadcast.tweedId);
    },
    [state],
  );

  return (
    <>
      <Container>
        <FixedHeader />
        <Header />
        <UpdateLog logs={logs} />
        <hr style={{ margin: '1em 0' }} />
        {/* <AdArticles></AdArticles> */}
        {broadcasts.map((broadcast) => (
          <Fragment key={broadcast.id}>
            <PostArticles broadcast={broadcast} buttonInfoList={buttonInfoList}>
              {broadcast.buttonIds.map((buttonId) => (
                <Button
                  key={buttonId}
                  id={buttonId}
                  buttonInfo={buttonInfoList[buttonId]}
                  handleClick={(id: number) => handleAudioPlay(broadcast, id)}
                />
              ))}
            </PostArticles>
            <hr style={{ margin: '1em 0' }} />
          </Fragment>
        ))}
        <BroadCaseLinkList sites={sites} />
        {/* <Footer /> */}
      </Container>
      <AudioPlayer broadcasts={broadcasts} buttonInfoList={buttonInfoList} handleAudioPlay={handleAudioPlay} />
    </>
  );
}
