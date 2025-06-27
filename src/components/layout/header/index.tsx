'use client';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CiLogin } from 'react-icons/ci';

export const Header = () => {
  const pathname = usePathname();

  const isLoginPage = pathname === '/login';
  const isRegisterPage = pathname === '/sign-up';

  if (isLoginPage || isRegisterPage) return null;

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-[var(--header-height)] items-center justify-between p-4 md:px-8 md:py-4">
      <Link href="/">
        <Logo layoutId="logo" />
      </Link>

      <div className="flex items-center gap-4 text-sm">
        <Button variant="secondary" className="flex items-center gap-2 rounded-full">
          Login
          <CiLogin className="h-6 w-6" />
        </Button>

        <Button variant="primary" className="rounded-full">
          Register Now
        </Button>
      </div>
    </header>
  );
};
