import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

import { locales } from '@/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { FirebaseClientProvider } from '@/firebase/client-provider';

// This function tells Next.js to generate static pages for each locale.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// This function generates metadata for the layout, using translations.
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  // `setRequestLocale` is needed here to make `getTranslations` work for metadata.
  setRequestLocale(locale);
  const t = await getTranslations('HomePage.metadata');

  return {
    title: {
      default: t('title'),
      template: `%s | ${t('title')}`,
    },
    description: t('description'),
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  // Validate locale and set it for the request
  if (!locales.includes(locale as any)) {
    notFound();
  }
  setRequestLocale(locale);

  // Get messages for the client-side provider
  const messages = await getMessages();

  return (
    // The `lang` attribute is set here for the specific locale
    <html lang={locale} className="scroll-smooth">
      <body className={cn('font-body antialiased', 'bg-secondary/50', 'overflow-x-hidden')}>
        <FirebaseClientProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <main className="min-h-[calc(100vh-4rem)]">{children}</main>
            <Footer />
            <Toaster />
          </NextIntlClientProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
