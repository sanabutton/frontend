import React from 'react';

type Props = {
  text: string;
};

export function TweetButton(props: Partial<Props> = { text: 'すこ！　#さなボタン' }) {
  return (
    <a
      href="https://twitter.com/share"
      className="twitter-share-button"
      data-text={props.text}
      data-url="https://www.natorisana.love/"
      data-lang="ja"
    >
      Tweet
    </a>
  );
}
