import { type TableHeader } from './types';

export const TABLE_HEADERS: TableHeader[] = [
  {
    id: 'no',
    isSortable: false,
    label: 'No.',
    width: 'small',
  },
  {
    id: 'url',
    isSortable: false,
    label: 'URL',
    width: 'xl',
  },
  {
    id: 'shortUrl',
    isSortable: false,
    label: 'Short URL',
    width: 'medium',
  },
  {
    id: 'createdAt',
    isSortable: true,
    label: 'Created At',
    width: 'large',
  },
  {
    id: 'lastVisitedAt',
    isSortable: true,
    label: 'Last Visited At',
    width: 'large',
  },
  {
    id: 'visitCount',
    isSortable: true,
    label: 'Visit Count',
    width: 'medium',
  },
  {
    id: 'expiresAt',
    isSortable: true,
    label: 'Expires At',
    width: 'large',
  },
];
