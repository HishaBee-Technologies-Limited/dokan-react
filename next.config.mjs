/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
import pino from 'pino';

const logger = (defaultConfig) =>
  pino({
    ...defaultConfig,
    messageKey: 'message',
    mixin: () => ({ name: 'custom-pino-instance' }),
    transport: {
      options: {
        colorize: true,
      },
    },
  });

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['pino', 'pino-pretty'],
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async redirects() {
    return [
      {
        source: '/online-shop',
        destination: '/online-shop/overview',
        permanent: true,
      },
      {
        source: '/en/online-shop',
        destination: '/en/online-shop/overview',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hishabee.fra1.digitaloceanspaces.com',
        pathname: '/business-manager/**',
      },
      {
        protocol: 'http',
        hostname: 'dashboard.hishabee.io',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'dev.hishabee.market',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
