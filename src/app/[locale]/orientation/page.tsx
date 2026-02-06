import { getTranslations, setRequestLocale } from 'next-intl/server';
import OrientationPageClient from './orientation-page-client';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'OrientationPage.metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function OrientationPage({params: {locale}}: {params: {locale: string}}) {
    setRequestLocale(locale);
    return <OrientationPageClient />;
}
