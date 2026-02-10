import { getTranslations, setRequestLocale } from 'next-intl/server';
import ContactPageClient from './contact-page-client';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const t = await getTranslations('ContactPage.metadata');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <ContactPageClient />;
}
