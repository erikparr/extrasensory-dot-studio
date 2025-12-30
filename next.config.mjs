/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Simplified product routes
      {
        source: '/foam',
        destination: '/projects/foam',
      },
      {
        source: '/vex',
        destination: '/projects/vex',
      },
      // VEX guides routes
      {
        source: '/vex/guides',
        destination: '/projects/vex/guides',
      },
      {
        source: '/vex/guides/:path*',
        destination: '/projects/vex/guides/:path*',
      },
    ];
  },
};

export default nextConfig;
