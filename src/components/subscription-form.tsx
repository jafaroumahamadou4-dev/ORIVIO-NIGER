'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { collection, serverTimestamp } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, Loader2 } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export function SubscriptionForm() {
  const { toast } = useToast();
  const t = useTranslations('HomePage.subscription');
  const tToast = useTranslations('SubscriptionForm');
  const tActions = useTranslations('Actions.subscription');
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscriptionSchema = z.object({
    email: z.string().email({ message: tActions('invalidEmail') }),
  });

  type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: SubscriptionFormValues) => {
    if (!firestore) {
      toast({
        title: tToast('errorTitle'),
        description: 'Database not available.',
        variant: 'destructive',
      });
      return;
    }
    setIsSubmitting(true);

    try {
      const subscriptionsCol = collection(firestore, 'user_subscriptions');
      await addDocumentNonBlocking(subscriptionsCol, {
        email: data.email,
        subscribedAt: serverTimestamp(),
      });

      toast({
        title: tToast('successTitle'),
        description: tActions('success'),
      });
      form.reset();
    } catch (error: any) {
      toast({
        title: tToast('errorTitle'),
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col sm:flex-row gap-2"
    >
      <div className="relative flex-grow">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          {...form.register('email')}
          type="email"
          name="email"
          placeholder={t('placeholder')}
          className="pl-10 h-12 text-base border-accent border-2"
          aria-label="Email for newsletter"
        />
      </div>
      <Button type="submit" size="lg" className="h-12 text-base bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : t('button')}
      </Button>
      {form.formState.errors.email && (
        <p className="text-sm text-destructive mt-1 basis-full">{form.formState.errors.email.message}</p>
      )}
    </form>
  );
}
