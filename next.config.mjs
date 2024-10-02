/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  assetPrefix: './', // Use absolute paths
  trailingSlash: false,
  reactStrictMode: true,
  images: {
    unoptimized: true, // Disable image optimization for fully static export
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
