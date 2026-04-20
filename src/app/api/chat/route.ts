import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createGroq } from '@ai-sdk/groq';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  validateUIMessages,
  type LanguageModel,
} from 'ai';
import { buildSystemPrompt } from '@/lib/chat-prompt';

export const runtime = 'nodejs';
export const maxDuration = 30;

function buildProviderChain(): Array<{ name: string; model: LanguageModel }> {
  const chain: Array<{ name: string; model: LanguageModel }> = [];

  if (process.env.GROQ_API_KEY) {
    const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });
    chain.push({ name: 'groq', model: groq('llama-3.3-70b-versatile') });
  }

  if (process.env.CEREBRAS_API_KEY) {
    const cerebras = createOpenAICompatible({
      name: 'cerebras',
      baseURL: 'https://api.cerebras.ai/v1',
      apiKey: process.env.CEREBRAS_API_KEY,
    });
    chain.push({ name: 'cerebras', model: cerebras('llama-3.3-70b') });
  }

  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });
    chain.push({ name: 'google', model: google('gemini-2.0-flash') });
  }

  if (process.env.ANTHROPIC_API_KEY) {
    const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    chain.push({ name: 'anthropic', model: anthropic('claude-haiku-4-5-20251001') });
  }

  return chain;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { messages: rawMessages, locale = 'en' } = body;
  const systemPrompt = buildSystemPrompt(locale as 'en' | 'es');
  const chain = buildProviderChain();

  if (chain.length === 0) {
    return new Response(JSON.stringify({ error: 'No AI provider configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Validate and convert UIMessage[] → ModelMessage[]
  const validatedMessages = await validateUIMessages({ messages: rawMessages });
  const modelMessages = await convertToModelMessages(validatedMessages);

  let lastError: unknown;

  for (const { model } of chain) {
    try {
      const result = streamText({
        model,
        system: systemPrompt,
        messages: modelMessages,
        maxOutputTokens: 512,
        temperature: 0.7,
      });

      return createUIMessageStreamResponse({
        stream: result.toUIMessageStream(),
      });
    } catch (err) {
      lastError = err;
    }
  }

  console.error('All AI providers failed:', lastError);
  return new Response(JSON.stringify({ error: 'All providers failed' }), {
    status: 503,
    headers: { 'Content-Type': 'application/json' },
  });
}
