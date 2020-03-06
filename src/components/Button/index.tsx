import React from 'react';
import { CustomButton } from './styles';

import { ButtonInfo } from '../../lib/types';

type Props = {
  id: number;
  buttonInfo: ButtonInfo;
  handleClick: (buttonId: number) => void;
};

export function Button({ id, buttonInfo, handleClick }: Props) {
  return (
    <CustomButton id={`${id}`} onClick={() => handleClick(id)}>
      {buttonInfo.value}
    </CustomButton>
  );
}
