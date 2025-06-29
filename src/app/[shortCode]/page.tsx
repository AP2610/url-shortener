import { getUrlRecord } from '@/actions/db/get-url-record';
import { incrementVisitCount } from '@/actions/db/increment-visit-count';
import { setLastVisited } from '@/actions/db/set-last-visited';
import { redirect } from 'next/navigation';

interface ShortUrlPageProps {
  params: Promise<{ shortCode: string }>;
}

export default async function ShortUrlPage({ params }: ShortUrlPageProps) {
  const { shortCode } = await params;

  const { hasError, message, url, isExpired } = await getUrlRecord(shortCode);

  console.log(isExpired);

  if (isExpired) {
    // TODO: Show modal to user with expiry message and button to go back to home page
    return <div>URL has expired</div>;
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
