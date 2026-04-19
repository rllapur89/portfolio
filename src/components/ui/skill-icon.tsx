'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { type SimpleIcon } from 'simple-icons';

type Props = {
  icon: SimpleIcon;
  className?: string;
};

/** Returns true if the hex color is too dark to be visible on a dark background. */
function isDark(hex: string): boolean {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.25;
}

export function SkillIcon({ icon, className = 'h-3.5 w-3.5' }: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Before mount (SSR + first paint): always use brand color to avoid mismatch
  const fill =
    mounted && resolvedTheme === 'dark' && isDark(icon.hex)
      ? 'currentColor'
      : `#${icon.hex}`;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      aria-label={icon.title}
      className={className}
      style={{ fill }}
      suppressHydrationWarning
    >
      <path d={icon.path} suppressHydrationWarning />
    </svg>
  );
}
