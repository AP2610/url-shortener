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

// TODO: Performance: Add caching for DB calls.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <meta name="apple-mobile-web-app-title" content="Shortly" />
          <link rel="manifest" href="/manifest/site.webmanifest" />
        </head>

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
