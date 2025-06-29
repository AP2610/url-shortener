import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';
import { EntryAnimation } from '@/components/ui/animation/entry-animation';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Shortly',
  description: 'Shortly is a URL shortening service',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}>
        <div className="flex h-dvh flex-col">
          <Header />

          <main className="flex-grow">
            <EntryAnimation />
            {children}
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
