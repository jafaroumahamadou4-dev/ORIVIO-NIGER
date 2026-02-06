'use client';

import Image from 'next/image';
import {
  Briefcase,
  MapPin,
  Share2
} from 'lucide-react';
import { format, fromUnixTime } from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';
import { fr } from 'date-fns/locale';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { Opportunity } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export function OpportunityDetails({ opportunity }: { opportunity: Opportunity }) {
  const t = useTranslations('OpportunityDetailsPage');
  const tCat = useTranslations('HomePage.services');
  const tShare = useTranslations('OpportunityDetailsPage.shareMessages');
  const locale = useLocale();
  const { toast } = useToast();
  
  const categoryTranslations: Record<string, string> = {
    'Employment': tCat('employmentTitle'),
    'Internship': tCat('internshipTitle'),
    'Scholarships': tCat('scholarshipsTitle'),
    'Entrepreneurship': tCat('entrepreneurshipTitle'),
    'Formations': tCat('formationsTitle'),
    'Autres': tCat('othersTitle'),
  };
  const translatedCategory = categoryTranslations[opportunity.category] || opportunity.category;

  const getCategoryColor = () => {
    switch (opportunity.category) {
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

  const getClosingDate = () => {
    if (typeof opportunity.closingDate === 'string') {
        return format(new Date(opportunity.closingDate), 'd MMMM yyyy', { locale: locale === 'fr' ? fr : undefined });
    }
    if (opportunity.closingDate && typeof opportunity.closingDate.seconds === 'number') {
        return format(fromUnixTime(opportunity.closingDate.seconds), 'd MMMM yyyy', { locale: locale === 'fr' ? fr : undefined });
    }
    return 'N/A';
  }

  const handleShare = async () => {
    const category = translatedCategory;
    const company = opportunity.company;
    const title = opportunity.title;
    const url = window.location.href;
    
    const verbs = tShare.raw('verbs') as Record<string, string>;
    const verb = verbs[opportunity.category] || verbs['Autres'];

    const line1 = tShare('discover', { category });
    const line2 = `${company} ${verb} ${title}`;
    const line3 = tShare('details');
    const finalShareText = `${line1}\n\n${line2}\n\n${line3}\n${url}`;

    const shareData = {
      title: `ORIVIO Hub: ${opportunity.title}`,
      text: finalShareText,
      url: url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Sharing failed', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(finalShareText);
        toast({
          title: t('shareSuccess'),
          description: t('shareSuccessDescription'),
        });
      } catch (err) {
        toast({
          title: t('shareError'),
          description: t('shareErrorDescription'),
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="pb-4">
        <div className="relative h-64 md:h-80 w-full rounded-lg overflow-hidden mb-4">
            <Image
                src={opportunity.imageUrl}
                alt={opportunity.title}
                fill
                className="object-cover"
            />
        </div>
        <Badge variant="outline" className={cn("w-fit mb-2", getCategoryColor())}>
            {translatedCategory}
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">
            {opportunity.title}
        </h2>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground pt-2">
            <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                <span className="font-semibold">{opportunity.company}</span>
            </div>
            <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{opportunity.location}</span>
            </div>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <h3 className="font-bold font-headline text-2xl mb-4">{t('description')}</h3>
                <div className="prose prose-lg max-w-none text-foreground/90">
                    <p>{opportunity.description}</p>
                </div>
                
                <Separator className="my-6" />

                <h3 className="font-bold font-headline text-2xl mb-4">{t('requirements')}</h3>
                <ul className="list-disc list-inside space-y-2 prose prose-lg">
                    {Array.isArray(opportunity.requirements) && opportunity.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                    ))}
                </ul>
            </div>
            <div className="space-y-6">
                <div className="p-4 rounded-lg bg-primary text-primary-foreground">
                    <h3 className="font-bold font-headline text-xl mb-2">{t('applyNow')}</h3>
                    <p className="text-primary-foreground/80 mb-4">
                        {t('applicationCloses', {date: getClosingDate()})}
                    </p>
                    <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                        <a href={opportunity.applyLink} target="_blank" rel="noopener noreferrer">
                            {t('applyButton')}
                        </a>
                    </Button>
                </div>
                <div className="p-4 rounded-lg bg-secondary/30 border">
                    <h3 className="font-bold font-headline text-xl mb-2 text-primary">{t('share')}</h3>
                    <Button onClick={handleShare} size="lg" className="w-full" variant="outline">
                        <Share2 className="mr-2" />
                        {t('shareButton')}
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );
}
