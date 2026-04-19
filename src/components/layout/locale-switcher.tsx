'use client';

import { Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('nav');
  const [isPending, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next as (typeof routing.locales)[number] });
    });
  }

  return (
    <div
      role="group"
      aria-label={t('switchLanguage')}
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full border border-border bg-card p-0.5 text-xs font-medium',
        className,
      )}
    >
      <Globe aria-hidden className="ml-2 mr-1 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          disabled={isPending}
          aria-current={locale === l ? 'true' : undefined}
          className={cn(
            'rounded-full px-2.5 py-1 uppercase transition-colors',
            locale === l
              ? 'bg-foreground text-background'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
