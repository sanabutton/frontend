import React from 'react';
import { Text } from './styles';
import { Button } from '../Button';

import { ButtonInfo } from '../../lib/types';

type Props = {
  title: string;
  buttons: ButtonInfo[];
  id: string;
};

export function PostArticles(props: Props) {
  const { title, buttons, id } = props;

  return (
    <div id={id}>
      <Text>{title}</Text>
      {buttons.map((button) => (
        <Button key={button.value} button={button} />
      ))}
    </div>
  );
}
