'use client';

import { type URL } from '@/generated/prisma';
import { cn } from '@/lib/utils/cn';
import { formatDate } from '@/lib/utils/format-date';
import { useMemo, useState } from 'react';
import { TABLE_HEADERS } from './constants';
import { TableCell } from './table-cell';
import { TableHeader } from './table-header';
import { type SortableFields, type SortDirection } from './types';

interface URLRecordTableProps {
  urlRecords: URL[];
  containerClassName?: React.ComponentProps<'div'>['className'];
  tableClassName?: React.ComponentProps<'table'>['className'];
}

const getSortedFields = (urlRecords: URL[], sortField: SortableFields, sortDirection: SortDirection) => {
  return urlRecords.sort((a, b) => {
    // If both fields are null, they are equal, no sorting needed
    if (a[sortField] === null && b[sortField] === null) return 0;

    // if a is null, b is not, b should be first
    if (a[sortField] === null) return 1;

    // if b is null, a is not, a should be first
    if (b[sortField] === null) return -1;

    if (typeof a[sortField] === 'number' && typeof b[sortField] === 'number') {
      return sortDirection === 'asc' ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
    }

    if (sortField === 'createdAt' || sortField === 'lastVisitedAt' || sortField === 'expiresAt') {
      const aDate = new Date(a[sortField]);
      const bDate = new Date(b[sortField]);
      return sortDirection === 'asc' ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
    }

    // Fallback
    return 0;
  });
};

export const URLRecordTable = ({ urlRecords, containerClassName, tableClassName }: URLRecordTableProps) => {
  const [sortField, setSortField] = useState<SortableFields>('createdAt');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const sortedUrlRecords = useMemo(() => {
    return getSortedFields(urlRecords, sortField, sortDirection);
  }, [urlRecords, sortField, sortDirection]);

  const handleSort = (field: SortableFields) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
    }
  };

  return (
    <div className={cn('w-full overflow-x-auto', containerClassName)}>
      {/* Table fixed forces table to respect column widths, critical for truncating to work on the cells */}
      <table
        className={cn(
          'w-full min-w-max table-fixed border-separate border-spacing-0 rounded-sm border-2 border-dark-gray bg-blue-black',
          tableClassName,
        )}
      >
        <thead>
          <tr>
            {TABLE_HEADERS.map(({ id, isSortable, label, width }) => (
              <TableHeader
                key={id}
                width={width}
                onClick={isSortable ? () => handleSort(id as SortableFields) : undefined}
                sortDirection={sortField === id ? sortDirection : undefined}
                isSortable={isSortable}
              >
                {label}
              </TableHeader>
            ))}
          </tr>
        </thead>

        <tbody>
          {sortedUrlRecords.map((urlRecord, index) => (
            <tr key={urlRecord.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{urlRecord.url}</TableCell>
              <TableCell>{urlRecord.shortUrl}</TableCell>
              <TableCell>{formatDate(new Date(urlRecord.createdAt))}</TableCell>
              <TableCell>{urlRecord.lastVisitedAt ? formatDate(new Date(urlRecord.lastVisitedAt)) : 'N/A'}</TableCell>
              <TableCell>{urlRecord.visitCount}</TableCell>
              <TableCell>{urlRecord.expiresAt ? formatDate(new Date(urlRecord.expiresAt)) : 'N/A'}</TableCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
