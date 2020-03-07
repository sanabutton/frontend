import React from 'react';
import { Container } from './styles';

type Props = {
  text: string;
};

export function TweetButton(props: Partial<Props> = { text: 'すこ！　#さなボタン' }) {
  return (
    <Container>
      <a
        href="https://twitter.com/share"
        className="twitter-share-button"
        data-text={props.text}
        data-url="https://www.natorisana.love/"
        data-lang="ja"
      >
        Tweet
      </a>
    </Container>
  );
}
