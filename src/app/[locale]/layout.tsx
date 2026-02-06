import { ReactNode } from 'react';
import { locales } from '@/navigation';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

// This is still needed to generate the static paths for each locale.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// This layout just passes children through. The main logic is in the root layout.
export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }
  setRequestLocale(locale);

  return <>{children}</>;
}
