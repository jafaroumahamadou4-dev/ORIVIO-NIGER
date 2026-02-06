'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { collection, serverTimestamp } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export function ContactForm() {
  const { toast } = useToast();
  const t = useTranslations('ContactForm');
  const tActions = useTranslations('Actions.contact');
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactSchema = z.object({
    name: z.string().min(2, { message: tActions('nameTooShort') }),
    email: z.string().email({ message: tActions('invalidEmail') }),
    subject: z.string().min(5, { message: 'Subject must be at least 5 characters.' }),
    message: z.string().min(10, { message: tActions('messageTooShort') }),
  });

  type ContactFormValues = z.infer<typeof contactSchema>;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const { formState: { errors } } = form;

  const onSubmit = async (data: ContactFormValues) => {
    if (!firestore) {
        toast({ title: t('errorTitle'), description: "Database not available.", variant: 'destructive' });
        return;
    }
    setIsSubmitting(true);
    
    try {
        const messagesCol = collection(firestore, 'contact_messages');
        await addDocumentNonBlocking(messagesCol, {
            ...data,
            sentAt: serverTimestamp(),
        });
        toast({ title: t('successTitle'), description: tActions('success') });
        form.reset();
    } catch (error: any) {
        toast({ title: t('errorTitle'), description: error.message, variant: 'destructive' });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="mt-6 space-y-6"
    >
      <div>
        <Label htmlFor="name">{t('nameLabel')}</Label>
        <Input
          id="name"
          {...form.register('name')}
          className="mt-1"
        />
        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <Label htmlFor="email">{t('emailLabel')}</Label>
        <Input
          id="email"
          type="email"
          {...form.register('email')}
          className="mt-1"
        />
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
      </div>
       <div>
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          {...form.register('subject')}
          className="mt-1"
        />
        {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>}
      </div>
      <div>
        <Label htmlFor="message">{t('messageLabel')}</Label>
        <Textarea
          id="message"
          {...form.register('message')}
          className="mt-1"
          rows={5}
        />
        {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
      </div>
      <div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t('button')}
        </Button>
      </div>
    </form>
  );
}
