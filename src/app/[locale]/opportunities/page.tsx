'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { ArrowRight, Search } from 'lucide-react';
import { OpportunityCard } from '@/components/opportunity-card';
import type { Opportunity, OpportunityCategory, OpportunityData } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { PlaceHolderImages as placeholderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import { collection, query, where } from 'firebase/firestore';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

const categories: OpportunityCategory[] = ['Employment', 'Internship', 'Scholarships', 'Entrepreneurship', 'Formations', 'Autres'];
const heroImage = placeholderImages.find(p => p.id === 'opportunities-hero');

export default function OpportunitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const t = useTranslations('OpportunitiesPage');
  const tCat = useTranslations('HomePage.services');
  
  const firestore = useFirestore();
  const opportunitiesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'opportunities'), where('status', '==', 'approved'));
  }, [firestore]);
  const { data: opportunities, isLoading } = useCollection<OpportunityData>(opportunitiesQuery);

  const filteredOpportunities = (category: OpportunityCategory | 'All'): Opportunity[] => {
    if (!opportunities) return [];
    return opportunities.filter(opp => 
      (category === 'All' || opp.category === category) &&
      (opp.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       opp.company.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  const categoryTranslations: Record<string, string> = {
    Employment: tCat('employmentTitle'),
    Internship: tCat('internshipTitle'),
    Scholarships: tCat('scholarshipsTitle'),
    Entrepreneurship: tCat('entrepreneurshipTitle'),
    Formations: tCat('formationsTitle'),
    Autres: tCat('othersTitle'),
  };

  return (
    <div className="bg-background">
      {/* Page Header */}
      <section className="relative text-primary-foreground py-12 md:py-20 overflow-hidden">
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
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline animate-in fade-in slide-in-from-top-12 duration-700" dangerouslySetInnerHTML={{ __html: t.raw('headerTitle') }} />
          <p className="mt-4 text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto animate-in fade-in slide-in-from-top-16 duration-700 delay-200">
            {t('headerSubtitle')}
          </p>
          <div className="mt-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-top-20 duration-700 delay-400">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t('searchPlaceholder')}
                className="w-full h-14 pl-12 text-lg text-foreground border-2 border-accent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities Grid */}
      <section className="py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="All" className="w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="w-full overflow-x-auto pb-4">
              <TabsList className="justify-center bg-transparent p-0 h-auto flex gap-4 w-max mx-auto">
                <TabsTrigger value="All" className="rounded-full px-6 py-2 text-base font-semibold border-2 border-border text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary data-[state=active]:shadow-md whitespace-nowrap">{t('all')}</TabsTrigger>
                {categories.map(cat => (
                  <TabsTrigger key={cat} value={cat} className="rounded-full px-6 py-2 text-base font-semibold border-2 border-border text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary data-[state=active]:shadow-md whitespace-nowrap">{categoryTranslations[cat]}</TabsTrigger>
                ))}
              </TabsList>
            </div>

            {isLoading ? (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-5 w-1/2" />
                    <Skeleton className="h-5 w-1/4" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <TabsContent value="All" className="mt-8">
                  <OpportunityGrid opportunities={filteredOpportunities('All')} />
                </TabsContent>

                {categories.map(cat => (
                  <TabsContent key={cat} value={cat} className="mt-8">
                    <OpportunityGrid opportunities={filteredOpportunities(cat)} />
                  </TabsContent>
                ))}
              </>
            )}
          </Tabs>
        </div>
      </section>
      
      {/* Submit Opportunity CTA */}
      <section className="bg-secondary/30 py-16">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center bg-background p-8 rounded-lg shadow-md border-2 border-accent">
            <h2 className="text-3xl font-headline font-bold text-primary">{t('submitOpportunity.title')}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t('submitOpportunity.subtitle')}</p>
            <Button asChild size="lg" className="mt-6 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/opportunities/submit">
                {t('submitOpportunity.button')} <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function OpportunityGrid({ opportunities }: { opportunities: Opportunity[] }) {
  const t = useTranslations('OpportunitiesPage');
  if (opportunities.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <h3 className="text-2xl font-semibold">{t('noOpportunities')}</h3>
        <p>{t('noOpportunitiesSuggestion')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {opportunities.map(opportunity => (
        <OpportunityCard key={opportunity.id} opportunity={opportunity} />
      ))}
    </div>
  );
}
