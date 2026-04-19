import { Layers, Sparkles, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/animations/fade-in';
import { Section } from '@/components/ui/section';

const pillars = [
  { key: 'architecture', icon: Layers },
  { key: 'performance', icon: Zap },
  { key: 'mentoring', icon: Sparkles },
] as const;

export function About() {
  const t = useTranslations('about');

  return (
    <Section id="about" title={t('title')} subtitle={t('lead')}>
      <FadeIn className="mx-auto max-w-3xl">
        <p className="text-balance text-center text-base leading-relaxed text-muted-foreground md:text-lg">
          {t('body')}
        </p>
      </FadeIn>

      <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3">
        {pillars.map(({ key, icon: Icon }, i) => (
          <FadeIn key={key} delay={i * 0.1}>
            <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
              />
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">
                {t(`pillars.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(`pillars.${key}.body`)}</p>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
