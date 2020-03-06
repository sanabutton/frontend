import React from 'react';
import { Container, Title, Input } from './styles';
import { useEnhance } from './enhance';

export type Props = {
  onSearch?: (word: string) => void;
};

export function FixedHeader(props: Props) {
  const { ref, value, onChange, attachShadow } = useEnhance(props);

  return (
    <Container ref={ref} shadow={attachShadow}>
      <Title>さなぼたん（２）</Title>
      <Input type="text" value={value} onChange={onChange} placeholder={'ボタンを検索できるよ'} />
    </Container>
  );
}
