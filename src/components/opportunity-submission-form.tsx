'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { collection, serverTimestamp } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { useFirestore } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

const categoryImages: Record<string, string> = {
  'Employment': 'https://i.imgur.com/Lp6gNGx.png',
  'Internship': 'https://i.imgur.com/jcOqgrS.png',
  'Scholarships': 'https://i.imgur.com/QPIqp7j.png',
  'Entrepreneurship': 'https://i.imgur.com/QPWUdyt.png',
  'Formations': 'https://i.imgur.com/8mRKNYv.png',
  'Autres': 'https://i.imgur.com/4Oy22hf.png',
};

export function OpportunitySubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const t = useTranslations('SubmitOpportunityPage.form');
  const tCats = useTranslations('SubmitOpportunityPage.categories');
  const firestore = useFirestore();

  const categories = ['Employment', 'Internship', 'Scholarships', 'Entrepreneurship', 'Formations', 'Autres'];

  const submissionSchema = z.object({
    title: z.string().min(5, { message: 'Title must be at least 5 characters.' }),
    company: z.string().min(2, { message: 'Company name must be at least 2 characters.' }),
    category: z.string({ required_error: 'Please select a category.' }).min(1),
    location: z.string().min(2, { message: 'Location must be at least 2 characters.' }),
    closingDate: z.date({ required_error: 'Please select a closing date.' }),
    applyLink: z.string().url({ message: 'Please enter a valid URL.' }),
    customImageUrl: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
    description: z.string().min(20, { message: 'Description must be at least 20 characters.' }),
    requirements: z.string().min(10, { message: 'Requirements must be at least 10 characters.' }),
    submitterEmail: z.string().email({ message: 'Please enter a valid email address.' }),
  });

  type SubmissionFormValues = z.infer<typeof submissionSchema>;

  const form = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      title: '',
      company: '',
      location: '',
      applyLink: '',
      description: '',
      requirements: '',
      submitterEmail: '',
      customImageUrl: '',
    },
  });

  const { formState: { errors }, control, register, handleSubmit, reset } = form;

  const onSubmit = async (data: SubmissionFormValues) => {
    if (!firestore) {
      toast({ title: t('errorTitle'), description: "Database not available.", variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
    
    try {
        const imageUrl = data.customImageUrl || categoryImages[data.category] || `https://picsum.photos/seed/${Date.now()}/800/600`;
        const requirementsArray = data.requirements.split('\n').filter(req => req.trim() !== '');
        
        const docData = {
          title: data.title,
          company: data.company,
          category: data.category,
          location: data.location,
          closingDate: data.closingDate,
          applyLink: data.applyLink,
          description: data.description,
          requirements: requirementsArray,
          submitterEmail: data.submitterEmail,
          imageUrl: imageUrl,
          createdAt: serverTimestamp(),
          status: 'pending',
        };

        const opportunitiesCol = collection(firestore, 'opportunities');
        await addDocumentNonBlocking(opportunitiesCol, docData);
        
        toast({ title: t('successTitle'), description: 'Your opportunity has been submitted for review. Thank you!' });
        reset();
    } catch (error: any) {
        console.error("Submission failed:", error);
        toast({ title: t('errorTitle'), description: error.message || 'Could not save opportunity.', variant: 'destructive' });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="title">{t('titleLabel')}</Label>
          <Input id="title" {...register('title')} className="mt-1" />
          {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
        </div>
        <div>
          <Label htmlFor="company">{t('companyLabel')}</Label>
          <Input id="company" {...register('company')} className="mt-1" />
          {errors.company && <p className="text-sm text-destructive mt-1">{errors.company.message}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="category">{t('categoryLabel')}</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder={t('categoryLabel')} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{tCats(cat)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && <p className="text-sm text-destructive mt-1">{errors.category.message}</p>}
        </div>
        <div>
          <Label htmlFor="location">{t('locationLabel')}</Label>
          <Input id="location" {...register('location')} className="mt-1" />
          {errors.location && <p className="text-sm text-destructive mt-1">{errors.location.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="closingDate" className="block mb-1">{t('closingDateLabel')}</Label>
          <Controller
            name="closingDate"
            control={control}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.closingDate && <p className="text-sm text-destructive mt-1">{errors.closingDate.message}</p>}
        </div>
        <div>
          <Label htmlFor="applyLink">{t('applyLinkLabel')}</Label>
          <Input id="applyLink" {...register('applyLink')} className="mt-1" type="url" placeholder="https://..." />
          {errors.applyLink && <p className="text-sm text-destructive mt-1">{errors.applyLink.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="customImageUrl">{t('imageLabel')} (Facultatif)</Label>
        <Input id="customImageUrl" {...register('customImageUrl')} className="mt-1" type="url" placeholder="https://..." />
        {errors.customImageUrl && <p className="text-sm text-destructive mt-1">{errors.customImageUrl.message}</p>}
      </div>

      <div>
        <Label htmlFor="description">{t('descriptionLabel')}</Label>
        <Textarea id="description" {...register('description')} className="mt-1" rows={5} />
        {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <Label htmlFor="requirements">{t('requirementsLabel')}</Label>
        <Textarea id="requirements" {...register('requirements')} className="mt-1" rows={5} placeholder={t('requirementsPlaceholder')} />
        {errors.requirements && <p className="text-sm text-destructive mt-1">{errors.requirements.message}</p>}
      </div>
      
      <div>
        <Label htmlFor="submitterEmail">{t('submitterEmailLabel')}</Label>
        <Input id="submitterEmail" {...register('submitterEmail')} className="mt-1" type="email" />
        {errors.submitterEmail && <p className="text-sm text-destructive mt-1">{errors.submitterEmail.message}</p>}
      </div>

      <div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('submittingButton')}
            </>
          ) : (
            t('submitButton')
          )}
        </Button>
      </div>
    </form>
  );
}
