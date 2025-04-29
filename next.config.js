/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_WORDPRESS_API_HOSTNAME,
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  output: "standalone",
};

module.exports = nextConfig;
