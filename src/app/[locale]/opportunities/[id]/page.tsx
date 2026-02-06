'use client';

import { useParams } from 'next/navigation';
import { doc } from 'firebase/firestore';
import { useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import type { Opportunity, OpportunityData } from '@/lib/types';
import { OpportunityDetails } from '@/components/opportunity-details';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function OpportunityDetailsPage() {
    const params = useParams();
    const t = useTranslations('OpportunityDetailsPage');
    const id = typeof params.id === 'string' ? params.id : '';
    const firestore = useFirestore();
    
    const opportunityRef = useMemoFirebase(() => {
        if (!firestore || !id) return null;
        return doc(firestore, 'opportunities', id);
    }, [firestore, id]);

    const { data: opportunity, isLoading } = useDoc<OpportunityData>(opportunityRef);

    if (isLoading) {
        return (
            <div className="bg-secondary/30 py-16">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <Skeleton className="h-10 w-48 mb-8" />
                        <div className="bg-background p-8 rounded-lg shadow-md border">
                            <Skeleton className="h-80 w-full mb-4" />
                            <Skeleton className="h-8 w-1/4 mb-2" />
                            <Skeleton className="h-12 w-3/4 mb-4" />
                            <div className="flex gap-6 mb-6">
                                <Skeleton className="h-6 w-1/3" />
                                <Skeleton className="h-6 w-1/3" />
                            </div>
                            <Skeleton className="h-px w-full my-6" />
                            <Skeleton className="h-6 w-1/4 mb-4" />
                            <Skeleton className="h-5 w-full mb-2" />
                            <Skeleton className="h-5 w-full mb-2" />
                            <Skeleton className="h-5 w-5/6" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!opportunity) {
        return (
            <div className="flex flex-col items-center justify-center text-center py-20 min-h-[calc(100vh-14rem)]">
                <h2 className="text-2xl font-bold text-primary mb-2">Opportunité non trouvée</h2>
                <p className="text-muted-foreground mb-6">Désolé, nous n'avons pas pu trouver l'opportunité que vous cherchez.</p>
                 <Button asChild variant="outline">
                    <Link href="/opportunities">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t('backButton')}
                    </Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="bg-secondary/30 py-16">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <Button asChild variant="ghost">
                            <Link href="/opportunities">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                {t('backButton')}
                            </Link>
                        </Button>
                    </div>

                    <div className="bg-background p-6 md:p-8 rounded-lg shadow-md border">
                       <OpportunityDetails opportunity={{...opportunity, id}} />
                    </div>
                </div>
            </div>
        </div>
    );
}
