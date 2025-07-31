'use client';

import { UserMenu } from '@/components/features/authentication/user-menu';
import { AnimatedElementPresence } from '@/components/ui/animation/animated-element-presence';
import { HomeLinkIcon } from '@/components/ui/home-link-icon';
import { HoverTapWrapper } from '@/components/ui/hover-tap-wrapper';
import { HeaderLogo } from '@/components/ui/logo/header-logo';
import { MyLink } from '@/components/ui/my-link';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CiLogin } from 'react-icons/ci';

export const Header = () => {
  const pathname = usePathname();

  const isSignInPages = pathname === '/sign-in';
  const isSignUpPages = pathname === '/sign-up';
  const isSSOCallback = pathname.includes('/sso-callback');

  if (isSignInPages || isSignUpPages || isSSOCallback) {
    return null;
  }

  return (
    <header className="fixed top-0 right-0 left-0 z-50 container mx-auto flex h-[var(--header-height)] items-center justify-between bg-background p-4">
      <motion.div layoutId="logo">
        <Link href="/">
          <HeaderLogo />
        </Link>
      </motion.div>

      <AnimatedElementPresence shouldWaitToAnimateFor="entry-animation" className="flex items-center gap-4 text-sm">
        <SignedOut>
          <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <MyLink href="/sign-in" variant="secondary" className="flex items-center gap-2 rounded-full">
              Sign in
              <CiLogin className="h-6 w-6" />
            </MyLink>
          </motion.div>

          <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <MyLink href="/sign-up" variant="primary" className="hidden rounded-full md:flex">
              Sign up
            </MyLink>
          </motion.div>
        </SignedOut>

        <SignedIn>
          <MyLink href="/my-urls" variant="inline" className="mr-4">
            My URLs
          </MyLink>

          <UserMenu />
        </SignedIn>

        {pathname !== '/' && (
          <HoverTapWrapper>
            <HomeLinkIcon />
          </HoverTapWrapper>
        )}
      </AnimatedElementPresence>
    </header>
  );
};
