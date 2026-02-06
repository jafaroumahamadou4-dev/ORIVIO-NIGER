import { getTranslations, setRequestLocale } from 'next-intl/server';
import ContactPageClient from './contact-page-client';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'ContactPage.metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <ContactPageClient />;
}
