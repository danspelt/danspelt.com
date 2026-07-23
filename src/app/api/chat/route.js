import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

export const runtime = 'nodejs';

const chatSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  transcript: z.string().min(10).max(10000),
  website: z.string().max(0).optional().or(z.literal('')),
});

const escapeHtml = (str = '') =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function POST(req) {
  try {
    const data = await req.json();
    const parsed = chatSchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', fields: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, transcript, website } = parsed.data;

    // Honeypot triggered — pretend success without sending anything.
    if (website) {
      return NextResponse.json({ message: 'Received' }, { status: 200 });
    }

    const apiKey = (process.env.RESEND_API_KEY || process.env['\uFEFFRESEND_API_KEY'] || '').trim();
    const from = (process.env.RESEND_FROM || process.env.RESEND_FROM_EMAIL || '').trim();
    const toEmail = (process.env.CONTACT_TO_EMAIL || 'danspelt24@gmail.com').trim();

    if (!apiKey || !from || !from.includes('@')) {
      console.error('Chat: email service is not configured', {
        hasApiKey: !!apiKey,
        hasFrom: !!from,
      });
      return NextResponse.json(
        { error: 'The contact service is temporarily unavailable. Please email me directly.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const lines = transcript
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => `• ${line}`)
      .join('\n');

    const { error } = await resend.emails.send({
      from,
      to: [toEmail],
      subject: `New chat conversation from ${name}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        'Conversation transcript:',
        lines,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Chat Conversation</h2>
          <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="white-space: pre-wrap;">${escapeHtml(lines)}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Chat: send failed', { message: error.message });
      return NextResponse.json(
        { error: 'Failed to send your message. Please try again or email me directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Conversation sent successfully' }, { status: 200 });
  } catch (err) {
    console.error('Chat: unexpected error', {
      message: err instanceof Error ? err.message : 'Unknown error',
    });
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email me directly.' },
      { status: 500 }
    );
  }
}
