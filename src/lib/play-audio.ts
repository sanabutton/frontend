import { endpointSound } from '../constants';
import { stopAudio } from './stop-audio';
import { getTitleTextAndLink } from './getTitleTextAndLink';
import { AudioState } from './types';
import { Dispatch, SetStateAction } from 'react';

export function playAudio(
  state: AudioState,
  setState: Dispatch<SetStateAction<AudioState>>,
  buttonId: number,
  fileName: string,
  sourceTitle: string,
  streamId?: string,
  tweetId?: string,
) {
  const cache = state.cache[buttonId];
  const audio = cache?.audio || new Audio(`${endpointSound}/${fileName}.mp3`);

  const currentPlayingAudio = state.playingButtonId ? state.cache[state.playingButtonId].audio : undefined;

  if (currentPlayingAudio) {
    stopAudio(currentPlayingAudio);
  }

  audio.play();

  const [, link] = getTitleTextAndLink(streamId, tweetId);

  if (cache) {
    setState({
      ...state,
      playingButtonId: buttonId,
    });
  } else {
    const nextCache = [...state.cache];

    nextCache[buttonId] = {
      audio,
      sourceTitle,
      sourceLink: link,
      streamId,
      tweetId,
    };

    setState({
      cache: nextCache,
      playingButtonId: buttonId,
    });
  }
}
