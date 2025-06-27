import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import Link from 'next/link';
import { CiLogin } from 'react-icons/ci';

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 md:px-8 md:py-4">
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
