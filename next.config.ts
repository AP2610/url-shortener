import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'kgtxkn4x-3000.euw.devtunnels.ms', '*.devtunnels.ms'],
    },
    useCache: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "style-src 'self' 'unsafe-inline'", // Allow inline styles for Tailwind
              "img-src 'self' data:",
              "font-src 'self'",
              "frame-ancestors 'none'", // Prevent clickjacking
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
