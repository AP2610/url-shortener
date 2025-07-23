'use client';

import { UserMenu } from '@/components/features/authentication/user-menu';
import { AnimatedElementPresence } from '@/components/ui/animation/animated-element-presence';
import { HeaderLogo } from '@/components/ui/logo/header-logo';
import { MyLink } from '@/components/ui/my-link';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CiLogin } from 'react-icons/ci';

// TODO: Add a button to the admin panel if the user is an admin.
// TODO: Add a button to see your shortlinks.
export const Header = () => {
  const pathname = usePathname();

  const isSignInPages = pathname === '/sign-in';
  const isSignUpPages = pathname === '/sign-up';
  const isSSOCallback = pathname === '/sso-callback';

  if (isSignInPages || isSignUpPages || isSSOCallback) {
    return null;
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50 container mx-auto flex h-[var(--header-height)] items-center justify-between bg-background p-4">
      <Link href="/">
        <HeaderLogo layoutId="logo" />
      </Link>

      <AnimatedElementPresence
        shouldWaitToAnimateFor="entry-animation"
        className="block text-sm md:flex md:items-center md:gap-4"
      >
        <SignedOut>
          <MyLink href="/sign-in" variant="secondary" className="flex items-center gap-2 rounded-full">
            Sign in
            <CiLogin className="h-6 w-6" />
          </MyLink>

          <MyLink href="/sign-up" variant="primary" className="hidden rounded-full md:flex">
            Sign up
          </MyLink>
        </SignedOut>

        <SignedIn>
          <UserMenu />
        </SignedIn>
      </AnimatedElementPresence>
    </header>
  );
};
