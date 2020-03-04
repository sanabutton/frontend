import React, { useMemo } from 'react';
import { Text } from './styles';
import { Button } from '../Button';
import { ButtonInfo } from '../../lib/types';
import { getTitleTextAndLink } from '../../lib/getTitleTextAndLink';

type Props = {
  title: string;
  buttonIds: number[];
  id: string;
  tweedId?: string;
  streamId?: string;
  buttonInfoList: ButtonInfo[];
};

export function PostArticles(props: Props) {
  const { title, buttonIds, id, tweedId, streamId, buttonInfoList } = props;
  const [text, link] = useMemo(() => {
    return getTitleTextAndLink(streamId, tweedId);
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
      {buttonIds.map((buttonId) => (
        <Button
          key={buttonId}
          buttonId={buttonId}
          buttonInfo={buttonInfoList[buttonId]}
          sourceTitle={title}
          sourceLink={link}
          streamId={streamId}
          tweetId={tweedId}
        />
      ))}
    </div>
  );
}
