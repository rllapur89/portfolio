import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTypewriter } from '@/hooks/use-typewriter';

describe('useTypewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows first word immediately when disabled', () => {
    const { result } = renderHook(() =>
      useTypewriter({ words: ['Angular', 'React'], enabled: false })
    );
    expect(result.current.displayed).toBe('Angular');
  });

  it('starts empty when enabled and within initialDelay', () => {
    const { result } = renderHook(() =>
      useTypewriter({ words: ['Angular'], enabled: true, initialDelay: 900 })
    );
    expect(result.current.displayed).toBe('');
  });

  it('begins typing after initialDelay', () => {
    const { result } = renderHook(() =>
      useTypewriter({ words: ['Hi'], enabled: true, initialDelay: 100, typeSpeed: 50 })
    );

    act(() => { vi.advanceTimersByTime(100); }); // initialDelay
    act(() => { vi.advanceTimersByTime(50); });  // type 'H'
    expect(result.current.displayed).toBe('H');

    act(() => { vi.advanceTimersByTime(50); });  // type 'i'
    expect(result.current.displayed).toBe('Hi');
  });

  it('deletes word after pauseMs', () => {
    const { result } = renderHook(() =>
      useTypewriter({ words: ['Hi'], enabled: true, initialDelay: 0, typeSpeed: 10, deleteSpeed: 10, pauseMs: 100 })
    );

    // Flush initialDelay=0 timer so ready=true
    act(() => { vi.advanceTimersByTime(0); });
    // Type full word: 'H' then 'Hi'
    act(() => { vi.advanceTimersByTime(10); });
    act(() => { vi.advanceTimersByTime(10); });
    expect(result.current.displayed).toBe('Hi');

    // Pause then delete
    act(() => { vi.advanceTimersByTime(100); });
    act(() => { vi.advanceTimersByTime(10); }); // 'H'
    expect(result.current.displayed).toBe('H');
    act(() => { vi.advanceTimersByTime(10); }); // ''
    expect(result.current.displayed).toBe('');
  });

  it('cycles to next word after deleting', () => {
    const { result } = renderHook(() =>
      useTypewriter({
        words: ['Hi', 'Hey'],
        enabled: true,
        initialDelay: 0,
        typeSpeed: 10,
        deleteSpeed: 10,
        pauseMs: 50,
      })
    );

    // Flush initialDelay=0 so ready=true
    act(() => { vi.advanceTimersByTime(0); });
    // Type 'Hi'
    act(() => { vi.advanceTimersByTime(10); }); // 'H'
    act(() => { vi.advanceTimersByTime(10); }); // 'Hi'
    // Pause + delete
    act(() => { vi.advanceTimersByTime(50); });
    act(() => { vi.advanceTimersByTime(10); }); // 'H'
    act(() => { vi.advanceTimersByTime(10); }); // ''
    // Cycle to 'Hey'
    act(() => { vi.advanceTimersByTime(10); }); // 'H'
    expect(result.current.displayed).toBe('H');
    act(() => { vi.advanceTimersByTime(10); }); // 'He'
    act(() => { vi.advanceTimersByTime(10); }); // 'Hey'
    expect(result.current.displayed).toBe('Hey');
  });

  it('handles empty words array gracefully', () => {
    const { result } = renderHook(() =>
      useTypewriter({ words: [], enabled: false })
    );
    expect(result.current.displayed).toBe('');
  });
});
