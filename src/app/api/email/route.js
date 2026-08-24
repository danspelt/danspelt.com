import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { consumeRateLimit, getClientKey } from '@/lib/rate-limit';

export const runtime = 'nodejs';

// Input validation schema
const emailSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
  website: z.string().max(200).optional().default(''),
});

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character]);
}

export async function POST(req) {
  try {
    const data = await req.json();
    
    // Validate input
    const validatedData = emailSchema.parse(data);
    const { name, email, message, website } = validatedData;
    if (website) {
      return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    }

    const limit = consumeRateLimit(`contact:${getClientKey(req)}`, { max: 5, windowMs: 60 * 60 * 1000 });
    if (limit.limited) {
      return NextResponse.json(
        { error: 'Too many messages. Please wait and try again.' },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } }
      );
    }
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const apiKey = (process.env.RESEND_API_KEY || process.env['\uFEFFRESEND_API_KEY'] || '').trim();
    const from = (process.env.RESEND_FROM || process.env.RESEND_FROM_EMAIL || '').trim();
    const toEmail = (process.env.CONTACT_TO_EMAIL || 'danspelt24@gmail.com').trim();

    if (!apiKey || apiKey === 'undefined') {
      throw new Error('RESEND_API_KEY is not configured');
    }

    if (!from) {
      throw new Error('RESEND_FROM is not configured');
    }

    if (!from.includes('@')) {
      throw new Error('RESEND_FROM must be a valid sender address, e.g. "Dan Spelt <noreply@danspelt.com>"');
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to: [toEmail],
      subject: `New message from ${name}`,
      replyTo: email,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Message from Website</h2>
          <p><strong>From:</strong> ${safeName} (${safeEmail})</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      throw new Error(error.message || 'Failed to send email');
    }

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Please check the form fields and try again.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Unable to send your message right now. Please try again later.' },
      { status: 500 }
    );
  }
}
