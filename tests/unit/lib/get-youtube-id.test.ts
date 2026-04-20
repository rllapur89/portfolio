import { describe, it, expect } from 'vitest';

// Extracted from talks.tsx for testability
function getYouTubeId(url: string): string | null {
  const match = url.match(/[?&]v=([^&#]+)/);
  return match ? match[1] : null;
}

describe('getYouTubeId', () => {
  it('extracts id from standard watch URL', () => {
    expect(getYouTubeId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('extracts id when v is not the first param', () => {
    expect(getYouTubeId('https://www.youtube.com/watch?list=PL123&v=abc123')).toBe('abc123');
  });

  it('returns null for non-youtube URLs', () => {
    expect(getYouTubeId('https://vimeo.com/123456')).toBeNull();
  });

  it('returns null for URLs without v param', () => {
    expect(getYouTubeId('https://www.youtube.com/shorts/abc')).toBeNull();
  });

  it('handles URL with hash after id', () => {
    expect(getYouTubeId('https://www.youtube.com/watch?v=abc123#t=30')).toBe('abc123');
  });
});
