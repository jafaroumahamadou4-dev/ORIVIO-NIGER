import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ['en', 'fr'] as const;
export const localePrefix = 'always';

export const pathnames = {
  '/': '/',
  '/contact': {
    en: '/contact',
    fr: '/contact'
  },
  '/opportunities': {
    en: '/opportunities',
    fr: '/opportunites'
  },
  '/opportunities/submit': {
    en: '/opportunities/submit',
    fr: '/opportunites/soumettre'
  },
  '/opportunities/[id]': {
    en: '/opportunities/[id]',
    fr: '/opportunites/[id]'
  },
  '/orientation': {
    en: '/orientation',
    fr: '/orientation'
  },
  '/reseau': {
    en: '/network',
    fr: '/reseau'
  },
  '/innovation-entreprenariat': {
    en: '/innovation-entrepreneurship',
    fr: '/innovation-entreprenariat'
  },
  '/partnerships': {
    en: '/partnerships',
    fr: '/partenariats'
  },
  '/news/[id]': {
    en: '/news/[id]',
    fr: '/actualites/[id]'
  }
};

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createLocalizedPathnamesNavigation({locales, localePrefix, pathnames});
