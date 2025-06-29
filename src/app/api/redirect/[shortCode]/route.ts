import { getUrlRecord } from '@/actions/db/get-url-record';
import { incrementVisitCount } from '@/actions/db/increment-visit-count';
import { setLastVisited } from '@/actions/db/set-last-visited';
import { isValidShortcode } from '@/lib/utils/shortcode-utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ shortCode: string }> }) {
  const { shortCode } = await params;

  try {
    if (!shortCode || !isValidShortcode(shortCode)) {
      return NextResponse.json(
        {
          error: 'Invalid shortcode format',
          shortCode,
          message: 'Shortcode must be exactly 6 alphanumeric characters',
        },
        { status: 400 },
      );
    }

    const { hasError, message, url, isExpired } = await getUrlRecord(shortCode);

    // TODO: Implement better error handling
    if (hasError || !url) {
      return NextResponse.json(
        {
          error: hasError,
          shortCode,
          message: message,
        },
        { status: 404 },
      );
    }

    if (isExpired) {
      return NextResponse.redirect(new URL('/expired', request.url));
    }

    incrementVisitCount(shortCode).catch(console.error);
    setLastVisited({ shortCode }).catch(console.error);

    return NextResponse.redirect(url.url);
  } catch (error) {
    console.error('Redirect API error:', error);
    return NextResponse.redirect(new URL('/', request.url));
  }
}
