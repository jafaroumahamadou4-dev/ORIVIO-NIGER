'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import { format, fromUnixTime } from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';
import { fr } from 'date-fns/locale';
import { doc } from 'firebase/firestore';

import type { NewsArticle } from '@/lib/types';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from '@/navigation';

export default function NewsArticlePage() {
  const params = useParams();
  const t = useTranslations('NewsDetailsPage');
  const locale = useLocale();
  const id = typeof params.id === 'string' ? params.id : '';
  const firestore = useFirestore();

  const articleRef = useMemoFirebase(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'news_articles', id);
  }, [firestore, id]);

  const { data: article, isLoading } = useDoc<NewsArticle>(articleRef);

  if (isLoading) {
    return (
      <div className="bg-secondary/30 py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-10 w-48 mb-8" />
            <Card>
              <Skeleton className="h-64 md:h-96 w-full rounded-t-lg" />
              <CardHeader>
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/2 mt-2" />
              </CardHeader>
              <CardContent>
                <Separator className="my-6" />
                <div className="space-y-4">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-5/6" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 min-h-[calc(100vh-14rem)]">
        <h2 className="text-2xl font-bold text-primary mb-2">Article non trouvé</h2>
        <p className="text-muted-foreground mb-6">Désolé, nous n'avons pas pu trouver l'article que vous cherchez.</p>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('backButton')}
          </Link>
        </Button>
      </div>
    );
  }

  const formattedDate = article.date?.seconds
    ? format(fromUnixTime(article.date.seconds), 'd MMMM yyyy', {
        locale: locale === 'fr' ? fr : undefined,
      })
    : '';

  return (
    <div className="bg-secondary/30 py-16">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button asChild variant="ghost">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t('backButton')}
              </Link>
            </Button>
          </div>

          <Card>
            {article.imageUrl && (
              <div className="relative h-64 md:h-96 w-full rounded-t-lg overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-bold font-headline text-primary">
                {article.title}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground pt-2">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  <span>{t('publishedOn', { date: formattedDate })}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Separator className="my-6" />
              <div className="prose prose-lg max-w-none text-foreground/90">
                <p>{article.content}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
