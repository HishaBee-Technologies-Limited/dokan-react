/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hishabee.fra1.digitaloceanspaces.com",
        pathname: "/business-manager/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
