'use client';

import { cn } from '@/lib/utils/cn';

import { type URL } from '@/generated/prisma';
import { formatDate } from '@/lib/utils/format-date';
import { TableHeader } from './table-header';
import { TABLE_HEADERS } from './constants';

interface URLRecordTableProps {
  urlRecords: URL[];
  containerClassName?: React.ComponentProps<'div'>['className'];
  tableClassName?: React.ComponentProps<'table'>['className'];
}

export const URLRecordTable = ({ urlRecords, containerClassName, tableClassName }: URLRecordTableProps) => {
  const tableCellClasses = 'border border-dark-gray px-4 py-2 truncate';

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
              <td className={cn(tableCellClasses)}>{index + 1}</td>
              <td className={cn(tableCellClasses)}>{urlRecord.url}</td>
              <td className={cn(tableCellClasses)}>{urlRecord.shortUrl}</td>
              <td className={cn(tableCellClasses)}>{formatDate(urlRecord.createdAt)}</td>
              <td className={cn(tableCellClasses)}>{urlRecord.lastVisitedAt ? formatDate(urlRecord.lastVisitedAt) : 'N/A'}</td>
              <td className={cn(tableCellClasses)}>{urlRecord.visitCount}</td>
              <td className={cn(tableCellClasses)}>{urlRecord.expiresAt ? formatDate(urlRecord.expiresAt) : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
