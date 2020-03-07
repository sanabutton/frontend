import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { AppState } from '../lib/types';

const initialState: AppState = {};

export const AudioContext = createContext<[AppState, Dispatch<SetStateAction<AppState>>]>([initialState, (_) => {}]);

type Props = {
  children: ReactNode;
};

export function AudioProvider({ children }: Props) {
  return <AudioContext.Provider value={useState<AppState>(initialState)}>{children}</AudioContext.Provider>;
}
