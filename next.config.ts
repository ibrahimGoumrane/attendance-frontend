/** @type {import('next').NextConfig} */

const IMAGE_HOST = process.env.NEXT_PUBLIC_IMAGE_HOST || 'localhost';
const IMAGE_PORT = process.env.NEXT_PUBLIC_IMAGE_PORT || '';

const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: IMAGE_HOST,
        port: IMAGE_PORT || '8000',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
