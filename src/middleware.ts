import { NextRequest, NextResponse } from 'next/server';
import { isValidShortcode } from './lib/utils/shortcode-utils';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.length === 8 && isValidShortcode(pathname)) {
    const shortCode = pathname.slice(1);

    const apiUrl = new URL(`/api/redirect/${shortCode}`, request.url);

    return NextResponse.redirect(apiUrl);
  }

  // Redirect to API route for error handling
  if (pathname.startsWith('/_') && !isValidShortcode(pathname)) {
    const shortCode = pathname.slice(1);

    const apiUrl = new URL(`/api/redirect/${shortCode}`, request.url);

    return NextResponse.redirect(apiUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/(_[a-zA-Z0-9]+)',
};
