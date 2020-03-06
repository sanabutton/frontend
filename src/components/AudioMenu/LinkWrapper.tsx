import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  url?: string;
};

export function LinkWrapper({ children, url }: Props) {
  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <>{children}</>
  );
}
