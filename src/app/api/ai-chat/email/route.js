import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

export const runtime = 'nodejs';

const emailSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(100),
  company: z.string().max(100).optional().or(z.literal('')),
  needs: z.string().min(5).max(2000),
  consent: z.literal(true),
  transcript: z.string().min(10).max(15000),
  website: z.string().max(0).optional().or(z.literal('')),
});

const MAX_EMAILS_PER_WINDOW = 5;
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
  return record.count > MAX_EMAILS_PER_WINDOW;
}

const escapeHtml = (str = '') =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function POST(req) {
  try {
    const data = await req.json();
    const parsed = emailSchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input. Please check all fields and try again.' },
        { status: 400 }
      );
    }

    const { name, email, company, needs, transcript, website } = parsed.data;

    // Honeypot: silently succeed if bot filled the hidden field
    if (website) {
      return NextResponse.json({ message: 'Received' }, { status: 200 });
    }

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const apiKey = (process.env.RESEND_API_KEY || process.env['\uFEFFRESEND_API_KEY'] || '').trim();
    const from = (process.env.RESEND_FROM || process.env.RESEND_FROM_EMAIL || '').trim();
    const toEmail = (process.env.CONTACT_TO_EMAIL || 'danspelt24@gmail.com').trim();

    if (apiKey === 'undefined' || !from || !from.includes('@')) {
      console.error('AI chat email: email service is not configured', {
        hasApiKey: !!apiKey,
        hasFrom: !!from,
      });
      return NextResponse.json(
        { error: 'The email service is temporarily unavailable. Please try again later.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const formattedTranscript = transcript
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => `• ${line}`)
      .join('\n');

    const { error } = await resend.emails.send({
      from,
      to: [toEmail],
      subject: `AI chat lead from ${name}${company ? ` (${company})` : ''}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company/Organization: ${company}` : '',
        '',
        'What they need:',
        needs,
        '',
        'Conversation transcript:',
        formattedTranscript,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New AI Chat Lead</h2>
          <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
          ${company ? `<p><strong>Company/Organization:</strong> ${escapeHtml(company)}</p>` : ''}
          <p><strong>What they need:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(needs)}</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Conversation transcript:</strong></p>
            <p style="white-space: pre-wrap;">${escapeHtml(formattedTranscript)}</p>
          </div>
          <p style="font-size: 12px; color: #666;">
            This transcript was sent with the visitor's consent. It is not stored permanently on the server.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('AI chat email: send failed', { message: error.message });
      return NextResponse.json(
        { error: 'Failed to send your message. Please try again or email me directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Conversation sent successfully' }, { status: 200 });
  } catch (err) {
    console.error('AI chat email: unexpected error', {
      message: err instanceof Error ? err.message : 'Unknown error',
    });
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email me directly.' },
      { status: 500 }
    );
  }
}
