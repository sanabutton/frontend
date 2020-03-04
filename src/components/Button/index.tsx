import React, { useContext, useCallback } from 'react';
import { CustomButton } from './styles';

import { ButtonInfo } from '../../lib/types';
import { AudioContext } from '../../contexts';
import { endpointSound } from '../../constants';
import { stopAudio } from '../../lib/stop-audio';

type Props = {
  buttonId: number;
  buttonInfo: ButtonInfo;
  sourceTitle: string;
  sourceLink?: string;
  streamId?: string;
  tweetId?: string;
};

export function Button({ buttonId, buttonInfo, sourceTitle, sourceLink, streamId, tweetId }: Props) {
  const [state, setState] = useContext(AudioContext);

  const playAudio = useCallback(
    (id: number, fileName: string) => {
      const cache = state.cache[id];

      const audio = cache?.audio || new Audio(`${endpointSound}/${fileName}.mp3`);
      const currentPlayingAudio = state.playingButtonId ? state.cache[state.playingButtonId].audio : undefined;

      if (currentPlayingAudio) {
        stopAudio(currentPlayingAudio);
      }

      audio.play();

      if (cache) {
        setState({
          ...state,
          playingButtonId: id,
        });
      } else {
        const nextCache = [...state.cache];

        nextCache[buttonId] = {
          audio,
          sourceTitle,
          sourceLink,
          streamId,
          tweetId,
        };
        setState({
          cache: nextCache,
          playingButtonId: id,
        });
      }
    },
    [state],
  );

  return <CustomButton onClick={() => playAudio(buttonId, buttonInfo['file-name'])}>{buttonInfo.value}</CustomButton>;
}
