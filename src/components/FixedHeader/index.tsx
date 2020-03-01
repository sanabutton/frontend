import React, { useCallback, useContext } from 'react';
import { Container, Button, Link } from './styles';
import { AudioContext } from '../../contexts/AudioContext';

export function FixedHeader() {
  const [state, setState] = useContext(AudioContext);
  const stopAudio = useCallback(() => {
    if (!state.playingAudioName) {
      return;
    }
    const audio = state.cache[state.playingAudioName]!;

    audio.pause();
    audio.currentTime = 0;

    setState({
      ...state,
      playingAudioName: undefined,
    });
  }, [state]);

  return (
    <Container>
      <Button onClick={stopAudio}>とめる？</Button>
      <Link href="#">配信の一覧へ</Link>
    </Container>
  );
}
