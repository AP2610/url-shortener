import { Logo } from '@/components/ui/logo';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shortly',
  description: 'Sign up or login to your Shortly account',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative h-full">
      <Link href="/" className="absolute top-4 left-12">
        <Logo />
      </Link>

      <div className="h-full">{children}</div>
    </div>
  );
}
