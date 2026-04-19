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
        <header className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          {eyebrow && (
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              {eyebrow}
            </p>
          )}
          <h2
            id={`${id}-title`}
            className="text-balance text-3xl font-semibold tracking-tight md:text-5xl"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-balance text-base text-muted-foreground md:text-lg">
              {subtitle}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
