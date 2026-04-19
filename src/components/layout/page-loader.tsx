'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';

const CHARS = ['<>', ' ', 'R', 'E', 'N', 'E', ' ', 'L', 'L', 'A', 'P', 'U', 'R', ' ', '</>'];
const STAGGER = 0.06;
const LOGO_DELAY = 0.1;
const TEXT_DELAY = 0.5;
const HOLD_MS = 600;
const TOTAL_ANIM_S = TEXT_DELAY + CHARS.length * STAGGER + HOLD_MS / 1000 + 0.5;

export function PageLoader() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduced) {
      setVisible(false);
      return;
    }
    const id = setTimeout(() => setVisible(false), TOTAL_ANIM_S * 1000 + 200);
    return () => clearTimeout(id);
  }, [reduced]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-14 bg-background"
          aria-hidden="true"
        >
          {/* Logo with fade+scale entry and glow pulse */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: LOGO_DELAY, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ delay: LOGO_DELAY + 0.5, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-accent blur-2xl"
            />
            <Image
              src="/logo-loading.webp"
              alt="Rene Llapur"
              width={160}
              height={107}
              className="relative h-36 w-auto drop-shadow-lg md:h-44"
              priority
            />
          </motion.div>

          {/* Staggered text */}
          <div className="flex items-center font-mono text-4xl font-bold tracking-widest md:text-6xl">
            {CHARS.map((char, i) => {
              const isBrace = char === '<>' || char === '</>';
              const isSpace = char === ' ';
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: TEXT_DELAY + i * STAGGER,
                    duration: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={
                    isBrace
                      ? 'text-accent'
                      : isSpace
                        ? 'w-[0.35em]'
                        : 'text-foreground'
                  }
                >
                  {char}
                </motion.span>
              );
            })}
          </div>

          {/* Bottom progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-accent"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: TOTAL_ANIM_S - 0.3, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
