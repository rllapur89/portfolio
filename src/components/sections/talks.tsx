import { Award, ExternalLink, Play } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/animations/fade-in';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/ui/section';
import { certifications } from '@/lib/data';

type TalkItem = {
  title: string;
  event: string;
  year: string;
  description: string;
  videoUrl: string;
  tags: string[];
};

function getYouTubeId(url: string): string | null {
  const match = url.match(/[?&]v=([^&#]+)/);
  return match ? match[1] : null;
}

export function Talks() {
  const t = useTranslations('talks');
  const items = t.raw('items') as TalkItem[];

  return (
    <Section id="talks" title={t('title')} subtitle={t('subtitle')}>
      <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
        {/* Talks column */}
        <FadeIn>
          <div className="flex h-full flex-col gap-4">
            <header className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Play className="h-4 w-4" aria-hidden />
              </span>
              <h3 className="text-base font-semibold tracking-tight">{t('speakerBadge')}</h3>
            </header>

            {items.map((talk) => {
              const ytId = getYouTubeId(talk.videoUrl);
              const thumb = ytId
                ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`
                : null;

              return (
                <article
                  key={talk.videoUrl}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
                >
                  {/* Thumbnail */}
                  {thumb && (
                    <a
                      href={talk.videoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={talk.title}
                      className="relative block overflow-hidden"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={thumb}
                        alt={talk.title}
                        width={320}
                        height={180}
                        className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/90 text-accent-foreground shadow-lg">
                          <Play className="h-5 w-5 translate-x-0.5" aria-hidden />
                        </span>
                      </div>
                    </a>
                  )}

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-mono text-xs text-muted-foreground">
                          {talk.event} · {talk.year}
                        </p>
                        <h4 className="mt-1 text-sm font-semibold leading-snug tracking-tight">
                          {talk.title}
                        </h4>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{talk.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {talk.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                      <a
                        href={talk.videoUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-accent transition-colors hover:text-accent/80"
                      >
                        {t('watchTalk')}
                        <ExternalLink className="h-3 w-3" aria-hidden />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </FadeIn>

        {/* Certifications column */}
        <FadeIn delay={0.08}>
          <article className="h-full rounded-2xl border border-border bg-card p-6">
            <header className="mb-4 flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <Award className="h-4 w-4" aria-hidden />
              </span>
              <h3 className="text-base font-semibold tracking-tight">{t('certifications')}</h3>
            </header>
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c.title} className="flex items-start justify-between gap-3 text-sm">
                  <div>
                    {c.url ? (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        {...(c.download ? { download: true } : {})}
                        className="font-medium text-foreground underline-offset-2 hover:text-accent hover:underline"
                      >
                        {c.title}
                      </a>
                    ) : (
                      <p className="font-medium text-foreground">{c.title}</p>
                    )}
                    <p className="text-muted-foreground">{c.issuer}</p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{c.year}</span>
                </li>
              ))}
            </ul>
          </article>
        </FadeIn>
      </div>
    </Section>
  );
}
