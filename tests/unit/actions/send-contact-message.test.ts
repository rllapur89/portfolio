import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock 'use server' directive — not supported in Vitest
vi.mock('@/app/[locale]/actions', async () => {
  const actual = await import('../../../src/app/[locale]/actions');
  return actual;
});

const mockSend = vi.fn().mockResolvedValue({ error: null });

// Mock Resend
vi.mock('resend', () => ({
  Resend: class {
    emails = { send: mockSend };
  },
}));

const valid = { name: 'Rene', email: 'rene@example.com', message: 'Hello this is a test message' };

describe('sendContactMessage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    mockSend.mockResolvedValue({ error: null });
  });

  it('returns unconfigured when RESEND_API_KEY is missing', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    const { sendContactMessage } = await import('@/app/[locale]/actions');
    const result = await sendContactMessage(valid);
    expect(result).toEqual({ ok: false, error: 'unconfigured' });
  });

  it('returns validation error for invalid email', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test_key');
    const { sendContactMessage } = await import('@/app/[locale]/actions');
    const result = await sendContactMessage({ ...valid, email: 'bad-email' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe('validation');
      expect(result.fieldErrors?.email).toBe('emailInvalid');
    }
  });

  it('returns validation error for short message', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test_key');
    const { sendContactMessage } = await import('@/app/[locale]/actions');
    const result = await sendContactMessage({ ...valid, message: 'short' });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe('validation');
      expect(result.fieldErrors?.message).toBe('messageShort');
    }
  });

  it('returns ok: true on successful send', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test_key');
    vi.stubEnv('CONTACT_EMAIL_TO', 'to@example.com');
    vi.stubEnv('CONTACT_EMAIL_FROM', 'from@example.com');
    const { sendContactMessage } = await import('@/app/[locale]/actions');
    const result = await sendContactMessage(valid);
    expect(result).toEqual({ ok: true });
  });

  it('returns send_failed when Resend returns an error', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test_key');
    mockSend.mockResolvedValueOnce({ error: { message: 'API error' } });
    const { sendContactMessage } = await import('@/app/[locale]/actions');
    const result = await sendContactMessage(valid);
    expect(result).toEqual({ ok: false, error: 'send_failed' });
  });

  it('returns send_failed when Resend throws', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test_key');
    mockSend.mockRejectedValueOnce(new Error('Network error'));
    const { sendContactMessage } = await import('@/app/[locale]/actions');
    const result = await sendContactMessage(valid);
    expect(result).toEqual({ ok: false, error: 'send_failed' });
  });
});
