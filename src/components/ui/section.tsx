import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionProps = HTMLAttributes<HTMLElement> & {
  id: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
};

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn('scroll-mt-20 py-12 md:py-16', className)}
      {...rest}
    >
      <div className="container-page">
        <header className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          {eyebrow && (
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              {eyebrow}
            </p>
          )}
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-linear-to-r from-transparent to-border" aria-hidden />
            <h2
              id={`${id}-title`}
              className="text-balance text-3xl font-semibold tracking-tight md:text-5xl"
            >
              {title}
            </h2>
            <span className="h-px flex-1 bg-linear-to-l from-transparent to-border" aria-hidden />
          </div>
          {subtitle && (
            <p className="mt-4 text-balance text-base text-muted-foreground md:text-lg">
              {subtitle}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
