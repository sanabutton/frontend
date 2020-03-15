import React, { useEffect, useRef } from 'react';
import { audioPlayer } from '../../audio-player';
import { ButtonInfo } from '../../lib/types';
import { Container } from './styles';
import { Notifications as NotificationsDOM } from '../../_notifications';

type Props = {
  buttonInfoList: ButtonInfo[];
};

export function Notifications({ buttonInfoList }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!buttonInfoList || !buttonInfoList.length) {
      return;
    }

    const notificationRowEls = ref.current!;
    const buttons = notificationRowEls.querySelectorAll<HTMLButtonElement>('.sounds');

    for (const button of buttons) {
      button.onclick = () => {
        const fileName = button.getAttribute('data-file');
        const audioId = buttonInfoList.findIndex((buttonInfo) => buttonInfo['file-name'] === fileName);

        if (audioId === undefined) {
          console.error(`${fileName} play failed`);

          return;
        }

        audioPlayer.emitAudioId(audioId);
      };
    }
  }, [buttonInfoList]);

  return (
    <Container ref={ref}>
      <NotificationsDOM />
    </Container>
  );
}
