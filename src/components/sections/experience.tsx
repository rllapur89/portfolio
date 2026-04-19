import { Briefcase, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/animations/fade-in';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/ui/section';
import { SkillIcon } from '@/components/ui/skill-icon';
import { experienceMeta, experienceOrder, iconFor } from '@/lib/data';

export function Experience() {
  const t = useTranslations('experience');

  return (
    <Section id="experience" title={t('title')} subtitle={t('subtitle')}>
      <ol className="relative mx-auto max-w-4xl">
        <div
          aria-hidden
          className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-border to-transparent md:left-4"
        />
        {experienceOrder.map((key, i) => {
          const meta = experienceMeta[key];
          const highlights = t.raw(`items.${key}.highlights`) as string[];

          return (
            <li key={key} className="relative pl-10 pb-10 last:pb-0 md:pl-14">
              <FadeIn delay={i * 0.05}>
                <div
                  aria-hidden
                  className="absolute left-0 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-card md:left-1 md:h-8 md:w-8"
                >
                  <Briefcase className="h-3.5 w-3.5 text-accent" />
                  {meta.current && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-accent/20" />
                  )}
                </div>

                <article className="rounded-2xl border border-border bg-card p-5 md:p-6">
                  <header className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">
                        {t(`items.${key}.role`)}
                      </h3>
                      <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        {meta.website ? (
                          <a
                            href={meta.website}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1 hover:text-foreground"
                          >
                            {t(`items.${key}.company`)}
                            <ExternalLink className="h-3 w-3" aria-hidden />
                          </a>
                        ) : (
                          <span>{t(`items.${key}.company`)}</span>
                        )}
                      </p>
                    </div>
                    <Badge className="font-mono">{t(`items.${key}.period`)}</Badge>
                  </header>

                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {highlights.map((h, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span
                          aria-hidden
                          className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {meta.stack.map((s) => {
                      const icon = iconFor(s);
                      return (
                        <Badge key={s} className="inline-flex items-center gap-1.5 transition-colors hover:border-accent/50 hover:text-foreground">
                          {icon && <SkillIcon icon={icon} />}
                          {s}
                        </Badge>
                      );
                    })}
                  </div>
                </article>
              </FadeIn>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
