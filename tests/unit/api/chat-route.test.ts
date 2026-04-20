import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Mock AI SDK ──────────────────────────────────────────────────────────────

const mockToUIMessageStream = vi.fn(() => 'mock-stream');
const mockStreamText = vi.fn(() => ({ toUIMessageStream: mockToUIMessageStream }));
const mockValidateUIMessages = vi.fn(async ({ messages }: { messages: unknown[] }) => messages);
const mockConvertToModelMessages = vi.fn(async (msgs: unknown[]) => msgs);
const mockCreateUIMessageStreamResponse = vi.fn(() => new Response('ok', { status: 200 }));

vi.mock('ai', () => ({
  streamText: mockStreamText,
  validateUIMessages: mockValidateUIMessages,
  convertToModelMessages: mockConvertToModelMessages,
  createUIMessageStreamResponse: mockCreateUIMessageStreamResponse,
}));

// ─── Mock providers ───────────────────────────────────────────────────────────

const mockGroqModel = vi.fn(() => 'groq-model');
const mockGoogleModel = vi.fn(() => 'google-model');
const mockAnthropicModel = vi.fn(() => 'anthropic-model');
const mockCerebrasModel = vi.fn(() => 'cerebras-model');

vi.mock('@ai-sdk/groq', () => ({ createGroq: vi.fn(() => mockGroqModel) }));
vi.mock('@ai-sdk/google', () => ({ createGoogleGenerativeAI: vi.fn(() => mockGoogleModel) }));
vi.mock('@ai-sdk/anthropic', () => ({ createAnthropic: vi.fn(() => mockAnthropicModel) }));
vi.mock('@ai-sdk/openai-compatible', () => ({
  createOpenAICompatible: vi.fn(() => mockCerebrasModel),
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────

const makeRequest = (body: object) =>
  new Request('http://localhost/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

const userMessage = { role: 'user', parts: [{ type: 'text', text: 'Hi' }], id: 'm1' };

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('POST /api/chat', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    mockValidateUIMessages.mockImplementation(async ({ messages }: { messages: unknown[] }) => messages);
    mockConvertToModelMessages.mockImplementation(async (msgs: unknown[]) => msgs);
    mockStreamText.mockReturnValue({ toUIMessageStream: mockToUIMessageStream });
    mockCreateUIMessageStreamResponse.mockReturnValue(new Response('ok', { status: 200 }));
  });

  it('returns 503 when no provider is configured', async () => {
    const { POST } = await import('@/app/api/chat/route');
    const res = await POST(makeRequest({ messages: [userMessage], locale: 'en' }));
    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body.error).toBe('No AI provider configured');
  });

  it('uses Groq when GROQ_API_KEY is set', async () => {
    vi.stubEnv('GROQ_API_KEY', 'gsk_test');
    const { POST } = await import('@/app/api/chat/route');
    const res = await POST(makeRequest({ messages: [userMessage], locale: 'en' }));
    expect(res.status).toBe(200);
    expect(mockStreamText).toHaveBeenCalledWith(
      expect.objectContaining({ model: 'groq-model' }),
    );
  });

  it('uses Google when GOOGLE_GENERATIVE_AI_API_KEY is set', async () => {
    vi.stubEnv('GOOGLE_GENERATIVE_AI_API_KEY', 'AIza_test');
    const { POST } = await import('@/app/api/chat/route');
    await POST(makeRequest({ messages: [userMessage], locale: 'en' }));
    expect(mockStreamText).toHaveBeenCalledWith(
      expect.objectContaining({ model: 'google-model' }),
    );
  });

  it('uses Anthropic when ANTHROPIC_API_KEY is set', async () => {
    vi.stubEnv('ANTHROPIC_API_KEY', 'sk-ant-test');
    const { POST } = await import('@/app/api/chat/route');
    await POST(makeRequest({ messages: [userMessage], locale: 'en' }));
    expect(mockStreamText).toHaveBeenCalledWith(
      expect.objectContaining({ model: 'anthropic-model' }),
    );
  });

  it('passes system prompt and converted messages to streamText', async () => {
    vi.stubEnv('GROQ_API_KEY', 'gsk_test');
    const { POST } = await import('@/app/api/chat/route');
    await POST(makeRequest({ messages: [userMessage], locale: 'en' }));
    expect(mockStreamText).toHaveBeenCalledWith(
      expect.objectContaining({
        system: expect.stringContaining('René Llapur'),
        messages: expect.any(Array),
        maxOutputTokens: 512,
        temperature: 0.7,
      }),
    );
  });

  it('uses Spanish system prompt when locale is es', async () => {
    vi.stubEnv('GROQ_API_KEY', 'gsk_test');
    const { POST } = await import('@/app/api/chat/route');
    await POST(makeRequest({ messages: [userMessage], locale: 'es' }));
    expect(mockStreamText).toHaveBeenCalledWith(
      expect.objectContaining({
        system: expect.stringContaining('búsqueda activa'),
      }),
    );
  });

  it('falls back to next provider when first throws', async () => {
    vi.stubEnv('GROQ_API_KEY', 'gsk_test');
    vi.stubEnv('GOOGLE_GENERATIVE_AI_API_KEY', 'AIza_test');
    mockStreamText
      .mockImplementationOnce(() => { throw new Error('Groq rate limit'); })
      .mockReturnValueOnce({ toUIMessageStream: mockToUIMessageStream });
    const { POST } = await import('@/app/api/chat/route');
    const res = await POST(makeRequest({ messages: [userMessage], locale: 'en' }));
    expect(res.status).toBe(200);
    expect(mockStreamText).toHaveBeenCalledTimes(2);
    // Second call used the Google model
    expect(mockStreamText).toHaveBeenNthCalledWith(2,
      expect.objectContaining({ model: 'google-model' }),
    );
  });

  it('returns 503 when all providers fail', async () => {
    vi.stubEnv('GROQ_API_KEY', 'gsk_test');
    vi.stubEnv('GOOGLE_GENERATIVE_AI_API_KEY', 'AIza_test');
    mockStreamText.mockImplementation(() => { throw new Error('all fail'); });
    const { POST } = await import('@/app/api/chat/route');
    const res = await POST(makeRequest({ messages: [userMessage], locale: 'en' }));
    expect(res.status).toBe(503);
    const body = await res.json();
    expect(body.error).toBe('All providers failed');
  });

  it('defaults locale to en when not provided', async () => {
    vi.stubEnv('GROQ_API_KEY', 'gsk_test');
    const { POST } = await import('@/app/api/chat/route');
    await POST(makeRequest({ messages: [userMessage] }));
    expect(mockStreamText).toHaveBeenCalledWith(
      expect.objectContaining({
        system: expect.stringContaining('Always respond in English'),
      }),
    );
  });
});
