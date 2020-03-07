import React, { ReactNode, useMemo } from 'react';
import { Text } from './styles';
import { Broadcast, ButtonInfo } from '../../lib/types';
import { getSourceTypeTextAndLink } from '../../lib/getSourceTypeTextAndLink';

type Props = {
  children: ReactNode;
  broadcast: Broadcast;
  buttonInfoList: ButtonInfo[];
};

export function PostArticles({ children, broadcast }: Props) {
  const { title, id, tweedId, streamId } = broadcast;
  const [text, link] = useMemo(() => {
    return getSourceTypeTextAndLink(streamId, tweedId);
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
      {children}
    </div>
  );
}
