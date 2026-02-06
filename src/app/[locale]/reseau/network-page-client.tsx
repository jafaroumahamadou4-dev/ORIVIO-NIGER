'use client';

import Image from 'next/image';
import {
  ArrowRight,
  Users,
  Calendar,
  MessageSquare,
  Search,
  UserPlus,
  BarChart,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { PlaceHolderImages as placeholderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/navigation';

const heroImage = placeholderImages.find((p) => p.id === 'network-hero');
const testimonialImage = placeholderImages.find((p) => p.id === 'admin1');

export default function NetworkPageClient() {
  const t = useTranslations('NetworkPage');

  const features = t.raw('features.items') as { title: string, description: string }[];
  const featureIcons = [Search, UserPlus, MessageSquare, Calendar];

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
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
                <a href="#why-join">
                  {t('hero.ctaButton')} <ArrowRight className="ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section id="why-join" className="py-16 md:py-24 bg-secondary/30">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{t('whyJoin.title')}</h2>
            <div className="mt-4 mx-auto w-24 h-1 bg-accent rounded"></div>
            <p className="mt-6 text-lg text-muted-foreground">{t('whyJoin.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group flex flex-col text-center items-center p-8 animate-in fade-in slide-in-from-left-12 duration-700 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-full w-fit transition-colors group-hover:bg-accent/10">
                <Users className="h-10 w-10 text-primary transition-colors group-hover:text-accent" />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary transition-colors group-hover:text-accent">{t('whyJoin.mentors.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground transition-colors group-hover:text-accent/80">{t('whyJoin.mentors.description')}</p>
              </CardContent>
            </Card>
            <Card className="group flex flex-col text-center items-center p-8 animate-in fade-in zoom-in-95 duration-700 delay-150 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-accent/10 rounded-full w-fit">
                <BarChart className="h-10 w-10 text-accent" />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary transition-colors group-hover:text-accent">{t('whyJoin.opportunities.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground transition-colors group-hover:text-accent/80">{t('whyJoin.opportunities.description')}</p>
              </CardContent>
            </Card>
            <Card className="group flex flex-col text-center items-center p-8 animate-in fade-in slide-in-from-right-12 duration-700 delay-300 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="p-4 bg-primary/10 rounded-full w-fit transition-colors group-hover:bg-accent/10">
                <MessageSquare className="h-10 w-10 text-primary transition-colors group-hover:text-accent" />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary transition-colors group-hover:text-accent">{t('whyJoin.community.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground transition-colors group-hover:text-accent/80">{t('whyJoin.community.description')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
            <Card className="bg-primary text-primary-foreground border-accent border-2 p-8 transition-transform duration-300 hover:scale-105">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                  {testimonialImage && (
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-accent flex-shrink-0">
                      <Image src={testimonialImage.imageUrl} alt={t('testimonial.name')} data-ai-hint={testimonialImage.imageHint} fill className="object-cover"/>
                    </div>
                  )}
                  <div className="flex-1">
                    <blockquote className="text-xl italic text-primary-foreground/90">
                      "{t('testimonial.text')}"
                    </blockquote>
                    <p className="mt-4 font-bold font-headline text-accent">
                      {t('testimonial.name')}
                    </p>
                    <p className="text-sm text-primary-foreground/80">{t('testimonial.role')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
