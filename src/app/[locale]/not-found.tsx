import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// The `not-found` component receives the `locale` param just like layouts and pages.
export default async function NotFoundPage({ params: { locale } }: { params: { locale: string } }) {
  // 1. Set the locale for static rendering
  unstable_setRequestLocale(locale);

  // 2. Get translations for the current locale
  const t = await getTranslations('NotFoundPage');

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 min-h-[calc(100vh-14rem)]">
      <h1 className="text-6xl font-bold font-headline text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-primary">{t('title')}</h2>
      <p className="mt-2 text-lg text-muted-foreground">{t('description')}</p>
      <Button asChild className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('backToHome')}
        </Link>
      </Button>
    </div>
  );
}
