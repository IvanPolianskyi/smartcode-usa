import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep Node-only Telegram SDK out of the bundler (fixes "reading 'node'" crash)
  serverExternalPackages: ['node-telegram-bot-api'],

  // Production optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 1 year — дозволяє CDN/браузеру кешувати optimized зображення
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  // Enable static file serving for uploads
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: '/uploads/:path*',
      },
    ];
  },

  // Cache headers for all static public assets
  async headers() {
    const IMMUTABLE_CACHE = 'public, max-age=31536000, immutable';
    const staticAssetSources = [
      '/uploads/:path*',
      '/logos/:path*',
      '/comments/:path*',
      '/projects/:path*',
      '/tiktoklogo/:path*',
      '/:file((?!.*\\.html$).*\\.(?:png|jpg|jpeg|svg|gif|webp|avif|ico|woff|woff2|ttf|otf))',
    ];

    return [
      // Long-term cache for all static public assets
      ...staticAssetSources.map(source => ({
        source,
        headers: [{ key: 'Cache-Control', value: IMMUTABLE_CACHE }],
      })),
      // Security headers for all routes
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
