/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@prisma/client': require('path').resolve(__dirname, 'node_modules/.prisma/client'),
    };
    return config;
  },
};

module.exports = nextConfig;
