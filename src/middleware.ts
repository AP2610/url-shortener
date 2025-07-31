import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { isValidShortcode } from './lib/utils/shortcode-utils';

// Public routes
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)', // Webhook endpoints
  '/api/redirect(.*)', // Redirect API route
]);

export default clerkMiddleware(async (auth, request: NextRequest) => {
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

  // Make public routes accessible without auth and protect all other routes
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Short code matcher
    '/(_[a-zA-Z0-9_-]+)',
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api)(.*)',
  ],
};
