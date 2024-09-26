/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // accept all images sources
      },
    ],
  },
  // env: envConfig,
};

export default nextConfig;
