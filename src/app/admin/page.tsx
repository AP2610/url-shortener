import { Heading } from '@/components/ui/heading';
import prisma from '@/lib/db/prisma';
import { URLRecordTable } from '@/components/features/url-record-table';
import { isAdmin } from '@/server-functions/db/is-admin';
import { NoAccessModal } from '@/components/features/admin/no-access-modal';

// TODO: consider using unstable_cache for db operations

// Route is revalidated when a new url is created.
const AdminPage = async () => {
  // TODO: Fetch additional records on scroll
  const hasAdminAccess = await isAdmin();

  if (!hasAdminAccess) {
    return <NoAccessModal hasAccess={hasAdminAccess} redirectTo="/" redirectToLabel="home page" />;
  }

  const allUrlRecords = await prisma.uRL.findMany({
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
