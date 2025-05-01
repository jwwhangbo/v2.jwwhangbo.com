/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: (() => {
      // Development environment
      if (process.env.NODE_ENV === 'development') {
        return [
          {
            protocol: "http",
            hostname: "localhost",
            port: "8080",
            pathname: "/wp-content/uploads/**",
          }
        ];
      } 
      // Production environment
      else {
        return [
          {
            protocol: "https",
            hostname: process.env.NEXT_PUBLIC_WORDPRESS_API_HOSTNAME || "your-production-domain.com",
            pathname: "/wp-content/uploads/**",
          }
        ];
      }
    })()
  },
  output: "standalone",
};

module.exports = nextConfig;
