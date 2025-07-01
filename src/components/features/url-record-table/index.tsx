'use client';

import { type URL } from '@/generated/prisma';
import { formatDate } from '@/lib/utils/format-date';
import { cn } from '@/lib/utils/cn';

import { TABLE_HEADERS } from './constants';
import { TableCell } from './table-cell';
import { TableHeader } from './table-header';

interface URLRecordTableProps {
  urlRecords: URL[];
  containerClassName?: React.ComponentProps<'div'>['className'];
  tableClassName?: React.ComponentProps<'table'>['className'];
}

export const URLRecordTable = ({ urlRecords, containerClassName, tableClassName }: URLRecordTableProps) => {
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
            {TABLE_HEADERS.map((header) => (
              <TableHeader key={header.label} width={header.width}>
                {header.label}
              </TableHeader>
            ))}
          </tr>
        </thead>

        <tbody>
          {urlRecords.map((urlRecord, index) => (
            <tr key={urlRecord.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{urlRecord.url}</TableCell>
              <TableCell>{urlRecord.shortUrl}</TableCell>
              <TableCell>{formatDate(urlRecord.createdAt)}</TableCell>
              <TableCell>{urlRecord.lastVisitedAt ? formatDate(urlRecord.lastVisitedAt) : 'N/A'}</TableCell>
              <TableCell>{urlRecord.visitCount}</TableCell>
              <TableCell>{urlRecord.expiresAt ? formatDate(urlRecord.expiresAt) : 'N/A'}</TableCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
