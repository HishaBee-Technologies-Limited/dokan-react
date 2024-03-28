/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
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
    ],
  },
};

export default withNextIntl(nextConfig);
