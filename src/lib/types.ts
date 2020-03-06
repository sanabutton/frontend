export type ButtonsBySlug = {
  [slug: string]: ButtonInfo[];
};

export type Broadcast = {
  id: string;
  title: string;
  streamId?: string;
  tweedId?: string;
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

export type AppState = {
  audioId?: number;
  sourceTitle?: string;
  thumbnailUrl?: string;
  sourceLink?: string;
  streamId?: string;
  tweedId?: string;
};
