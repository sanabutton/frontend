import React, { useMemo } from 'react';
import { Text } from './styles';
import { Button } from '../Button';

import { ButtonInfo } from '../../lib/types';

type Props = {
  title: string;
  buttons: ButtonInfo[];
  id: string;
  tweedId?: string;
  streamId?: string;
};

export function PostArticles(props: Props) {
  const { title, buttons, id, tweedId, streamId } = props;
  const [text, link] = useMemo(() => {
    if (streamId) return ['配信ページ', `https://youtu.be/${streamId}`];
    else if (tweedId) return ['ツイート', `https://twitter.com/sana_natori/status/${tweedId}`];
    else return [null, null];
  }, [streamId, tweedId]);

  return (
    <div id={id}>
      <Text>
        {title}
        {link && text && (
          <a href={link} target="_blank" rel="noopener noreferrer">
            （{text}）
          </a>
        )}
      </Text>
      {buttons.map((button) => (
        <Button key={button.value} button={button} />
      ))}
    </div>
  );
}
