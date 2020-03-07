import { ButtonInfo } from './types';
import { arrayFlatten } from './flatten';

export function buttonNormalize(buttons: ButtonInfo[][], button1dArr: ButtonInfo[]): number[] {
  return arrayFlatten(
    buttons.map((btns) =>
      btns.map((btn) => button1dArr.findIndex((button) => btn.value === button.value && btn['file-name'] === button['file-name'])),
    ),
  );
}
