import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui'],
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
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}>
          <div className="flex h-dvh flex-col">
            <Header />

            <main className="flex-grow">{children}</main>

            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
