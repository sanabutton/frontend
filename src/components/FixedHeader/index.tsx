import React from 'react';
import { Container, Button, Link } from './styles';

export function FixedHeader() {
  return (
    <Container>
      <Button>とめる？</Button>
      <Link href="#">配信の一覧へ</Link>
    </Container>
  );
}
