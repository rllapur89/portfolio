import { describe, it, expect, beforeEach, vi } from 'vitest';
import { cn, getSiteUrl, absoluteUrl, formatDate } from '@/lib/utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('resolves tailwind conflicts (last wins)', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4');
  });

  it('handles conditional falsy values', () => {
    expect(cn('base', false && 'ignored', undefined, 'end')).toBe('base end');
  });

  it('handles object syntax', () => {
    expect(cn({ active: true, hidden: false })).toBe('active');
  });
});

describe('getSiteUrl', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it('returns env var without trailing slash', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://renellapur.dev/');
    expect(getSiteUrl()).toBe('https://renellapur.dev');
  });

  it('strips trailing slash from env URL', () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.com/');
    expect(getSiteUrl()).toBe('https://example.com');
  });
});

describe('absoluteUrl', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://renellapur.dev');
  });

  it('prepends site url to path with leading slash', () => {
    expect(absoluteUrl('/about')).toBe('https://renellapur.dev/about');
  });

  it('adds leading slash when path lacks it', () => {
    expect(absoluteUrl('about')).toBe('https://renellapur.dev/about');
  });
});

describe('formatDate', () => {
  it('formats a date string in English', () => {
    expect(formatDate('2024-01-15', 'en')).toContain('January');
    expect(formatDate('2024-01-15', 'en')).toContain('2024');
  });

  it('formats a Date object', () => {
    const d = new Date('2023-06-15T12:00:00Z');
    expect(formatDate(d, 'en')).toContain('June');
  });

  it('defaults to en locale', () => {
    expect(formatDate('2024-03-20')).toContain('March');
  });
});
