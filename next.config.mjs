import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zupimages.net',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '**',
      },
       {
        protocol: 'https',
        hostname: 'www.teachizy.fr',
        port: '',
        pathname: '**',
      },
       {
        protocol: 'https',
        hostname: 'ridwangroup.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.elsniger.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'scouts-niger.org',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'afrodiscovery.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '**',
      }
    ],
  },
};

export default withNextIntl(nextConfig);
