import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'", // Allow inline scripts for React
              "style-src 'self' 'unsafe-inline'", // Allow inline styles for Tailwind
              "img-src 'self' data:",
              "font-src 'self'",
              "connect-src 'self'",
              "frame-ancestors 'none'", // Prevent clickjacking
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
