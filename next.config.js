const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts'
);
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'zupimages.net' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'www.teachizy.fr' },
      { protocol: 'https', hostname: 'ridwangroup.com' },
      { protocol: 'https', hostname: 'www.elsniger.com' },
      { protocol: 'https', hostname: 'scouts-niger.org' },
      { protocol: 'https', hostname: 'afrodiscovery.com' }
    ],
  },
};
 
module.exports = withNextIntl(nextConfig);
