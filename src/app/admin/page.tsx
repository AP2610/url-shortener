import { Heading } from '@/components/ui/heading';
import prisma from '@/lib/db/prisma';
import { type URL } from '@/generated/prisma';
import { URLRecordTable } from '@/components/features/url-record-table';

// TODO add revalidate

export const dynamic = 'force-dynamic';

// TODO: consider using unstable_cache for db operations

const AdminPage = async () => {
  // TODO: Add guard for admin authentication
  // TODO: Add sorting for createdAt, lastVisitedAt, and visitCount
  // TODO: Fetch additional records on scroll

  const allUrlRecords: URL[] = await prisma.uRL.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="container mx-auto h-full gap-10 space-y-8 px-4 pt-[calc(var(--header-height)+3rem)] pb-10">
      <Heading level="h1">Admin</Heading>

      <URLRecordTable urlRecords={allUrlRecords} />
    </div>
  );
};

export default AdminPage;
