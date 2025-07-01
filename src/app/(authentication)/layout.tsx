import { AnimatedRadialGradientBackground } from '@/components/ui/animation/animated-radial-gradient-background';
import { HeaderLogo } from '@/components/ui/logo/header-logo';
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
      <AnimatedRadialGradientBackground />

      <Link href="/" className="absolute top-4 left-4 z-10 md:left-12">
        <HeaderLogo />
      </Link>

      <div className="h-full">{children}</div>
    </div>
  );
}
