'use client';

import Image from 'next/image';
import { MapPin, CalendarDays, Eye } from 'lucide-react';
import { format, fromUnixTime } from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';
import { fr } from 'date-fns/locale';

import type { Opportunity } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from '@/navigation';


interface OpportunityCardProps {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const t = useTranslations('OpportunityCard');
  const tCat = useTranslations('HomePage.services');
  const locale = useLocale();
  const { title, company, category, location, imageUrl, closingDate } = opportunity;

  const getCategoryColor = () => {
    switch (category) {
      case 'Employment':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Internship':
        return 'bg-pink-100 text-pink-800 border-pink-300';
      case 'Scholarships':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Entrepreneurship':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Formations':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Autres':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const categoryTranslations: Record<string, string> = {
    'Employment': tCat('employmentTitle'),
    'Internship': tCat('internshipTitle'),
    'Scholarships': tCat('scholarshipsTitle'),
    'Entrepreneurship': tCat('entrepreneurshipTitle'),
    'Formations': tCat('formationsTitle'),
    'Autres': tCat('othersTitle'),
  };
  const translatedCategory = categoryTranslations[category] || category;
  
  const getClosingDate = () => {
    if (typeof closingDate === 'string') {
        return format(new Date(closingDate), 'd MMMM yyyy', { locale: locale === 'fr' ? fr : undefined });
    }
    if (closingDate && typeof closingDate.seconds === 'number') {
        return format(fromUnixTime(closingDate.seconds), 'd MMMM yyyy', { locale: locale === 'fr' ? fr : undefined });
    }
    return 'N/A';
  }
  const formattedDate = getClosingDate();


  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      {imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-headline font-bold text-xl leading-tight text-primary group-hover:text-accent transition-colors">
            {title}
          </h3>
          <Badge variant="outline" className={cn('whitespace-nowrap', getCategoryColor())}>{translatedCategory}</Badge>
        </div>
        <p className="text-muted-foreground font-semibold">{company}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
          <CalendarDays className="h-4 w-4" />
          <span>{t('closes', { date: formattedDate })}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="p-0 text-accent font-bold group-hover:underline flex items-center">
            <Link href={`/opportunities/${opportunity.id}`}>
                {t('viewDetails')}
                <Eye className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
