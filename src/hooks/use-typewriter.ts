'use client';

import { useState, useEffect, useRef } from 'react';

type Options = {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
  initialDelay?: number;
  enabled?: boolean;
};

export function useTypewriter({
  words,
  typeSpeed = 60,
  deleteSpeed = 35,
  pauseMs = 1800,
  initialDelay = 900,
  enabled = true,
}: Options) {
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [ready, setReady] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Wait for initial blur+fade animation to finish before typing
  useEffect(() => {
    if (!enabled) {
      setDisplayed(words[0] ?? '');
      setReady(true);
      return;
    }
    const id = setTimeout(() => setReady(true), initialDelay);
    return () => clearTimeout(id);
  }, [enabled, initialDelay, words]);

  // Blinking cursor
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(id);
  }, [enabled]);

  useEffect(() => {
    if (!ready) return;
    if (!enabled) return;

    const current = words[wordIndex % words.length];

    if (!isDeleting && displayed === current) {
      timeout.current = setTimeout(() => setIsDeleting(true), pauseMs);
      return;
    }

    if (isDeleting && displayed === '') {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const delay = isDeleting ? deleteSpeed : typeSpeed;
    timeout.current = setTimeout(() => {
      setDisplayed(
        isDeleting
          ? current.slice(0, displayed.length - 1)
          : current.slice(0, displayed.length + 1),
      );
    }, delay);

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [displayed, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseMs, ready, enabled]);

  return { displayed, showCursor };
}
