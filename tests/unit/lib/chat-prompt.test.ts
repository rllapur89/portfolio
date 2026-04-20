import { describe, it, expect } from 'vitest';
import { buildSystemPrompt } from '@/lib/chat-prompt';

describe('buildSystemPrompt', () => {
  describe('EN locale', () => {
    const prompt = buildSystemPrompt('en');

    it('returns a non-empty string', () => {
      expect(typeof prompt).toBe('string');
      expect(prompt.length).toBeGreaterThan(100);
    });

    it('contains identity section', () => {
      expect(prompt).toContain('René Llapur');
      expect(prompt).toContain('rene.llapur@gmail.com');
      expect(prompt).toContain('Montevideo, Uruguay');
    });

    it('mentions availability for remote roles', () => {
      expect(prompt).toContain('active job search');
      expect(prompt).toContain('remote');
    });

    it('contains key tech stack entries', () => {
      expect(prompt).toContain('Angular');
      expect(prompt).toContain('React');
      expect(prompt).toContain('Next.js');
      expect(prompt).toContain('TypeScript');
    });

    it('contains work experience companies', () => {
      expect(prompt).toContain('Switch Software Solutions');
      expect(prompt).toContain('2innovate');
      expect(prompt).toContain('Verifone');
    });

    it('contains behavior instructions', () => {
      expect(prompt).toContain('actively looking');
      expect(prompt).toContain('Do not invent');
    });

    it('instructs to respond in English', () => {
      expect(prompt).toContain('Always respond in English');
    });
  });

  describe('ES locale', () => {
    const prompt = buildSystemPrompt('es');

    it('returns a non-empty string', () => {
      expect(typeof prompt).toBe('string');
      expect(prompt.length).toBeGreaterThan(100);
    });

    it('instructs to respond in Spanish', () => {
      expect(prompt).toContain('Respondé siempre en español');
    });

    it('contains Spanish availability text', () => {
      expect(prompt).toContain('búsqueda activa');
    });

    it('contains identity in Spanish context', () => {
      expect(prompt).toContain('René Llapur');
      expect(prompt).toContain('Montevideo, Uruguay');
    });

    it('contains Spanish behavior instructions', () => {
      expect(prompt).toContain('No inventes información');
    });
  });

  it('EN and ES prompts are different', () => {
    expect(buildSystemPrompt('en')).not.toBe(buildSystemPrompt('es'));
  });
});
