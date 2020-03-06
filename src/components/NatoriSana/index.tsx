import React from 'react';
import { Container, ProfileContainer, TimelineContainer, LinkBlock, LinkIcon, Text, Name } from './styles';

export function NatoriSana() {
  return (
    <Container>
      <ProfileContainer>
        <LinkBlock href="#">ページの一番上へ戻る</LinkBlock>
        <img
          className="natori-sana-icon"
          src="https://yt3.ggpht.com/a/AATXAJz5HAB4IGdqp2OlwC7Q0TP8oj4id0R-JcaQYQ=s288-c-k-c0xffffffff-no-rj-mo"
          alt="名取さなのアイコン"
        />
        <Name>名取さな／ Sana Natori </Name>
        <LinkIcon href="https://twitter.com/sana_natori">
          <img src="/images/Twitter.png" alt="Twitter アカウントへのリンク画像" />
        </LinkIcon>
        <LinkIcon href="https://www.youtube.com/channel/UCIdEIHpS0TdkqRkHL5OkLtA">
          <img src="/images/Youtube.png" alt="YouTube チャンネルへのリンク画像" />
        </LinkIcon>
        <Text>
          おはようございナース！🍆🍆🍆 17さいの新人バーチャルYouTuber バーチャル地方 海の見える バーチャルサナトリウムの新米ナース
        </Text>
      </ProfileContainer>
      <TimelineContainer>
        <a
          className="twitter-timeline"
          data-width="500"
          data-height="600"
          data-lang="ja"
          href="https://twitter.com/sana_natori?ref_src=twsrc%5Etfw"
        >
          Tweets by sana_natori
        </a>
      </TimelineContainer>
    </Container>
  );
}
