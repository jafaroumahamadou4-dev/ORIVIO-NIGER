import { getTranslations, setRequestLocale } from 'next-intl/server';
import NetworkPageClient from './network-page-client';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations('NetworkPage.metadata');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ReseauPage({params: {locale}}: {params: {locale: string}}) {
    setRequestLocale(locale);
    return <NetworkPageClient />;
}
