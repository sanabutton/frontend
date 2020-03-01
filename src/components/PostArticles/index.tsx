import React, { Fragment } from 'react';
import { Text } from './styles';
import { ButtonsBySlug } from '../../lib/types';
import { Button } from '../Button';
import { slugTitleMap } from '../../constants/index';

type Props = {
  slugs: string[];
  buttonsBySlug: ButtonsBySlug;
};

export function PostArticles({ slugs, buttonsBySlug }: Props) {
  return (
    <Fragment>
      {slugs.map((slug) => (
        <Fragment key={slug}>
          <Text>{slugTitleMap[slug]}</Text>
          {buttonsBySlug[slug].map((button) => (
            <Button key={button.value} button={button} />
          ))}
          <hr style={{ margin: '1em 0' }} />
        </Fragment>
      ))}
    </Fragment>
  );
}
