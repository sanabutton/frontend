import React from 'react';
import { Title, ThankNatori, HommageContainer, Text, Container, Input } from './styles';
import { TweetButton } from '../TweetButton';
import { useEnhance } from './enhance';

export type Props = {
  onSearch?: (word: string) => void;
};

export function Header(props: Props) {
  const { value, onChange } = useEnhance(props);

  return (
    <Container>
      <Title>さなボタン(2)</Title>
      <Input type="text" value={value} onChange={onChange} placeholder={'ボタンを検索できるよ'} />
      <ThankNatori>
        さなちゃんからいつも元気貰ってます、ありがとう！ <br />
        勝手に作っちゃってごめんなさい
      </ThankNatori>
      <TweetButton />
      <HommageContainer>
        <Text color="#ffffee">
          オマージュ
          <br />
          素敵なボタンサイト様
        </Text>
        <Text>
          <a href="http://ushiumi.ichiya-boshi.net/">宇志海ボタン</a>様
        </Text>
        <Text color="#ffefff">
          <a href="http://tsukino-mito.extrem.ne.jp/">美兎ボタン</a>様
        </Text>
        <Text>
          <a href="https://rimumaki.clocknote.net">りむとまきボタン</a>様
        </Text>
        <Text color="#ffefff">
          <a href="http://inabagumi.sakura.ne.jp/">はねるボタン(2)</a>様
        </Text>
        <Text>
          <a href="/odanobu">タロ耳又ボタン</a>様
        </Text>
      </HommageContainer>
    </Container>
  );
}
