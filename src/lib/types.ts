export type ButtonsBySlug = {
  [slug: string]: ButtonInfo[];
};

export type BroadCast = {
  id: string;
  title: string;
  streamId?: string;
  tweedId?: string;
  categories: string[];
  buttons: number[];
  createdAt: Date;
  updatedAt?: Date;
};

export type ButtonInfo = {
  'file-name': string;
  value: string;
};

export type AudioState = {
  cache: { [fileName: string]: HTMLAudioElement };
  playingAudioName: string | undefined;
};
