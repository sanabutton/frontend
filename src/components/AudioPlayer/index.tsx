import { AudioInfo, AudioInfoText, AudioTitle, Container, ControlButtons, ShareButtons, SourceTitle } from './styles';
import React, { useCallback, useContext } from 'react';
import { AudioContext } from '../../contexts';
import { endpoint, endpointSound, host } from '../../constants';
import { Broadcast, ButtonInfo } from '../../lib/types';
import { stopAudio } from '../../lib/stop-audio';
import { getTitleTextAndLink } from '../../lib/getTitleTextAndLink';
import { LinkWrapper } from './LinkWrapper';

function copyUrlToClipboard() {
  const url = document.querySelector<HTMLInputElement>('input#share-url')!;

  url.select();
  document.execCommand('copy');
}

type Props = {
  broadcasts: Broadcast[];
  buttonInfoList: ButtonInfo[];
};

export function AudioPlayer({ broadcasts, buttonInfoList }: Props) {
  const [state, setState] = useContext(AudioContext);
  const { playingButtonId } = state;
  const buttonInfo = playingButtonId ? buttonInfoList[playingButtonId] : undefined;
  const playingAudio = playingButtonId ? state.cache[playingButtonId] : undefined;

  const playAudio = useCallback(
    (buttonId: number, fileName: string, broadcast: Broadcast) => {
      const cache = state.cache[buttonId];
      const audio = cache?.audio || new Audio(`${endpointSound}/${fileName}.mp3`);

      const currentPlayingAudio = state.playingButtonId ? state.cache[state.playingButtonId].audio : undefined;

      if (currentPlayingAudio) {
        stopAudio(currentPlayingAudio);
      }

      audio.play();

      const [, link] = getTitleTextAndLink(broadcast.streamId, broadcast.tweetId);

      if (cache) {
        setState({
          ...state,
          playingButtonId: buttonId,
        });
      } else {
        const nextCache = [...state.cache];

        nextCache[buttonId] = {
          audio,
          sourceTitle: broadcast.title,
          sourceLink: link,
          streamId: broadcast.streamId,
          tweetId: broadcast.tweetId,
        };

        setState({
          cache: nextCache,
          playingButtonId: buttonId,
        });
      }
    },
    [state],
  );

  const randomPlay = () => {
    const broadcast = broadcasts[Math.floor(Math.random() * broadcasts.length)];
    const buttonId = broadcast.buttonIds[Math.floor(Math.random() * broadcast.buttonIds.length)];
    const info = buttonInfoList[buttonId];

    playAudio(buttonId, info['file-name'], broadcast);
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
