import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// The `not-found` component is not rendered with a locale parameter.
// We can use the 'next-intl' hooks as usual.
export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');

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
