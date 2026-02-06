'use client';

import Image from 'next/image';
import {
  ArrowRight,
  Rocket,
  Lightbulb,
  Trophy,
  DollarSign,
  Handshake,
  Briefcase,
  Zap,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { PlaceHolderImages as placeholderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/navigation';

const heroImage = placeholderImages.find((p) => p.id === 'innovation-hero');

export default function InnovationPageClient() {
  const t = useTranslations('InnovationAndEntrepreneurshipPage');

  const whyJoinItems = t.raw('whyJoin.items') as { title: string, description: string }[];
  const whyJoinIcons = [Handshake, DollarSign, Briefcase, Zap];

  const programItems = t.raw('programs.items') as { title: string, description: string }[];
  const programIcons = [Rocket, Lightbulb, Trophy, DollarSign];

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
                <Link href="#why-join">
                  {t('hero.ctaButton')} <ArrowRight className="ml-2" />
                </Link>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {whyJoinItems.map((item, index) => {
              const Icon = whyJoinIcons[index];
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

      {/* Our Programs Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">{t('programs.title')}</h2>
            <div className="mt-4 mx-auto w-24 h-1 bg-accent rounded"></div>
            <p className="mt-6 text-lg text-muted-foreground">{t('programs.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {programItems.map((program, index) => {
              const Icon = programIcons[index];
              return (
                <div key={index} className="group text-center p-6 animate-in fade-in zoom-in-95 duration-700 transition-all hover:shadow-lg hover:-translate-y-1 rounded-lg" style={{animationDelay: `${index * 150}ms`}}>
                  <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4 transition-colors group-hover:bg-accent/10 group-hover:text-accent">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-headline font-bold text-xl text-primary transition-colors group-hover:text-accent">{program.title}</h3>
                  <p className="text-muted-foreground mt-2 transition-colors group-hover:text-accent/80">{program.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Inspiration Section */}
       <section className="py-16 md:py-24 bg-secondary/30">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto flex justify-center animate-in fade-in zoom-in-95 duration-700">
            <div className="relative group p-2 rounded-lg bg-background shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-background rounded-lg overflow-hidden">
                    <Image 
                        src="https://ridwangroup.com/blog/wp-content/uploads/2020/08/meilleur-moyen-prevoir-futur-creer-peter-drucker-citations-entrepreunariat.png" 
                        alt="Citation de Peter Drucker: Le meilleur moyen de prévoir le futur, c'est de le créer."
                        width={800}
                        height={450}
                        className="object-contain"
                    />
                </div>
            </div>
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
