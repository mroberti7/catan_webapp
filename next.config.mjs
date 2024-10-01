/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  reactStrictMode: true,
  images: {
    loader: 'custom',
    loaderFile: './src/app/_components/loader/loader.tsx',
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
