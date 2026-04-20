'use client';

import { ArrowDown, Download, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/site-config';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { useTypewriter } from '@/hooks/use-typewriter';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 32, filter: 'blur(12px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const;

export function Headline() {
  const t = useTranslations('hero');
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reduced) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      sectionRef.current?.style.setProperty('--mouse-x', `${x}%`);
      sectionRef.current?.style.setProperty('--mouse-y', `${y}%`);
    },
    [reduced],
  );

  const roles = t.raw('roles') as string[];
  const { displayed } = useTypewriter({ words: roles, enabled: !reduced });

  const Wrapper = reduced ? 'div' : motion.div;
  const Item = reduced ? 'div' : motion.div;
  const wrapperProps = reduced ? {} : { variants: container, initial: 'hidden', animate: 'show' };
  const itemProps = reduced ? {} : { variants: item };

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-title"
      onMouseMove={handleMouseMove}
      className="relative isolate overflow-hidden pt-24 md:pt-32"
      style={{ '--mouse-x': '50%', '--mouse-y': '40%' } as React.CSSProperties}
    >
      {/* Mouse-follow spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(700px circle at var(--mouse-x) var(--mouse-y), color-mix(in oklab, var(--color-accent) 13%, transparent), transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-grid opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-accent/8 blur-3xl"
      />

      <Wrapper {...wrapperProps} className="container-page flex flex-col items-center text-center">
        <Item {...itemProps}>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {t('eyebrow')}
          </span>
        </Item>

        <Item {...itemProps} className="mt-6">
          <p className="font-mono text-sm text-muted-foreground">{t('greeting')}</p>
          <h1
            id="hero-title"
            className="mt-3 text-balance text-5xl font-semibold tracking-tight md:text-7xl"
          >
            <span className="bg-linear-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
              {t('title')}{' '}
            </span>
            <span className="text-accent">
              {displayed}
              <motion.span
                aria-hidden
                className="ml-1 inline-block h-[0.85em] w-0.75 translate-y-[0.1em] rounded-sm bg-accent"
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear', times: [0, 0.5, 0.5, 1] }}
              />
            </span>
          </h1>
        </Item>

        <Item {...itemProps} className="mx-auto mt-6 max-w-2xl">
          <p className="text-balance text-lg text-muted-foreground md:text-xl">{t('tagline')}</p>
        </Item>

        <Item {...itemProps} className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-accent" aria-hidden />
          {t('location')}
        </Item>

        <Item {...itemProps} className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a href={siteConfig.cvPath} download>
            <Button variant="accent" size="lg">
              <Download className="h-4 w-4" aria-hidden />
              {t('primaryCta')}
            </Button>
          </a>
          <a href="#contact">
            <Button variant="outline" size="lg">
              {t('secondaryCta')}
              <ArrowDown className="h-4 w-4" aria-hidden />
            </Button>
          </a>
        </Item>

        <Item {...itemProps}>
          <p className="my-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t('status')}
          </p>
        </Item>
      </Wrapper>
    </section>
  );
}
