import React from 'react';
import { Container, Button, Link } from './styles';

type Props = {
  onStopClick: () => void;
};

export function FixedHeader({ onStopClick }: Props) {
  return (
    <Container>
      <Button onClick={onStopClick}>とめる？</Button>
      <Link href="#article_index">配信の一覧へ</Link>
    </Container>
  );
}
