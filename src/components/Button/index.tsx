import React from 'react';
import { ButtonInfo } from '../../lib/types';

type Props = {
  button: ButtonInfo;
};

export function Button({ button }: Props) {
  return <button>{button.value}</button>;
}
