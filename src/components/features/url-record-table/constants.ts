import { type TableHeaderWidth } from './table-header';

export const TABLE_HEADERS: { label: string; width: TableHeaderWidth }[] = [
  {
    label: 'No.',
    width: 'small',
  },
  {
    label: 'URL',
    width: 'xl',
  },
  {
    label: 'Short URL',
    width: 'medium',
  },
  {
    label: 'Created At',
    width: 'large',
  },
  {
    label: 'Last Visited At',
    width: 'large',
  },
  {
    label: 'Visit Count',
    width: 'medium',
  },
  {
    label: 'Expires At',
    width: 'large',
  },
];
