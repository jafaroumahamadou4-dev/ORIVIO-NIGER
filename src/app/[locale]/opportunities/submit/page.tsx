import { getTranslations, setRequestLocale } from 'next-intl/server';
import SubmitOpportunityPageClient from './submit-page-client';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'SubmitOpportunityPage.metadata' });
  return {
    title: t('title'),
  };
}

export default function SubmitOpportunityPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return <SubmitOpportunityPageClient />;
}
