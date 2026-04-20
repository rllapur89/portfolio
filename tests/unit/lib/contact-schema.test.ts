import { describe, it, expect } from 'vitest';
import { contactSchema } from '@/lib/contact-schema';

describe('contactSchema', () => {
  const valid = { name: 'Rene', email: 'rene@example.com', message: 'Hello world this is a message' };

  it('accepts valid input', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it('rejects empty name', () => {
    const result = contactSchema.safeParse({ ...valid, name: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('nameRequired');
    }
  });

  it('rejects invalid email', () => {
    const result = contactSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('emailInvalid');
    }
  });

  it('rejects message shorter than 10 chars', () => {
    const result = contactSchema.safeParse({ ...valid, message: 'short' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('messageShort');
    }
  });

  it('accepts message of exactly 10 chars', () => {
    expect(contactSchema.safeParse({ ...valid, message: '1234567890' }).success).toBe(true);
  });

  it('rejects missing fields', () => {
    expect(contactSchema.safeParse({}).success).toBe(false);
  });
});
