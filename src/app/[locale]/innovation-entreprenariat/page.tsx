import { getTranslations, setRequestLocale } from 'next-intl/server';
import InnovationPageClient from './innovation-page-client';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'InnovationAndEntrepreneurshipPage.metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function InnovationAndEntrepreneurshipPage({params: {locale}}: {params: {locale: string}}) {
    setRequestLocale(locale);
    return <InnovationPageClient />;
}
