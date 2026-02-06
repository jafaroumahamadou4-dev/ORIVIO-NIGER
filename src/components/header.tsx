'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, Briefcase, Compass, Network, Mail, Home, Lightbulb } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Link } from '@/navigation';
import { LanguageSwitcher } from './language-switcher';
import { Logo } from './icons';

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations('Header');

  const navItems = [
    { href: '/', label: t('home'), icon: Home },
    { href: '/opportunities', label: t('opportunities'), icon: Briefcase },
    { href: '/orientation', label: t('orientation'), icon: Compass },
    { href: '/reseau', label: t('network'), icon: Network },
    { href: '/innovation-entreprenariat', label: t('innovationAndEntrepreneurship'), icon: Lightbulb },
    { href: '/contact', label: t('contact'), icon: Mail },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href as any}
                className={cn(
                  'transition-colors hover:text-accent',
                  pathname === item.href ? 'text-primary font-bold' : 'text-foreground/60'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          <Button asChild className="hidden bg-accent text-accent-foreground hover:bg-accent/90 md:inline-flex">
            <Link href="/opportunities">{t('findOpportunities')}</Link>
          </Button>
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <div className="p-6">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    <Logo />
                  </Link>
                </div>
                <div className="flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href as any}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-l-md p-3 text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                        pathname === item.href ? 'bg-primary text-primary-foreground' : ''
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
