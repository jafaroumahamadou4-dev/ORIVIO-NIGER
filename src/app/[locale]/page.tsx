'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Autoplay from "embla-carousel-autoplay";
import {
  Briefcase,
  GraduationCap,
  Lightbulb,
  Clipboard,
  ArrowRight,
  Target,
  HeartHandshake,
  TrendingUp,
  Compass,
  Network,
  ChevronDown,
} from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { format, fromUnixTime } from 'date-fns';
import { fr } from 'date-fns/locale';
import { collection, query, limit, where, doc, orderBy } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { SubscriptionForm } from '@/components/subscription-form';
import { OpportunityCard } from '@/components/opportunity-card';
import { PlaceHolderImages as placeholderImages } from '@/lib/placeholder-images';
import { Link } from '@/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils';
import { AnimatedCounter } from '@/components/animated-counter';
import type { OpportunityData, Partner, NewsArticle, TestimonialData, Administrator } from '@/lib/types';
import { useCollection, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';


const heroImage = placeholderImages.find(p => p.id === 'hero');

export default function Home() {
  const t = useTranslations('HomePage');
  const tAbout = useTranslations('HomePage.about');
  const tServices = useTranslations('HomePage.services');
  const tImpact = useTranslations('HomePage.impact');
  const tPartners = useTranslations('HomePage.partners');
  const tTestimonials = useTranslations('HomePage.testimonials');
  const tTeam = useTranslations('HomePage.team');
  const tNews = useTranslations('HomePage.news');

  const locale = useLocale();

  const firestore = useFirestore();
  const opportunitiesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'opportunities'), where('status', '==', 'approved'), limit(4));
  }, [firestore]);
  const { data: featuredOpportunities } = useCollection<OpportunityData>(opportunitiesQuery);

  const impactStatsRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return doc(firestore, 'impact_stats', 'main');
  }, [firestore]);

  const { data: impactStats, isLoading: isLoadingImpact } = useDoc<{ youthReached: number; partners: number; successRate: number; }>(impactStatsRef);

  const testimonialsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'testimonials'), 
      where('status', '==', 'approved'), 
      where('language', '==', locale),
      where('page', '==', 'home'),
      limit(2)
    );
  }, [firestore, locale]);
  const { data: testimonials, isLoading: isLoadingTestimonials } = useCollection<TestimonialData>(testimonialsQuery);
  
  const administratorsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'administrators'), orderBy('displayOrder'));
  }, [firestore]);
  const { data: administrators, isLoading: isLoadingAdmins } = useCollection<Administrator>(administratorsQuery);

  const partnersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'partnerships'));
  }, [firestore]);
  const { data: partners, isLoading: isLoadingPartners } = useCollection<Partner>(partnersQuery);
  
  const newsArticlesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'news_articles'), orderBy('date', 'desc'), limit(5));
  }, [firestore]);
  const { data: newsArticles, isLoading: isLoadingNews } = useCollection<NewsArticle>(newsArticlesQuery);

  const missionItems = [
    tAbout('missionItem1'),
    tAbout('missionItem2'),
    tAbout('missionItem3'),
    tAbout('missionItem4'),
    tAbout('missionItem5'),
  ];

  const serviceCards = [
    {
      icon: Briefcase,
      title: tServices('employmentTitle'),
      description: tServices('employmentDescription'),
    },
    {
      icon: GraduationCap,
      title: tServices('scholarshipsTitle'),
      description: tServices('scholarshipsDescription'),
    },
    {
      icon: Lightbulb,
      title: tServices('entrepreneurshipTitle'),
      description: tServices('entrepreneurshipDescription'),
    },
    {
      icon: Clipboard,
      title: tServices('internshipTitle'),
      description: tServices('internshipDescription'),
    },
    {
      icon: Compass,
      title: tServices('orientationTitle'),
      description: tServices('orientationDescription'),
    },
    {
      icon: Network,
      title: tServices('networkingTitle'),
      description: tServices('networkingDescription'),
    },
  ];

  const impactCards = [
    {
      icon: Target,
      value: impactStats?.youthReached || parseInt(tImpact('youthReachedValue')),
      suffix: tImpact('youthReachedSuffix'),
      title: tImpact('youthReached'),
      description: tImpact('youthReachedDescription'),
    },
    {
      icon: HeartHandshake,
      value: impactStats?.partners || parseInt(tImpact('partnersValue')),
      suffix: tImpact('partnersSuffix'),
      title: tImpact('partners'),
      description: tImpact('partnersDescription'),
    },
    {
      icon: TrendingUp,
      value: impactStats?.successRate || parseInt(tImpact('successRateValue')),
      suffix: tImpact('successRateSuffix'),
      title: tImpact('successRate'),
      description: tImpact('successRateDescription'),
    },
  ];

  const [adminApi, setAdminApi] = React.useState<CarouselApi>()
  useEffect(() => {
    if (isLoadingAdmins || !adminApi) return;
    adminApi.reInit();
  }, [isLoadingAdmins, administrators, adminApi])

  const [partnerApi, setPartnerApi] = React.useState<CarouselApi>()
  useEffect(() => {
    if (isLoadingPartners || !partnerApi) return;
    partnerApi.reInit();
  }, [isLoadingPartners, partners, partnerApi])

  const [newsApi, setNewsApi] = React.useState<CarouselApi>()
  useEffect(() => {
    if (isLoadingNews || !newsApi) return;
    newsApi.reInit();
  }, [isLoadingNews, newsArticles, newsApi])

  const adminAutoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true }));
  const partnerAutoplay = useRef(Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true }));
  const newsAutoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true }));


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
        {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              data-ai-hint={heroImage.imageHint}
              fill
              className="object-cover"
              priority
            />
        )}
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 w-full px-4">
          <div className="max-w-4xl mx-auto">
            <h1 
              className="font-headline font-normal !leading-snug animate-in fade-in slide-in-from-top-12 duration-700"
              dangerouslySetInnerHTML={{ __html: t.raw('hero.title') }}
            />
            <div className="mt-4 max-w-3xl mx-auto animate-in fade-in slide-in-from-top-16 duration-700 delay-200">
              <p className="mt-4 text-lg md:text-xl font-semibold italic">
                {t('hero.tagline')}
              </p>
            </div>
            <div className="mt-8 flex justify-center gap-4 animate-in fade-in slide-in-from-top-20 duration-700 delay-400">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href="#about">
                  {t('hero.discoverButton')} <ChevronDown className="ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 md:py-24 bg-secondary/30">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{tAbout('title')}</h2>
              <div className="mt-4 mx-auto w-24 h-1 bg-accent rounded"></div>
              <p className="mt-6 text-lg text-muted-foreground">
                {tAbout('description')}
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full bg-background p-6 md:p-8 rounded-lg shadow-sm border-2 border-accent animate-in fade-in slide-in-from-bottom-12 duration-700">
              <AccordionItem value="vision">
                <AccordionTrigger className="text-xl md:text-2xl font-headline font-semibold text-left hover:no-underline">
                  {tAbout('visionTitle')}
                </AccordionTrigger>
                <AccordionContent className="pt-4 text-base md:text-lg text-muted-foreground">
                  {tAbout('visionDescription')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="mission" className="border-b-0 pt-4">
                <AccordionTrigger className="text-xl md:text-2xl font-headline font-semibold text-left hover:no-underline">
                  {tAbout('missionTitle')}
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-muted-foreground">
                    {missionItems.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{t('services.title')}</h2>
            <div className="mt-4 mx-auto w-24 h-1 bg-accent rounded"></div>
            <p className="mt-6 text-lg text-muted-foreground">
              {t('services.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-12 duration-700">
            {serviceCards.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-2 border-accent">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="font-headline pt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Opportunities Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{t('featuredOpportunities.title')}</h2>
            <div className="mt-4 mx-auto w-24 h-1 bg-accent rounded"></div>
            <p className="mt-6 text-lg text-muted-foreground">
              {t('featuredOpportunities.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-12 duration-700">
            {featuredOpportunities && featuredOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
          <div className="text-center mt-12 animate-in fade-in slide-in-from-bottom-16 duration-700">
            <Button asChild size="lg" variant="link" className="text-accent text-lg">
              <Link href="/opportunities">
                {t('featuredOpportunities.viewAllButton')} <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold animate-in fade-in duration-500">{t('impact.title')}</h2>
            <p className="mt-4 text-lg text-primary-foreground/80 animate-in fade-in duration-500 delay-100">
              {t('impact.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {impactCards.map((impact, index) => (
              <div key={index} className={cn("flex flex-col items-center animate-in fade-in zoom-in-95 duration-500", { "delay-200": index === 1, "delay-400": index === 2, })}>
                <div className="bg-accent/20 text-accent rounded-full p-4 w-fit">
                  <impact.icon className="w-10 h-10" />
                </div>
                <h3 className="mt-4 text-4xl font-bold font-headline h-10 flex items-center justify-center">
                  {isLoadingImpact && (!impactStats || impactStats.youthReached === 0) ? 
                    <Skeleton className="h-10 w-24 bg-primary-foreground/20" /> : 
                    <>
                      <AnimatedCounter target={impact.value} locale={locale} />{impact.suffix}
                    </>
                  }
                </h3>
                <p className="text-lg text-primary-foreground/90 -mt-1">{impact.title}</p>
                <p className="mt-2 text-primary-foreground/80 max-w-xs">{impact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{tTestimonials('title')}</h2>
            <div className="mt-4 mx-auto w-24 h-1 bg-accent rounded"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {isLoadingTestimonials ? (
              [...Array(2)].map((_, index) => (
                <Card key={index} className="bg-secondary/30 border-2 border-primary">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Skeleton className="w-16 h-16 rounded-full" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2 mt-4" />
                        <Skeleton className="h-4 w-1/3" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              testimonials && testimonials.map((testimonial, index) => (
                <Card key={testimonial.id} className={cn("bg-secondary/30 border-2 border-primary animate-in fade-in duration-700", index === 0 ? "slide-in-from-left-12" : "slide-in-from-right-12")}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent flex-shrink-0">
                        <Image src={testimonial.imageUrl} alt={testimonial.name} width={64} height={64} className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <blockquote className="text-lg italic text-muted-foreground">
                          "{testimonial.testimony}"
                        </blockquote>
                        <p className="mt-4 font-bold font-headline text-primary">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Administrators Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{tTeam('title')}</h2>
            <div className="mt-4 mx-auto w-24 h-1 bg-accent rounded"></div>
          </div>
          {isLoadingAdmins ? (
            <div className="flex justify-center">
              <Skeleton className="h-64 w-full max-w-sm" />
            </div>
          ) : (
             <Carousel 
              setApi={setAdminApi}
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[adminAutoplay.current]}
              onMouseEnter={adminAutoplay.current.stop}
              onMouseLeave={adminAutoplay.current.reset}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {administrators && administrators.map((admin) => (
                  <CarouselItem key={admin.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <div className="text-center">
                        {admin.imageUrl && (
                          <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/10">
                            <Image src={admin.imageUrl} alt={admin.name} width={128} height={128} className="object-cover w-full h-full" />
                          </div>
                        )}
                        <h3 className="font-bold font-headline text-primary text-lg">{admin.name}</h3>
                        <p className="text-sm text-muted-foreground">{admin.role}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>
      </section>

      {/* Partners Section */}
       <section className="py-16 md:py-24 bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{tPartners('title')}</h2>
             <div className="mt-4 mx-auto w-24 h-1 bg-accent rounded"></div>
          </div>
          {isLoadingPartners ? (
            <div className="flex justify-center">
              <Skeleton className="h-80 w-full max-w-sm" />
            </div>
          ) : (
            <Carousel 
              setApi={setPartnerApi}
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[partnerAutoplay.current]}
              onMouseEnter={partnerAutoplay.current.stop}
              onMouseLeave={partnerAutoplay.current.reset}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent>
                {partners && partners.map((partner) => (
                    <CarouselItem key={partner.id} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1 h-full">
                        <Card className="flex flex-col items-center text-center p-6 transition-all duration-300 h-full">
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
                          <CardFooter className="p-0 mt-4">
                            <Button asChild variant="outline">
                              <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer">{tPartners('ourPartners.visitWebsite')}</a>
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
          <div className="text-center mt-12 px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-16 duration-700">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/partnerships">
                {tPartners('becomePartnerButton')} <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* News Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{tNews('title')}</h2>
             <div className="mt-4 mx-auto w-24 h-1 bg-accent rounded"></div>
          </div>
          {isLoadingNews ? (
             <div className="flex justify-center">
              <Skeleton className="h-96 w-full max-w-sm" />
            </div>
          ) : (
           <Carousel 
            setApi={setNewsApi}
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[newsAutoplay.current]}
            onMouseEnter={newsAutoplay.current.stop}
            onMouseLeave={newsAutoplay.current.reset}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent>
              {newsArticles && newsArticles.map((article) => {
                  return (
                    <CarouselItem key={article.id} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1 h-full">
                        <Card className="flex flex-col overflow-hidden transition-all duration-300 h-full group/news">
                          {article.imageUrl && (
                            <div className="relative h-48 w-full overflow-hidden">
                              <Image
                                src={article.imageUrl}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover/news:scale-105"
                              />
                            </div>
                          )}
                          <CardHeader>
                            <p className="text-sm text-muted-foreground">{format(fromUnixTime(article.date.seconds), 'd MMMM yyyy', { locale: locale === 'fr' ? fr : undefined })}</p>
                            <CardTitle className="font-headline text-lg leading-tight group-hover/news:text-accent transition-colors">{article.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-muted-foreground text-sm">{article.summary}</p>
                          </CardContent>
                          <CardFooter>
                            <Link
                              href={{
                                pathname: '/news/[id]',
                                params: { id: article.id },
                              } as any}
                              className="text-accent font-bold group-hover/news:underline flex items-center">
                              {tNews('readMore')} <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                          </CardFooter>
                        </Card>
                      </div>
                    </CarouselItem>
                  );
                })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          )}
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-16 md:py-24 bg-background animate-in fade-in slide-in-from-bottom-12 duration-700">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 border-2 border-accent">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">{t('subscription.title')}</h2>
              <p className="mt-4 text-lg text-primary-foreground/80">
                {t('subscription.subtitle')}
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <SubscriptionForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
