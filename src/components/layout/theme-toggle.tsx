'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const t = useTranslations('nav');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? (theme === 'system' ? resolvedTheme === 'dark' : theme === 'dark') : false;

  return (
    <button
      type="button"
      aria-label={t('toggleTheme')}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted',
        className,
      )}
    >
      <Sun
        className={cn(
          'h-4 w-4 transition-transform',
          mounted && isDark ? 'rotate-90 scale-0' : 'rotate-0 scale-100',
        )}
      />
      <Moon
        className={cn(
          'absolute h-4 w-4 transition-transform',
          mounted && isDark ? 'rotate-0 scale-100' : '-rotate-90 scale-0',
        )}
      />
    </button>
  );
}
