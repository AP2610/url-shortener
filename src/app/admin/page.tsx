import { Heading } from '@/components/ui/heading';
import prisma from '@/lib/db/prisma';
import { type URL } from '../../../generated/prisma';
import { formatDate } from '@/lib/utils/format-date';
import { cn } from '@/lib/utils/cn';

const AdminPage = async () => {
  // TODO: Add guard for admin authentication
  // TODO: Add sorting for createdAt, lastVisitedAt, and visitCount
  // TODO: Fetch additional records on scroll

  const allUrlRecords: URL[] = await prisma.uRL.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  const tableHeaderClasses = 'border border-dark-gray px-4 py-2 resize-x overflow-hidden';
  const tableCellClasses = 'border border-dark-gray px-4 py-2 truncate';

  return (
    <div className="container mx-auto h-full gap-10 space-y-8 px-4 pt-[calc(var(--header-height)+3rem)] pb-10">
      <Heading level="h1">Admin</Heading>

      <div className="w-full overflow-x-auto">
        {/* Table fixed forces table to respect column widths, critical for truncating to work on the cells */}
        <table className="w-full min-w-max table-fixed border-separate border-spacing-0 rounded-sm border-2 border-dark-gray bg-blue-black">
          <thead>
            <tr>
              <th className={cn(tableHeaderClasses, 'w-16')}>No.</th>
              <th className={cn(tableHeaderClasses, 'w-64')}>URL</th>
              <th className={cn(tableHeaderClasses, 'w-32')}>Short URL</th>
              <th className={cn(tableHeaderClasses, 'w-32')}>Created At</th>
              <th className={cn(tableHeaderClasses, 'w-32')}>Last Visited At</th>
              <th className={cn(tableHeaderClasses, 'w-24')}>Visit Count</th>
              <th className={cn(tableHeaderClasses, 'w-32')}>Expires At</th>
            </tr>
          </thead>
          <tbody>
            {allUrlRecords.map((urlRecord, index) => (
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
    </div>
  );
};

export default AdminPage;
