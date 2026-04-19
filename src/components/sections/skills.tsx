import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/animations/fade-in';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/ui/section';
import { SkillIcon } from '@/components/ui/skill-icon';
import { skillGroups } from '@/lib/data';

export function Skills() {
  const t = useTranslations('skills');

  return (
    <Section id="skills" title={t('title')} subtitle={t('subtitle')}>
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
        {skillGroups.map((group, i) => {
          const Icon = group.icon;
          return (
            <FadeIn key={group.key} delay={i * 0.05}>
              <article className="h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/30">
                <header className="mb-4 flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <h3 className="text-base font-semibold tracking-tight">
                    {t(`groups.${group.key}`)}
                  </h3>
                </header>
                <ul className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Badge className="inline-flex items-center gap-1.5 transition-colors hover:border-accent/50 hover:text-foreground">
                        {item.icon && <SkillIcon icon={item.icon} />}
                        {item.label}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
