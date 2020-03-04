export type ButtonsBySlug = {
  [slug: string]: ButtonInfo[];
};

export type Broadcast = {
  id: string;
  title: string;
  streamId?: string;
  tweetId?: string;
  categories: string[];
  buttonIds: number[];
  createdAt: Date;
  updatedAt?: Date;
};

export type Site = {
  id: string;
  slug: string;
  date: Date;
};

export type ButtonInfo = {
  'file-name': string;
  value: string;
};

export type AudioCache = {
  audio: HTMLAudioElement;
  sourceTitle: string;
  sourceLink?: string;
  streamId?: string;
  tweetId?: string;
};

export type AudioState = {
  cache: AudioCache[];
  playingButtonId: number | undefined;
};
