import React from 'react';
import { CustomButton } from './styles';

import { ButtonInfo } from '../../lib/types';

type Props = {
  id: number;
  buttonInfo: ButtonInfo;
  onButtonClick: (buttonId: number) => void;
};

export function Button({ id, buttonInfo, onButtonClick }: Props) {
  return (
    <CustomButton id={`${id}`} onClick={() => onButtonClick(id)}>
      {buttonInfo.value}
    </CustomButton>
  );
}
