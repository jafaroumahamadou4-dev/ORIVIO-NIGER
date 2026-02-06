'use client';

import Image from 'next/image';
import { ArrowRight, Handshake, Users, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { collection, query } from 'firebase/firestore';

import { PlaceHolderImages as placeholderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/navigation';
import type { PartnerData } from '@/lib/types';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';


const heroImage = placeholderImages.find(p => p.id === 'partnerships');

export default function PartnershipsPageClient() {
  const t = useTranslations('PartnershipsPage');
  const firestore = useFirestore();

  const partnersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'partnerships'));
  }, [firestore]);
  const { data: partners, isLoading } = useCollection<PartnerData>(partnersQuery);


  const whyPartnerItems = [
    {
      title: t('whyPartner.accessTalent'),
      description: t('whyPartner.accessTalentDescription'),
      icon: Users,
    },
    {
      title: t('whyPartner.enhanceBrand'),
      description: t('whyPartner.enhanceBrandDescription'),
      icon: TrendingUp,
    },
    {
      title: t('whyPartner.driveImpact'),
      description: t('whyPartner.driveImpactDescription'),
      icon: Handshake,
    },
  ];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
        {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              data-ai-hint={heroImage.imageHint}
              fill
              className="object-cover"
            />
        )}
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 max-w-4xl px-4">
          <h1 
            className="text-4xl md:text-6xl font-headline font-bold !leading-tight tracking-tight animate-in fade-in slide-in-from-top-12 duration-700"
            dangerouslySetInnerHTML={{ __html: t.raw('hero.title')}}
          />
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto animate-in fade-in slide-in-from-top-16 duration-700 delay-200">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-16 md:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{t('whyPartner.title')}</h2>
            <div className="mt-4 mx-auto w-24 h-1 bg-accent rounded"></div>
            <p className="mt-6 text-lg text-muted-foreground">
              {t('whyPartner.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyPartnerItems.map((item, index) => {
                const Icon = item.icon;
                return (
                    <Card key={index} className="group flex flex-col text-center items-center p-8 animate-in fade-in slide-in-from-bottom-12 duration-700 transition-all hover:shadow-xl hover:-translate-y-1" style={{animationDelay: `${index * 150}ms`}}>
                        <div className="p-4 bg-primary/10 rounded-full w-fit transition-colors group-hover:bg-accent/10">
                            <Icon className="h-10 w-10 text-primary transition-colors group-hover:text-accent" />
                        </div>
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl text-primary transition-colors group-hover:text-accent">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground transition-colors group-hover:text-accent/80">{item.description}</p>
                        </CardContent>
                    </Card>
                )
            })}
          </div>
        </div>
      </section>

      {/* Our Partners Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{t('ourPartners.title')}</h2>
            <div className="mt-4 mx-auto w-24 h-1 bg-accent rounded"></div>
            <p className="mt-6 text-lg text-muted-foreground">
              {t('ourPartners.subtitle')}
            </p>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col items-center text-center p-6 space-y-3 border rounded-lg">
                  <Skeleton className="h-20 w-40" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-24" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners && partners.map((partner, index) => {
                return (
                  <Card key={partner.id} className="flex flex-col items-center text-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-in fade-in zoom-in-95" style={{animationDuration: '700ms', animationDelay: `${index * 100}ms`}}>
                    {partner.logoUrl && (
                      <div className="relative h-20 w-40 mb-4">
                         <Image
                          src={partner.logoUrl}
                          alt={partner.partnerName}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <CardHeader className="p-0">
                      <CardTitle className="font-headline">{partner.partnerName}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 mt-2 flex-grow">
                      <p className="text-muted-foreground">{partner.description}</p>
                    </CardContent>
                    <Button asChild variant="outline" className="mt-4">
                      <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer">{t('ourPartners.visitWebsite')}</a>
                    </Button>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center text-primary-foreground max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-700">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">{t('cta.title')}</h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              {t('cta.subtitle')}
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/contact">
                  {t('cta.contactButton')} <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
