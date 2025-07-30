import { URLRecordTable } from '@/components/features/url-record-table';
import { ErrorModal } from '@/components/ui/errors/error-modal';
import { Heading } from '@/components/ui/heading';
import { getUserUrls } from '@/server-functions/db/get-user-urls';

// TODO: Convert to dashboard.
const MyUrlsPage = async () => {
  const { success, errorType, longMessage, urls } = await getUserUrls();

  if (!success) {
    return (
      <ErrorModal
        success={success}
        errorType={errorType}
        message={longMessage}
        redirectTo="/"
        redirectToLabel="Back to home"
        isCloseable={false}
      />
    );
  }

  return (
    <div className="container mx-auto h-full gap-10 space-y-8 px-4 pt-[calc(var(--header-height)+3rem)] pb-10">
      <Heading level="h1">My URLs</Heading>

      <URLRecordTable urlRecords={urls} />
    </div>
  );
};

export default MyUrlsPage;
