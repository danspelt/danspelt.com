import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { challengeSchema, CHALLENGE_CATEGORIES, CONSEQUENCES } from '@/lib/business-challenge';
import { consumeRateLimit, getClientKey } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const escapeHtml = (str = '') =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const labelFor = (list, id) => list.find((item) => item.id === id)?.label ?? id;

const WINDOW_MS = 60 * 60 * 1000; // 1 hour

/** Loose ceiling on all requests, including malformed ones, to deter abuse. */
const MAX_REQUESTS_PER_WINDOW = 30;

/** Strict ceiling on actual emails sent, so typos never burn a send slot. */
const MAX_SENDS_PER_WINDOW = 5;

const tooMany = (retryAfterSeconds) =>
  NextResponse.json(
    { error: 'Too many submissions. Please try again later or email Dan directly.' },
    { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
  );

export async function POST(req) {
  try {
    const clientKey = getClientKey(req);

    const abuse = consumeRateLimit(`business-challenge:requests:${clientKey}`, {
      max: MAX_REQUESTS_PER_WINDOW,
      windowMs: WINDOW_MS,
    });
    if (abuse.limited) return tooMany(abuse.retryAfterSeconds);

    const data = await req.json();
    const parsed = challengeSchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', fields: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const {
      category,
      consequence,
      people,
      hoursPerWeek,
      hourlyCost,
      summary,
      name,
      email,
      organization,
      notes,
      website,
    } = parsed.data;

    // Honeypot triggered — report success without sending anything.
    if (website) {
      return NextResponse.json({ message: 'Received' }, { status: 200 });
    }

    // Only well-formed, genuine submissions count against the send quota.
    const send = consumeRateLimit(`business-challenge:sends:${clientKey}`, {
      max: MAX_SENDS_PER_WINDOW,
      windowMs: WINDOW_MS,
    });
    if (send.limited) return tooMany(send.retryAfterSeconds);

    const apiKey = (process.env.RESEND_API_KEY || process.env['\uFEFFRESEND_API_KEY'] || '').trim();
    const from = (process.env.RESEND_FROM || process.env.RESEND_FROM_EMAIL || '').trim();
    const toEmail = (process.env.CONTACT_TO_EMAIL || 'danspelt24@gmail.com').trim();

    if (!apiKey || !from || !from.includes('@')) {
      console.error('Business challenge: email service is not configured', {
        hasApiKey: !!apiKey,
        hasFrom: !!from,
      });
      return NextResponse.json(
        { error: 'The contact service is temporarily unavailable. Please email Dan directly.' },
        { status: 500 }
      );
    }

    const categoryLabel = labelFor(CHALLENGE_CATEGORIES, category);
    const consequenceLabel = labelFor(CONSEQUENCES, consequence);

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to: [toEmail],
      subject: `Business challenge: ${categoryLabel} — ${name}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Organization: ${organization || '(not provided)'}`,
        '',
        `Friction: ${categoryLabel}`,
        `Consequence: ${consequenceLabel}`,
        `People: ${people}`,
        `Hours per week each: ${hoursPerWeek}`,
        `Assumed hourly cost: ${hourlyCost} CAD`,
        '',
        'Their summary:',
        summary,
        '',
        'Extra notes:',
        notes || '(none)',
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Business Challenge Finder submission</h2>
          <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
          <p><strong>Organization:</strong> ${escapeHtml(organization || '(not provided)')}</p>
          <p><strong>Friction:</strong> ${escapeHtml(categoryLabel)}</p>
          <p><strong>Consequence:</strong> ${escapeHtml(consequenceLabel)}</p>
          <p><strong>Scale:</strong> ${people} people &times; ${hoursPerWeek} h/week, assumed ${hourlyCost} CAD/hour</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="white-space: pre-wrap;">${escapeHtml(summary)}</p>
          </div>
          <h3>Extra notes</h3>
          <p style="white-space: pre-wrap;">${escapeHtml(notes || '(none)')}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Business challenge: send failed', { message: error.message });
      return NextResponse.json(
        { error: 'Failed to send. Please try again or email Dan directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Sent successfully' }, { status: 200 });
  } catch (err) {
    console.error('Business challenge: unexpected error', {
      message: err instanceof Error ? err.message : 'Unknown error',
    });
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email Dan directly.' },
      { status: 500 }
    );
  }
}
