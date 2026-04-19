'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';

type BootLineItem = { text: string; delay: number; ready?: boolean };

const BOOT_LINES: Record<string, BootLineItem[]> = {
  en: [
    { text: 'Initializing Angular workspace...', delay: 300 },
    { text: 'Loading React components...', delay: 600 },
    { text: 'Connecting to NestJS services...', delay: 900 },
    { text: 'Compiling TypeScript strict mode...', delay: 1200 },
    { text: 'Mounting Next.js App Router...', delay: 1500 },
    { text: 'Syncing Azure AD pipelines...', delay: 1800 },
    { text: 'Loading Docker containers...', delay: 2100 },
    { text: 'Loading backend experience: PHP, Java/Spring Boot, Node.js, NestJS...', delay: 2100 },
    { text: '12 years of experience loaded.', delay: 2700 },
    { text: 'System ready. Welcome, visitor.', delay: 3000, ready: true },
  ],
  es: [
    { text: 'Inicializando workspace de Angular...', delay: 300 },
    { text: 'Cargando componentes React...', delay: 600 },
    { text: 'Conectando servicios NestJS...', delay: 900 },
    { text: 'Compilando TypeScript en modo estricto...', delay: 1200 },
    { text: 'Montando Next.js App Router...', delay: 1500 },
    { text: 'Sincronizando pipelines de Azure AD...', delay: 1800 },
    { text: 'Cargando contenedores Docker...', delay: 2100 },
    { text: 'Cargando experiencia de backend: PHP, Java/Spring Boot, Node.js, NestJS...', delay: 2100 },
    { text: '12 años de experiencia cargados.', delay: 2700 },
    { text: 'Sistema listo. Bienvenido, visitante.', delay: 3000, ready: true },
  ],
};

const TOTAL_MS = 3000 + 800 + 600;

const TITLE_CHARS = ['<', '>', ' ', 'R', 'E', 'N', 'E', ' ', 'L', 'L', 'A', 'P', 'U', 'R', ' ', '<', '/', '>'];

function BootLine({ text, ready }: { text: string; ready?: boolean }) {
  const [typed, setTyped] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <div className="flex justify-between gap-8 font-mono text-xs md:text-sm">
      <span className="text-muted-foreground">
        <span className="mr-2 text-accent">&gt;</span>
        {typed}
        {typed.length < text.length && (
          <span className="animate-pulse text-accent">_</span>
        )}
      </span>
      {typed.length === text.length && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className={ready ? 'font-bold text-accent' : 'text-accent/60'}
        >
          [{ready ? 'READY' : 'OK'}]
        </motion.span>
      )}
    </div>
  );
}

function ProgressBar({ totalMs }: { totalMs: number }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const frame = () => {
      const elapsed = Date.now() - start;
      const next = Math.min(100, Math.round((elapsed / totalMs) * 100));
      setPct(next);
      if (next < 100) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [totalMs]);

  return (
    <div className="mt-6 w-full font-mono text-xs text-muted-foreground/60">
      <div className="relative h-1 w-full overflow-hidden rounded-none bg-accent/20">
        <div
          className="absolute left-0 top-0 h-full bg-accent transition-none"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-1 text-center text-accent/50">{pct}% LOADED</div>
    </div>
  );
}

export function PageLoader({ locale = 'en' }: { locale?: string }) {
  const reduced = usePrefersReducedMotion();
  const lines = BOOT_LINES[locale] ?? BOOT_LINES.en;
  const [visibleLines, setVisibleLines] = useState<BootLineItem[]>([]);
  const [visible, setVisible] = useState(() => !reduced);

  useEffect(() => {
    if (reduced) return;

    const timers: NodeJS.Timeout[] = [];

    lines.forEach((line) => {
      timers.push(setTimeout(() => {
        setVisibleLines((prev) => [...prev, line]);
      }, line.delay));
    });

    timers.push(setTimeout(() => setVisible(false), TOTAL_MS));

    return () => timers.forEach(clearTimeout);
  }, [reduced, lines]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background px-8"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 flex items-center font-mono text-2xl font-bold tracking-widest md:text-4xl"
          >
            {TITLE_CHARS.map((char, i) => {
              const isTag = char === '<' || char === '>' || char === '/';
              const isSpace = char === ' ';
              return (
                <span
                  key={i}
                  className={isTag ? 'text-accent' : isSpace ? 'w-[0.35em]' : 'text-foreground'}
                >
                  {char}
                </span>
              );
            })}
          </motion.div>

          <div className="w-full max-w-lg space-y-2">
            <AnimatePresence>
              {visibleLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <BootLine text={line.text} ready={line.ready} />
                </motion.div>
              ))}
            </AnimatePresence>

            {visibleLines.length > 0 && (
              <ProgressBar totalMs={TOTAL_MS - 400} />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
