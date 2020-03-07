import React, { Fragment, ReactNode } from 'react';
import { Container, Title, Input, ResultContainer, Link } from './styles';
import { useEnhance } from './enhance';

export type Props = {
  onSearch?: (word: string) => void;
  children: ReactNode;
};

export function FixedHeader(props: Props) {
  const { ref, value, onChange, attachShadow } = useEnhance(props);

  return (
    <Fragment>
      <Container ref={ref} shadow={attachShadow}>
        <Title>さなボタン(2)</Title>
        <Input type="text" value={value} onChange={onChange} placeholder={'ボタンを検索できるよ'} />
        <ResultContainer in={value.length > 0}>{props.children}</ResultContainer>
      </Container>
      <Link href="#article_index">配信の一覧へ</Link>
    </Fragment>
  );
}
