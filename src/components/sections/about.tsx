import { Layers, Sparkles, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FadeIn } from '@/components/animations/fade-in';
import { Section } from '@/components/ui/section';

const pillars = [
  { key: 'architecture', icon: Layers },
  { key: 'performance', icon: Zap },
  { key: 'mentoring', icon: Sparkles },
] as const;

const badges = [
  { label: 'Angular Meetups Speaker', color: 'text-accent border-accent/30 bg-accent/8' },
  { label: '12+ Years Experience', color: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/8' },
  { label: 'Scrum SFPC Certified', color: 'text-blue-400 border-blue-400/30 bg-blue-400/8' },
];

export function About() {
  const t = useTranslations('about');

  return (
    <Section id="about" title={t('title')} subtitle={t('lead')}>
      {/* Photo + bio row */}
      <div className="mx-auto mb-16 grid max-w-5xl items-center gap-12 md:grid-cols-[auto_1fr]">
        {/* Photo */}
        <FadeIn>
          <div className="relative mx-auto w-fit">
            {/* Glow ring */}
            <div
              aria-hidden
              className="absolute -inset-1 rounded-full bg-linear-to-br from-accent/40 via-accent/10 to-transparent blur-md"
            />
            <div className="relative h-48 w-48 overflow-hidden rounded-full border-2 border-accent/30 md:h-56 md:w-56">
              <Image
                src="/images/photo.webp"
                alt="Rene Llapur"
                fill
                sizes="224px"
                className="object-cover object-top"
                priority
              />
            </div>
            {/* Availability dot */}
            <span
              aria-hidden
              className="absolute bottom-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-background ring-2 ring-background"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
          </div>
        </FadeIn>

        {/* Bio + badges */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-5">
            {badges.map(({ label, color }) => (
              <span
                key={label}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${color}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" aria-hidden />
                {label}
              </span>
            ))}
          </div>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {t('body')}
          </p>
        </FadeIn>
      </div>

      {/* Pillars */}
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
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
