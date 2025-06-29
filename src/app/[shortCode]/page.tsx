import { getUrlRecord } from '@/actions/db/get-url-record';
import { incrementVisitCount } from '@/actions/db/increment-visit-count';
import { setLastVisited } from '@/actions/db/set-last-visited';
import { ExpiryModal } from '@/components/features/expiry-modal';
import { AnimatedElementPresence } from '@/components/ui/animation/animated-element-presence';
import { Heading } from '@/components/ui/heading';
import { MyLink } from '@/components/ui/my-link';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface ShortUrlPageProps {
  params: Promise<{ shortCode: string }>;
}

export default async function ShortUrlPage({ params }: ShortUrlPageProps) {
  const { shortCode } = await params;

  const { hasError, message, url, isExpired } = await getUrlRecord(shortCode);

  if (isExpired) {
    // TODO: Show modal to user with expiry message and button to go back to home page
    return (
      <>
        <ExpiryModal isExpired={isExpired}>
          <Heading level="h1" className="mb-6">
            Expired Link
          </Heading>

          <div className="flex flex-col gap-4">
            <p>Whoops! Looks like that link has expired</p>
            <MyLink variant="primary" href="/">
              Homepage
            </MyLink>
          </div>
        </ExpiryModal>

        <AnimatedElementPresence
          delay={2}
          className="container mx-auto flex h-full flex-col items-center justify-center px-4 pt-[var(--header-height)] pb-10"
        >
          <Heading level="h1" className="mb-6">
            Expired Link
          </Heading>

          <MyLink variant="primary" href="/">
            Homepage
          </MyLink>
        </AnimatedElementPresence>
      </>
    );
  }

  if (url && !hasError) {
    await incrementVisitCount(shortCode);

    // TODO: Backfill last visited at for all url records
    await setLastVisited({ shortCode });
    redirect(url.url);
  } else {
    // TODO: Show modal to user with error message and button to go back to home page
    return <div>{message}</div>;
  }
}
