import { NextResponse } from 'next/server';
import { z } from 'zod';
import { OpenAI } from 'openai';
import { buildSystemPrompt } from '@/data/professional-profile';

export const runtime = 'nodejs';

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

const rateLimitMap = new Map();

function getClientIp(req) {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now - record.start > WINDOW_MS) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    return false;
  }
  record.count += 1;
  return record.count > MAX_REQUESTS_PER_WINDOW;
}

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

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const apiKey = (process.env.OPENAI_API_KEY || process.env['\uFEFFOPENAI_API_KEY'] || '').trim();
    if (!apiKey) {
      console.error('AI chat: OPENAI_API_KEY is not configured');
      return NextResponse.json(
        { error: 'AI chat is not configured. Please set OPENAI_API_KEY.' },
        { status: 503 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const systemMessage = { role: 'system', content: buildSystemPrompt() };
    const chatMessages = [systemMessage, ...messages];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 800,
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return NextResponse.json(
        { error: 'No response from the AI. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply }, { status: 200 });
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
