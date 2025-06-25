import { redirect } from 'next/navigation';
import { getUrlRecord, incrementVisitCount } from '@/lib/db/utils';

interface ShortUrlPageProps {
  params: { shortCode: string };
}

export default async function ShortUrlPage({ params }: ShortUrlPageProps) {
  const { shortCode } = params;

  const { hasError, message, url, isExpired } = await getUrlRecord(shortCode);

  console.log(isExpired);

  if (isExpired) {
    // Show modal to user with error message and button to go back to home page
    return <div>URL has expired</div>;
  }

  if (url && !hasError) {
    await incrementVisitCount(shortCode);
    redirect(url.url);
  } else {
    // Show modal to user with error message and button to go back to home page
    return <div>{message}</div>;
  }
}
