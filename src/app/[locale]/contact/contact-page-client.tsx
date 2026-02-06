'use client';

import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ContactForm } from '@/components/contact-form';
import { PlaceHolderImages as placeholderImages } from '@/lib/placeholder-images';

const contactImage = placeholderImages.find(p => p.id === 'contact');

export default function ContactPageClient() {
  const t = useTranslations('ContactPage');

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="grid lg:grid-cols-2 min-h-[calc(100vh-4rem)]">
          <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto w-full">
              <div>
                <h1 className="text-4xl font-bold font-headline text-primary">{t('getInTouch.title')}</h1>
                <p className="mt-3 text-lg text-muted-foreground">
                  {t('getInTouch.subtitle')}
                </p>
              </div>

              <div className="mt-8 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{t('emailUs.title')}</h3>
                    <p className="text-muted-foreground">{t('emailUs.description')}</p>
                    <a href="mailto:orivio2025@gmail.com" className="text-primary hover:text-accent font-medium">
                      orivio2025@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{t('callUs.title')}</h3>
                    <p className="text-muted-foreground">{t('callUs.description')}</p>
                    <div className="mt-2 flex flex-col space-y-1">
                      <a href="tel:+22799413202" className="text-primary hover:text-accent font-medium">
                        +227 99 41 32 02
                      </a>
                      <a href="tel:+22788869683" className="text-primary hover:text-accent font-medium">
                        +227 88 86 96 83
                      </a>
                      <a href="tel:+2250546919020" className="text-primary hover:text-accent font-medium">
                        +225 05 46 91 90 20
                      </a>
                    </div>
                  </div>
                </div>
                 <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{t('ourOffice.title')}</h3>
                    <p className="text-muted-foreground">{t('ourOffice.address')}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 max-w-md mx-auto w-full">
              <h2 className="text-3xl font-bold font-headline text-primary">{t('sendMessage.title')}</h2>
              <ContactForm />
            </div>

          </div>
          <div className="hidden lg:block relative">
            {contactImage && (
              <Image
                src={contactImage.imageUrl}
                alt={contactImage.description}
                data-ai-hint={contactImage.imageHint}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-primary/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
