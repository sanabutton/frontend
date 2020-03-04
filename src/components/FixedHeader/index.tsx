import React, { useCallback, useContext } from 'react';
import { Container, Button, Link } from './styles';
import { AudioContext } from '../../contexts';

export function FixedHeader() {
  const [state] = useContext(AudioContext);
  const stopAudio = useCallback(() => {
    if (!state.playingButtonId) {
      return;
    }
    const { audio } = state.cache[state.playingButtonId]!;

    audio.pause();
  }, [state]);

  return (
    <Container>
      <Button onClick={stopAudio}>とめる？</Button>
      <Link href="#article_index">配信の一覧へ</Link>
    </Container>
  );
}
