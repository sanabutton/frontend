import React, { useContext, useCallback } from 'react';
import { CustomButton } from './styles';

import { ButtonInfo } from '../../lib/types';
import { AudioContext } from '../../contexts';
import { playAudio } from '../../lib/play-audio';

type Props = {
  buttonId: number;
  buttonInfo: ButtonInfo;
  sourceTitle: string;
  sourceLink?: string;
  streamId?: string;
  tweetId?: string;
};

export function Button({ buttonId, buttonInfo, sourceTitle, streamId, tweetId }: Props) {
  const [state, setState] = useContext(AudioContext);

  const play = useCallback(
    (id: number, fileName: string) => {
      playAudio(state, setState, id, fileName, sourceTitle, streamId, tweetId);
    },
    [state],
  );

  return <CustomButton onClick={() => play(buttonId, buttonInfo['file-name'])}>{buttonInfo.value}</CustomButton>;
}
