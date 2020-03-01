import React, { useContext, useCallback } from 'react';
import { CustomButton } from './styles';

import { ButtonInfo } from '../../lib/types';
import { AudioContext } from '../../contexts/AudioContext';
import { endpointSound } from '../../constants';

type Props = {
  button: ButtonInfo;
};

export function Button({ button }: Props) {
  const [state, setState] = useContext(AudioContext);

  const playAudio = useCallback(
    (fileName: string) => {
      const cache = state.cache[fileName];
      const audio = cache || new Audio(`${endpointSound}/${fileName}.mp3`);
      const currentPlayingAudio = state.playingAudioName ? state.cache[state.playingAudioName] : undefined;

      if (currentPlayingAudio) {
        currentPlayingAudio.pause();
        currentPlayingAudio.currentTime = 0;
      }

      audio.play();

      if (cache) {
        setState({
          ...state,
          playingAudioName: fileName,
        });
      } else {
        setState({
          cache: {
            ...state.cache,
            [fileName]: audio,
          },
          playingAudioName: fileName,
        });
      }
    },
    [state],
  );

  return <CustomButton onClick={() => playAudio(button['file-name'])}>{button.value}</CustomButton>;
}
