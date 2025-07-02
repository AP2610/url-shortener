'use client';

import { cn } from '@/lib/utils/cn';
import { FaSortDown } from 'react-icons/fa';
import { type SortDirection, type TableHeaderWidth } from './types';

interface TableHeaderProps {
  children: React.ReactNode;
  className?: React.ComponentProps<'th'>['className'];
  width: TableHeaderWidth;
  onClick?: () => void;
  sortDirection?: SortDirection;
  isSortable?: boolean;
}

export const TableHeader = ({ children, className, width, onClick, sortDirection, isSortable }: TableHeaderProps) => {
  const tableHeaderClasses = cn(
    'resize-x overflow-hidden border border-dark-gray transition-all duration-300',
    {
      'w-16': width === 'small',
      'w-24': width === 'medium',
      'w-32': width === 'large',
      'w-64': width === 'xl',
      'cursor-pointer hover:bg-dark-gray/40': isSortable,
    },
    className,
  );

  return (
    <th className={cn(tableHeaderClasses, className)}>
      <button onClick={onClick} className="flex w-full items-center justify-between px-4 py-2">
        <span className="flex-grow text-left">{children}</span>

        {isSortable && (
          <FaSortDown
            className={cn('ml-2 h-4 w-4 text-primary transition-all duration-300 hover:scale-105', {
              'rotate-180': sortDirection === 'asc',
              '-rotate-90': sortDirection === undefined,
            })}
          />
        )}
      </button>
    </th>
  );
};
