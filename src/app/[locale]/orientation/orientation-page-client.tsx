'use client';

import Image from 'next/image';
import {
  ArrowRight,
  Computer,
  Users,
  Search,
  MessageSquare,
  BookOpen,
  GraduationCap,
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { collection, query, where, limit } from 'firebase/firestore';

import { PlaceHolderImages as placeholderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/navigation';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import type { TestimonialData } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

const heroImage = placeholderImages.find((p) => p.id === 'orientation-hero');
const mentorshipImage = placeholderImages.find(p => p.id === 'mentorship1');


export default function OrientationPageClient() {
  const t = useTranslations('OrientationPage');
  const tMentorship = useTranslations('OrientationPage.mentorship');
  const locale = useLocale();
  const firestore = useFirestore();

  const testimonialsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'testimonials'), 
      where('status', '==', 'approved'), 
      where('language', '==', locale), 
      where('page', '==', 'orientation'),
      limit(1)
    );
  }, [firestore, locale]);

  const { data: testimonials, isLoading: isLoadingTestimonials } = useCollection<TestimonialData>(testimonialsQuery);
  const testimonial = testimonials?.[0];

  const howItWorksSteps = t.raw('howItWorks.steps') as { title: string, description: string }[];
  const features = t.raw('features.items') as { title: string, description: string }[];
  const featureIcons = [Search, MessageSquare, BookOpen, GraduationCap];

  const mentorshipFeatures = [
    tMentorship.raw('feature1'),
    tMentorship.raw('feature2'),
    tMentorship.raw('feature3'),
  ] as { title: string, description: string }[];
  const mentorshipIcons = [Users, MessageSquare, GraduationCap];

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
            priority
          />
        )}
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 w-full px-4">
          <div className="max-w-3xl mx-auto">
            <h1
              className="text-4xl md:text-5xl font-headline font-bold !leading-tight animate-in fade-in slide-in-from-top-12 duration-700"
              dangerouslySetInnerHTML={{ __html: t.raw('hero.title') }}
            />
            <p className="mt-4 text-lg md:text-xl text-primary-foreground/90 animate-in fade-in slide-in-from-top-16 duration-700 delay-200">
              {t('hero.subtitle')}
            </p>
            <div className="mt-8 animate-in fade-in slide-in-from-top-20 duration-700 delay-400">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href="#our-approach">
                  {t('hero.ctaButton')} <ArrowRight className="ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section id="our-approach" className="py-16 md:py-24 bg-secondary/30">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{t('approach.title')}</h2>
            <div className="mt-4 mx-auto w-24 h-1 bg-accent rounded"></div>
            <p className="mt-6 text-lg text-muted-foreground">{t('approach.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="group flex flex-col text-center items-center p-8 animate-in fade-in slide-in-from-left-12 duration-700 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-full w-fit transition-colors group-hover:bg-accent/10">
                <Computer className="h-10 w-10 text-primary transition-colors group-hover:text-accent" />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary transition-colors group-hover:text-accent">{t('approach.digital.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground transition-colors group-hover:text-accent/80">{t('approach.digital.description')}</p>
              </CardContent>
            </Card>
            <Card className="group flex flex-col text-center items-center p-8 animate-in fade-in slide-in-from-right-12 duration-700 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-accent/10 rounded-full w-fit">
                <Users className="h-10 w-10 text-accent" />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary transition-colors group-hover:text-accent">{t('approach.human.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground transition-colors group-hover:text-accent/80">{t('approach.human.description')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{t('howItWorks.title')}</h2>
            <div className="mt-4 mx-auto w-24 h-1 bg-accent rounded"></div>
          </div>
          <div className="max-w-4xl mx-auto relative py-4">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-0.5 bg-border -z-10" aria-hidden="true"></div>
            <div className="relative space-y-16">
              {howItWorksSteps.map((step, index) => (
                <div key={index} className="relative animate-in fade-in duration-700" style={{animationDelay: `${index * 150}ms`}}>
                  <div className="flex items-center">
                    {index % 2 === 0 ? (
                      <>
                        <div className="w-1/2 pr-12 text-right">
                          <h3 className="font-headline font-bold text-2xl text-primary">{step.title}</h3>
                          <p className="mt-2 text-muted-foreground">{step.description}</p>
                        </div>
                        <div className="w-1/2"></div>
                      </>
                    ) : (
                      <>
                        <div className="w-1/2"></div>
                        <div className="w-1/2 pl-12 text-left">
                          <h3 className="font-headline font-bold text-2xl text-primary">{step.title}</h3>
                          <p className="mt-2 text-muted-foreground">{step.description}</p>
                        </div>
                      </>
                    )}
                    <div className="absolute left-1/2 -translate-x-1/2 bg-primary text-primary-foreground h-16 w-16 rounded-full flex items-center justify-center font-bold text-2xl border-4 border-background shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mentorship Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="animate-in fade-in slide-in-from-left-12 duration-700">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary !leading-tight" dangerouslySetInnerHTML={{ __html: tMentorship.raw('title') }} />
              <p className="mt-4 text-lg text-muted-foreground">{tMentorship('description')}</p>
              <div className="mt-8 space-y-6">
                {mentorshipFeatures.map((feature, index) => {
                  const Icon = mentorshipIcons[index];
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="bg-accent/10 text-accent rounded-full p-3 flex-shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-headline font-bold text-xl text-primary">{feature.title}</h3>
                        <p className="text-muted-foreground mt-1">{feature.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl animate-in fade-in slide-in-from-right-12 duration-700">
              {mentorshipImage && (
                <Image
                  src={mentorshipImage.imageUrl}
                  alt={mentorshipImage.description}
                  data-ai-hint={mentorshipImage.imageHint}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Key Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{t('features.title')}</h2>
            <div className="mt-4 mx-auto w-24 h-1 bg-accent rounded"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const Icon = featureIcons[index];
              return (
                <div key={index} className="group text-center p-6 animate-in fade-in zoom-in-95 duration-700 transition-all hover:shadow-lg hover:-translate-y-1 rounded-lg" style={{animationDelay: `${index * 150}ms`}}>
                  <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4 transition-colors group-hover:bg-accent/10 group-hover:text-accent">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-headline font-bold text-xl text-primary transition-colors group-hover:text-accent">{feature.title}</h3>
                  <p className="text-muted-foreground mt-2 transition-colors group-hover:text-accent/80">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

       {/* Testimonial Section */}
       <section className="py-16 md:py-24 bg-secondary/30">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
            {isLoadingTestimonials ? (
              <Card className="bg-primary text-primary-foreground border-accent border-2 p-8">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    <Skeleton className="w-24 h-24 rounded-full flex-shrink-0 bg-primary-foreground/20" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-full bg-primary-foreground/20" />
                      <Skeleton className="h-6 w-3/4 bg-primary-foreground/20" />
                      <Skeleton className="h-5 w-1/2 mt-4 bg-primary-foreground/20" />
                      <Skeleton className="h-4 w-1/3 bg-primary-foreground/20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : testimonial ? (
              <Card className="bg-primary text-primary-foreground border-accent border-2 p-8 transition-transform duration-300 hover:scale-105">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    {testimonial.imageUrl && (
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-accent flex-shrink-0">
                        <Image src={testimonial.imageUrl} alt={testimonial.name} fill className="object-cover"/>
                      </div>
                    )}
                    <div className="flex-1">
                      <blockquote className="text-xl italic text-primary-foreground/90">
                        "{testimonial.testimony}"
                      </blockquote>
                      <p className="mt-4 font-bold font-headline text-accent">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-primary-foreground/80">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto animate-in fade-in zoom-in-95 duration-700">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{t('cta.title')}</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('cta.subtitle')}
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/contact">
                  {t('cta.button')} <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
