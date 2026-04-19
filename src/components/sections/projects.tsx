'use client';

import { useRef, useCallback, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/swiper.css';
import { FadeIn } from '@/components/animations/fade-in';
import { Section } from '@/components/ui/section';
import { projectMeta, projectOrder } from '@/lib/data';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';

const accentBorder: Record<string, string> = {
  emerald: 'group-hover:border-emerald-500/60',
  violet: 'group-hover:border-violet-500/60',
  sky: 'group-hover:border-sky-500/60',
};

const accentOverlay: Record<string, string> = {
  emerald: 'from-emerald-950/80 via-emerald-950/60 to-emerald-950/30',
  violet: 'from-violet-950/80 via-violet-950/60 to-violet-950/30',
  sky: 'from-sky-950/80 via-sky-950/60 to-sky-950/30',
};

const accentSpotlight: Record<string, string> = {
  emerald: '55, 234, 163',
  violet: '139, 92, 246',
  sky: '56, 189, 248',
};

type ProjectCardProps = {
  accent: string;
  title: string;
  summary: string;
  image: string;
  live: string;
};

function ProjectCard({ accent, title, summary, image, live }: ProjectCardProps) {
  const reduced = usePrefersReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

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

  const spotlightBg = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) => `radial-gradient(280px circle at ${x}% ${y}%, rgba(${rgb}, 0.15), transparent 70%)`,
  );

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={reduced ? {} : { rotateX, rotateY, transformPerspective: 900 }}
      className="group relative h-full"
    >
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlightBg }}
        />
      )}

      <a
        href={live}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:shadow-2xl ${accentBorder[accent] ?? ''}`}
        aria-label={title}
      >
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div
            aria-hidden
            className={`absolute inset-0 bg-linear-to-t opacity-40 transition-opacity duration-300 group-hover:opacity-70 ${accentOverlay[accent] ?? ''}`}
          />
          <span
            aria-hidden
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/70 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <ArrowUpRight className="h-4 w-4 text-foreground" />
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-base font-semibold leading-snug tracking-tight">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{summary}</p>
        </div>
      </a>
    </motion.div>
  );
}

const SLIDES = Math.ceil(projectOrder.length / 3);

export function Projects() {
  const t = useTranslations('projects');
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Section id="projects" title={t('title')} subtitle={t('subtitle')}>
      <FadeIn>
        <div className="relative mx-auto max-w-6xl">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            slidesPerGroup={3}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            onSlideChange={(swiper) => setActiveIndex(Math.round(swiper.activeIndex / 3))}
            a11y={{ prevSlideMessage: 'Previous projects', nextSlideMessage: 'Next projects' }}
            className="pb-2!"
          >
            {projectOrder.map((key) => {
              const meta = projectMeta[key];
              return (
                <SwiperSlide key={key} className="h-auto self-stretch">
                  <ProjectCard
                    accent={meta.accent}
                    title={t(`items.${key}.title`)}
                    summary={t(`items.${key}.summary`)}
                    image={meta.image}
                    live={meta.live}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation + dots */}
          <div className="mt-8 flex items-center justify-center gap-6">
            {/* Prev */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous projects"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-emerald-500/60 hover:bg-emerald-500/10 hover:text-emerald-400 disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Project slides">
              {Array.from({ length: SLIDES }).map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => {
                    swiperRef.current?.slideTo(i * 3);
                    setActiveIndex(i);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? 'h-2 w-6 bg-emerald-500'
                      : 'h-2 w-2 bg-border hover:bg-emerald-500/40'
                  }`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next projects"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:border-emerald-500/60 hover:bg-emerald-500/10 hover:text-emerald-400 disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
