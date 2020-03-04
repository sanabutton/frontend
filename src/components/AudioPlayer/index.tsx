import { AudioInfo, AudioInfoText, AudioTitle, Container, ControlButtons, ShareButtons, SourceTitle } from './styles';
import React, { useCallback, useContext } from 'react';
import { AudioContext } from '../../contexts';
import { endpoint, host } from '../../constants';
import { Broadcast, ButtonInfo } from '../../lib/types';
import { stopAudio } from '../../lib/stop-audio';
import { LinkWrapper } from './LinkWrapper';

function copyUrlToClipboard() {
  const url = document.querySelector<HTMLInputElement>('input#share-url')!;

  url.select();
  document.execCommand('copy');
}

type Props = {
  broadcasts: Broadcast[];
  buttonInfoList: ButtonInfo[];
  handleAudioPlay: (broadcast: Broadcast, buttonId: number) => void;
};

export function AudioPlayer({ broadcasts, buttonInfoList, handleAudioPlay }: Props) {
  const [state] = useContext(AudioContext);
  const { playingButtonId } = state;
  const buttonInfo = playingButtonId ? buttonInfoList[playingButtonId] : undefined;
  const playingAudio = playingButtonId ? state.cache[playingButtonId] : undefined;

  const randomPlay = () => {
    const broadcast = broadcasts[Math.floor(Math.random() * broadcasts.length)];
    const buttonId = broadcast.buttonIds[Math.floor(Math.random() * broadcast.buttonIds.length)];

    handleAudioPlay(broadcast, buttonId);
  };

  const stop = useCallback(() => {
    if (!playingAudio) {
      return;
    }
    playingAudio.audio.pause();
  }, [state]);

  const replay = useCallback(() => {
    if (!playingAudio) {
      return;
    }
    stopAudio(playingAudio.audio);
    playingAudio.audio.play();
  }, [state]);

  return (
    <Container>
      <AudioInfo>
        <LinkWrapper url={playingAudio?.sourceLink}>
          <img
            src={
              playingAudio?.streamId
                ? `https://img.youtube.com/vi/${playingAudio?.streamId}/hqdefault.jpg`
                : playingAudio?.tweetId
                ? `${host}/images/twitter-logo.png`
                : `${host}/images/thumbnail.png`
            }
            style={{ height: 64 }}
          />
        </LinkWrapper>
        {buttonInfo && playingAudio ? (
          <AudioInfoText>
            <div>
              <AudioTitle>{buttonInfo.value}</AudioTitle>
            </div>
            <div>
              <LinkWrapper url={playingAudio.sourceLink}>
                <SourceTitle>{playingAudio.sourceTitle}</SourceTitle>
              </LinkWrapper>
            </div>
          </AudioInfoText>
        ) : (
          <></>
        )}
      </AudioInfo>
      <ControlButtons>
        <div>
          <button onClick={() => randomPlay()}>ランダム再生</button>
          <button onClick={() => stop()}>停止</button>
          <button onClick={() => replay()}>再生</button>
          <p>
            <input type="checkbox" />
            連続再生
          </p>
        </div>
      </ControlButtons>
      <ShareButtons>
        <div>
          <div>
            <button>
              <a href={`https://twitter.com/intent/tweet?text=${playingButtonId}`}>Twitter でシェア</a>
            </button>
          </div>
          <div>
            <input type="url" id="share-url" value={`${endpoint}${playingButtonId ? `/#${playingButtonId}` : ''}`} />
            <button onClick={copyUrlToClipboard}>URL をコピー</button>
          </div>
        </div>
      </ShareButtons>
    </Container>
  );
}
