import { getTranslations, setRequestLocale } from 'next-intl/server';
import PartnershipsPageClient from './partnerships-client';

export async function generateMetadata({params}: {params: {locale: string}}) {
  setRequestLocale(params.locale);
  const t = await getTranslations('PartnershipsPage.metadata');
 
  return {
    title: t('title'),
    description: t('description')
  };
}

export default function PartnershipsPage({params: {locale}}: {params: {locale: string}}) {
  setRequestLocale(locale);
  return <PartnershipsPageClient />;
}
