'use client';

import { useRef, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FadeIn } from '@/components/animations/fade-in';
import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/ui/section';
import { projectMeta, projectOrder } from '@/lib/data';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';

const accentGradient: Record<string, string> = {
  emerald: 'from-emerald-500/25 via-emerald-500/10 to-transparent',
  violet: 'from-violet-500/25 via-violet-500/10 to-transparent',
  sky: 'from-sky-500/25 via-sky-500/10 to-transparent',
};

const accentBorder: Record<string, string> = {
  emerald: 'hover:border-emerald-500/50',
  violet: 'hover:border-violet-500/50',
  sky: 'hover:border-sky-500/50',
};

const accentSpotlight: Record<string, string> = {
  emerald: '55, 234, 163',
  violet: '139, 92, 246',
  sky: '56, 189, 248',
};

type ProjectCardProps = {
  projectKey: string;
  accent: string;
  title: string;
  summary: string;
  tags: string[];
  index: number;
};

function ProjectCard({ projectKey: _key, accent, title, summary, tags, index }: ProjectCardProps) {
  const reduced = usePrefersReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const spotlightX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const spotlightY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduced || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [reduced, mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const rgb = accentSpotlight[accent] ?? accentSpotlight.emerald;

  return (
    <FadeIn delay={index * 0.08}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={reduced ? {} : { rotateX, rotateY, transformPerspective: 800 }}
        className="group relative h-full cursor-default"
      >
        {/* Spotlight that follows cursor */}
        {!reduced && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: useTransform(
                [spotlightX, spotlightY],
                ([x, y]) =>
                  `radial-gradient(300px circle at ${x}% ${y}%, rgba(${rgb}, 0.18), transparent 70%)`,
              ),
            }}
          />
        )}

        <article
          className={`relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-2xl ${accentBorder[accent] ?? ''}`}
        >
          {/* Top gradient on hover */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${accentGradient[accent] ?? ''}`}
          />

          <div className="relative flex-1">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold leading-tight tracking-tight">{title}</h3>
              <ArrowUpRight
                aria-hidden
                className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
              />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{summary}</p>
          </div>

          <div className="relative mt-5 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} className="transition-colors duration-300 group-hover:border-accent/30">
                {tag}
              </Badge>
            ))}
          </div>
        </article>
      </motion.div>
    </FadeIn>
  );
}

export function Projects() {
  const t = useTranslations('projects');

  return (
    <Section id="projects" title={t('title')} subtitle={t('subtitle')}>
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projectOrder.map((key, i) => {
          const meta = projectMeta[key];
          const tags = t.raw(`items.${key}.tags`) as string[];

          return (
            <ProjectCard
              key={key}
              projectKey={key}
              accent={meta.accent}
              title={t(`items.${key}.title`)}
              summary={t(`items.${key}.summary`)}
              tags={tags}
              index={i}
            />
          );
        })}
      </div>
    </Section>
  );
}
