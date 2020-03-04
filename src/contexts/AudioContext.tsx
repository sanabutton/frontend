import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { AudioState } from '../lib/types';

const initialState: AudioState = {
  cache: [],
  playingButtonId: undefined,
};

export const AudioContext = createContext<[AudioState, Dispatch<SetStateAction<AudioState>>]>([initialState, (_) => {}]);

type Props = {
  children: ReactNode;
};

export function AudioProvider({ children }: Props) {
  return <AudioContext.Provider value={useState<AudioState>(initialState)}>{children}</AudioContext.Provider>;
}
