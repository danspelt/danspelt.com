import { NextResponse } from 'next/server';
import { z } from 'zod';
import { OpenAI } from 'openai';
import { buildSystemPrompt, selectSources } from '@/data/professional-profile';
import { consumeRateLimit, getClientKey } from '@/lib/rate-limit';

export const runtime = 'nodejs';

/** Give up rather than leave the visitor waiting indefinitely. */
const REQUEST_TIMEOUT_MS = 30_000;

const requestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string().min(1).max(4000),
    })
  ).max(50),
  website: z.string().max(0).optional().or(z.literal('')),
});

const MAX_REQUESTS_PER_WINDOW = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export async function POST(req) {
  try {
    const data = await req.json();
    const parsed = requestSchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', fields: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { messages, website } = parsed.data;

    // Honeypot: silently succeed if bot filled the hidden field
    if (website) {
      return NextResponse.json({ reply: 'Thanks for your message.' }, { status: 200 });
    }

    const { limited, retryAfterSeconds } = consumeRateLimit(`ai-chat:${getClientKey(req)}`, {
      max: MAX_REQUESTS_PER_WINDOW,
      windowMs: WINDOW_MS,
    });
    if (limited) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
      );
    }

    const apiKey = (process.env.OPENAI_API_KEY || process.env['\uFEFFOPENAI_API_KEY'] || '').trim();
    if (!apiKey || apiKey === 'undefined') {
      console.error('AI chat: OPENAI_API_KEY is not configured');
      return NextResponse.json(
        { error: 'AI chat is not configured. Please set OPENAI_API_KEY.' },
        { status: 503 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const systemMessage = { role: 'system', content: buildSystemPrompt() };
    const chatMessages = [systemMessage, ...messages];

    const completion = await openai.chat.completions.create(
      {
        model: 'gpt-4o-mini',
        messages: chatMessages,
        temperature: 0.7,
        max_tokens: 800,
      },
      { timeout: REQUEST_TIMEOUT_MS }
    );

    const reply = completion.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return NextResponse.json(
        { error: 'No response from the AI. Please try again.' },
        { status: 500 }
      );
    }

    // Sources are chosen deterministically from an approved catalog so the
    // assistant can never fabricate a link.
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.content ?? '';
    const sources = selectSources(`${lastUserMessage}\n${reply}`);

    return NextResponse.json({ reply, sources }, { status: 200 });
  } catch (err) {
    console.error('AI chat: unexpected error', {
      message: err instanceof Error ? err.message : 'Unknown error',
    });
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
