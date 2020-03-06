import React, { ReactNode } from 'react';
import { Container } from './styles';

export type Props = {
  children: ReactNode;
  show: boolean;
};

export function SearchResult(props: Props) {
  const { children, show } = props;

  return <Container in={show}>{children}</Container>;
}
