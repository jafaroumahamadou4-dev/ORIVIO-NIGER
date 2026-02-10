import { getTranslations, setRequestLocale } from 'next-intl/server';
import OrientationPageClient from './orientation-page-client';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations('OrientationPage.metadata');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function OrientationPage({params: {locale}}: {params: {locale: string}}) {
    setRequestLocale(locale);
    return <OrientationPageClient />;
}
