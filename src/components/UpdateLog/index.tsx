import React, { Fragment } from 'react';
import { format } from 'date-fns';
import { Container, Title, LogContainer, LogContent, Text } from './styles';
import { useEnhance } from './enhance';

// TODO: createdAt, updatedAtがあるのか確認が必要
type Log = {
  name: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Props = {
  logs: Log[];
};

export function UpdateLog(props: Props) {
  const { createLogs, updateLogs } = useEnhance(props);

  return (
    <Fragment>
      <Container>
        <Title>追加履歴</Title>
        <LogContainer>
          {createLogs.map((log) => (
            <LogContent key={log.name + log.date}>
              <Text>{log.date}</Text>
              <Text>
                <a href={log.link}>『{log.name}』</a>
                のボタンを追加しました
              </Text>
            </LogContent>
          ))}
        </LogContainer>
      </Container>
      <Container>
        <Title>更新履歴</Title>
        <LogContainer>
          {updateLogs.map((log) => (
            <LogContent key={log.name + log.date}>
              <Text>{log.date}</Text>
              <Text>
                <a href={log.link}>『{log.name}』</a>
                にボタンを追加しました
              </Text>
            </LogContent>
          ))}
        </LogContainer>
      </Container>
    </Fragment>
  );
}
