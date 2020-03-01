export type ButtonsBySlug = {
  [slug: string]: ButtonInfo[];
};

export type ButtonInfo = {
  'file-name': string;
  value: string;
};

export type AudioState = {
  cache: { [fileName: string]: HTMLAudioElement };
  playingAudioName: string | undefined;
};
