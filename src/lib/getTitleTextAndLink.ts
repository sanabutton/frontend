export function getTitleTextAndLink(streamId?: string, tweedId?: string): [string, string] | [undefined, undefined] {
  if (streamId) return ['配信ページ', `https://youtu.be/${streamId}`];
  else if (tweedId) return ['ツイート', `https://twitter.com/sana_natori/status/${tweedId}`];
  else return [undefined, undefined];
}
