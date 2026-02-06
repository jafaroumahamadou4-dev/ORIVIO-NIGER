import { Facebook, Instagram, Linkedin, Twitter, MessageCircle, Mail, MapPin } from 'lucide-react';
import {useTranslations} from 'next-intl';

import { Logo } from '@/components/icons';
import { Separator } from './ui/separator';
import { Link } from '@/navigation';

const socialLinks = [
  { href: 'https://whatsapp.com/channel/0029VbBk92X8KMqimWQeiu10', icon: MessageCircle, label: 'WhatsApp' },
  { href: 'https://www.facebook.com/share/1AabvVsnbc/', icon: Facebook, label: 'Facebook' },
  { href: '#', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://www.instagram.com/orivioniger?igsh=MWVydDI2NXFqOWIxcQ==', icon: Instagram, label: 'Instagram' },
  { href: '#', icon: Twitter, label: 'X' },
];

export function Footer() {
  const t = useTranslations('Footer');
  const tHeader = useTranslations('Header');
  const tContact = useTranslations('ContactPage');

  const navItems = [
    { href: '/', label: tHeader('home') },
    { href: '/opportunities', label: tHeader('opportunities') },
    { href: '/orientation', label: tHeader('orientation') },
    { href: '/reseau', label: tHeader('network') },
    { href: '/innovation-entreprenariat', label: tHeader('innovationAndEntrepreneurship') },
    { href: '/contact', label: tHeader('contact') },
  ];
  
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="mb-4 inline-block">
              <Logo className="text-white" />
            </Link>
            <p className="max-w-md text-primary-foreground/80">
              {t('tagline')}
            </p>
          </div>
          <div>
            <h3 className="font-headline font-semibold tracking-wider uppercase">{t('navigation')}</h3>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href as any}
                    className="text-primary-foreground/70 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold tracking-wider uppercase">{t('connect')}</h3>
            <div className="mt-4 grid grid-cols-3 gap-4 w-fit">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-sm text-primary-foreground/70">
                <a href="mailto:orivio2025@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Mail className="h-4 w-4" />
                    <span>orivio2025@gmail.com</span>
                </a>
                <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                    <span>{tContact('ourOffice.address')}</span>
                </div>
                <div className="pt-2">
                    <a href="tel:+22799413202" className="block hover:text-white transition-colors">
                        +227 99 41 32 02
                    </a>
                    <a href="tel:+22788869683" className="block hover:text-white transition-colors">
                        +227 88 86 96 83
                    </a>
                    <a href="tel:+2250546919020" className="block hover:text-white transition-colors">
                        +225 05 46 91 90 20
                    </a>
                </div>
            </div>
          </div>
        </div>
        <Separator className="my-8 bg-primary-foreground/10" />
        <div className="text-center text-primary-foreground/50">
          <p>{t('copyright', {year: new Date().getFullYear()})}</p>
        </div>
      </div>
    </footer>
  );
}
