import { Broadcast, ButtonInfo } from '../../lib/types';
import React, { Fragment, useMemo } from 'react';
import { PostArticles } from '../PostArticles';
import { Button } from '../Button';
import { audioPlayer } from '../../audio-player';

type Props = {
  broadcasts: Broadcast[];
  buttonInfoList: ButtonInfo[];
};

export function Broadcasts({ broadcasts, buttonInfoList }: Props) {
  return useMemo(
    () => (
      <>
        {broadcasts.map((broadcast) => (
          <Fragment key={broadcast.id}>
            <PostArticles broadcast={broadcast} buttonInfoList={buttonInfoList}>
              {broadcast.buttonIds.map((buttonId) => (
                <Button
                  key={buttonId}
                  id={buttonId}
                  buttonInfo={buttonInfoList[buttonId]}
                  handleClick={(id: number) => audioPlayer.emitPlay(broadcast, id)}
                />
              ))}
            </PostArticles>
            <hr style={{ margin: '1em 0' }} />
          </Fragment>
        ))}
      </>
    ),
    [],
  );
}
