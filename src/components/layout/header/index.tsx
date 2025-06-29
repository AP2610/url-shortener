'use client';

import { AnimatedElementPresence } from '@/components/ui/animation/animated-element-presence';
import { Logo } from '@/components/ui/logo';
import { MyLink } from '@/components/ui/my-link';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CiLogin } from 'react-icons/ci';

export const Header = () => {
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';
  const isRegisterPage = pathname === '/sign-up';

  if (isLoginPage || isRegisterPage) return null;

  return (
    <header className="fixed top-0 right-0 left-0 z-50 container mx-auto flex h-[var(--header-height)] items-center justify-between bg-background p-4">
      <Link href="/">
        <Logo layoutId="logo" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} />
      </Link>

      {/* TODO: remove buttons when user is logged in */}
      <AnimatedElementPresence
        shouldWaitToAnimateFor="entry-animation"
        className="block text-sm md:flex md:items-center md:gap-4"
      >
        <MyLink href="/login" variant="secondary" className="flex items-center gap-2 rounded-full">
          Login
          <CiLogin className="h-6 w-6" />
        </MyLink>

        <MyLink href="/sign-up" variant="primary" className="hidden rounded-full md:flex">
          Register Now
        </MyLink>
      </AnimatedElementPresence>
    </header>
  );
};
