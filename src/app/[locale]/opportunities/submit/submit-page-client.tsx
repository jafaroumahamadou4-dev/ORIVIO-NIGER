'use client';

import { useTranslations } from 'next-intl';
import { OpportunitySubmissionForm } from '@/components/opportunity-submission-form';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';

export default function SubmitOpportunityPageClient() {
  const t = useTranslations('SubmitOpportunityPage');
  const tDetails = useTranslations('OpportunityDetailsPage');

  return (
    <div className="bg-secondary/30 py-16">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button asChild variant="ghost">
              <Link href="/opportunities">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {tDetails('backButton')}
              </Link>
            </Button>
          </div>

          <div className="bg-background p-8 rounded-lg shadow-md border">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">{t('headerTitle')}</h1>
              <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('headerSubtitle')}
              </p>
            </div>
            <OpportunitySubmissionForm />
          </div>
        </div>
      </div>
    </div>
  );
}
