'use client';

import { Menu, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import { LocaleSwitcher } from './locale-switcher';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full border-b transition-all duration-300',
        scrolled
          ? 'border-border bg-background/80 backdrop-blur-md'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          locale={locale}
          className="group opacity-80 transition-opacity hover:opacity-100"
          aria-label={siteConfig.name}
        >
          <span className="flex items-center gap-1.5 font-mono text-sm font-semibold tracking-tight">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            <span>rene.llapur</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {siteConfig.navSections.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {t(section)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher className="hidden sm:inline-flex" />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card md:hidden"
            aria-label={t('toggleMenu')}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-border bg-background/95 backdrop-blur md:hidden"
        >
          <nav aria-label="Mobile" className="container-page py-4">
            <ul className="flex flex-col gap-1">
              {siteConfig.navSections.map((section) => (
                <li key={section}>
                  <a
                    href={`#${section}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {t(section)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <LocaleSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
