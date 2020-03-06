import { AudioInfo, AudioInfoText, AudioTitle, Container, ControlButtons, ShareContainer, SourceTitle } from './styles';
import React, { ReactNode } from 'react';
import { LinkWrapper } from './LinkWrapper';

type Props = {
  children: ReactNode;
  audioTitle?: string;
  sourceTitle?: string;
  thumbnailUrl?: string;
  sourceLink?: string;
  onPlayClick: () => void;
  onPauseClick: () => void;
  onStopClick: () => void;
};

export function AudioMenu({ children, audioTitle, sourceTitle, thumbnailUrl, sourceLink, onPauseClick, onPlayClick, onStopClick }: Props) {
  // const randomPlay = () => {
  //   const broadcast = broadcasts[Math.floor(Math.random() * broadcasts.length)];
  //   const buttonId = broadcast.buttonIds[Math.floor(Math.random() * broadcast.buttonIds.length)];
  //
  //   audioPlayer.effect().emit('play', broadcast, buttonId);
  // };

  return (
    <Container>
      <AudioInfo>
        <LinkWrapper url={sourceLink}>
          <img src={thumbnailUrl} style={{ height: 64 }} />
        </LinkWrapper>
        {audioTitle && (
          <AudioInfoText>
            <div>
              <AudioTitle>{audioTitle}</AudioTitle>
            </div>
            <div>
              <LinkWrapper url={sourceLink}>
                <SourceTitle>{sourceTitle}</SourceTitle>
              </LinkWrapper>
            </div>
          </AudioInfoText>
        )}
      </AudioInfo>
      <ControlButtons>
        <div>
          <button onClick={() => {}}>ランダム再生</button>
          <button onClick={onStopClick}>停止</button>
          <button onClick={onPauseClick}>一時停止</button>
          <button onClick={onPlayClick}>再生</button>
          <p>
            <input type="checkbox" />
            連続再生
          </p>
        </div>
      </ControlButtons>
      <ShareContainer>{children}</ShareContainer>
    </Container>
  );
}
