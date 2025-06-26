import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';
import { Header } from '@/components/layout/header';

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
        <div className="flex min-h-dvh flex-col">
          <Header />

          <main className="flex-grow">{children}</main>

          {/* Placeholder */}
          <footer>
            <div className="container mx-auto px-4 py-4">
              <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Linkly. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
