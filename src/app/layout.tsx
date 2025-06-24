import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Linkly',
  description: 'Linkly is a URL shortening service',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-dvh flex-col">
          {/* Placeholder */}
          <header>
            <div className="container mx-auto px-4 py-4">
              <h1 className="text-2xl font-bold">Linkly</h1>
            </div>
          </header>

          <main className="flex-grow">{children}</main>

          {/* Placeholder */}
          <footer>
            <div className="container mx-auto px-4 py-4">
              <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Linkly. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
