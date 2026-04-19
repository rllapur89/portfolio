import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  /** Size variant: 'sm' for header (two-line block), 'lg' for loader (single line) */
  size?: 'sm' | 'lg';
};

export function BrandLogo({ className, size = 'sm' }: Props) {
  const isLg = size === 'lg';

  /* ── LOADER: { RENE · LLAPUR } in one line ── */
  if (isLg) {
    return (
      <svg
        viewBox="0 0 300 56"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Rene Llapur"
        className={cn('h-16 w-auto', className)}
        fill="currentColor"
      >
        <text x="0" y="46" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="32" fontWeight="700" fill="var(--color-accent)">{'{' }</text>
        <text x="28" y="46" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="32" fontWeight="700" letterSpacing="2" fill="currentColor">RENE</text>
        <circle cx="126" cy="38" r="3" fill="currentColor" opacity="0.4" />
        <text x="138" y="46" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="32" fontWeight="700" letterSpacing="2" fill="currentColor">LLAPUR</text>
        <text x="272" y="46" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="32" fontWeight="700" fill="var(--color-accent)">{'}' }</text>
      </svg>
    );
  }

  /* ── HEADER: two-line block with braces ──
       { RENE   }
       { LLAPUR }
  */
  return (
    <svg
      viewBox="0 0 88 52"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Rene Llapur"
      className={cn('h-9 w-auto', className)}
      fill="currentColor"
    >
      {/* Top row: { RENE } */}
      <text
        x="0" y="22"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="14" fontWeight="700"
        fill="var(--color-accent)"
      >{'{' }</text>
      <text
        x="12" y="22"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="14" fontWeight="700" letterSpacing="1.5"
        fill="currentColor"
      >RENE</text>
      <text
        x="76" y="22"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="14" fontWeight="700"
        fill="var(--color-accent)"
      >{'}' }</text>

      {/* Bottom row: { LLAPUR } */}
      <text
        x="0" y="46"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="14" fontWeight="700"
        fill="var(--color-accent)"
      >{'{' }</text>
      <text
        x="12" y="46"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="14" fontWeight="700" letterSpacing="1.5"
        fill="currentColor"
      >LLAPUR</text>
      <text
        x="76" y="46"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        fontSize="14" fontWeight="700"
        fill="var(--color-accent)"
      >{'}' }</text>
    </svg>
  );
}
