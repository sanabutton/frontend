import React from 'react';
import { Site } from '../../lib/types';
import { format } from 'date-fns';
import { Link, UnorderedList, List } from './styles';

type Props = {
  sites: Site[];
};
export function BroadCaseLinkList(props: Props) {
  return (
    <div id="article_index">
      <Link href="#">ページの一番上に戻る</Link>
      <UnorderedList>
        {props.sites.map((site) => (
          <List key={site.id}>
            <a href={`#${site.id}`}>
              {format(new Date(site.date), 'yyyy/MM/dd')}：{site.slug}
            </a>
          </List>
        ))}
      </UnorderedList>
    </div>
  );
}
