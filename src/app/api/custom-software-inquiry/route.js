import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

export const runtime = 'nodejs';

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  business: z.string().max(200).optional().or(z.literal('')),
  challenge: z
    .string()
    .min(10, 'Please tell me a little more about what you would like to improve')
    .max(5000),
  contactMethod: z.enum(['email', 'phone', 'video']),
  // Honeypot field — real users never fill this in.
  website: z.string().max(0).optional().or(z.literal('')),
});

const CONTACT_LABELS = {
  email: 'Email',
  phone: 'Phone call',
  video: 'Video call',
};

const escapeHtml = (str = '') =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function POST(req) {
  try {
    const data = await req.json();
    const parsed = inquirySchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Invalid input',
          fields: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, business, challenge, contactMethod, website } = parsed.data;

    // Honeypot triggered — pretend success without sending anything.
    if (website) {
      return NextResponse.json({ message: 'Received' }, { status: 200 });
    }

    const apiKey = (process.env.RESEND_API_KEY || process.env['\uFEFFRESEND_API_KEY'] || '').trim();
    const from = (process.env.RESEND_FROM || process.env.RESEND_FROM_EMAIL || '').trim();
    const toEmail = (process.env.CONTACT_TO_EMAIL || 'danspelt24@gmail.com').trim();

    if (!apiKey || !from || !from.includes('@')) {
      // Log configuration problems without logging any submitted personal data.
      console.error('Custom software inquiry: email service is not configured', {
        hasApiKey: !!apiKey,
        hasFrom: !!from,
      });
      return NextResponse.json(
        { error: 'The contact service is temporarily unavailable. Please email me directly.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to: [toEmail],
      subject: `Custom software inquiry from ${name}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Business/Organization: ${business || '(not provided)'}`,
        `Preferred way to connect: ${CONTACT_LABELS[contactMethod]}`,
        '',
        'What they would like to improve:',
        challenge,
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Custom Software Inquiry</h2>
          <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
          <p><strong>Business/Organization:</strong> ${escapeHtml(business || '(not provided)')}</p>
          <p><strong>Preferred way to connect:</strong> ${CONTACT_LABELS[contactMethod]}</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="white-space: pre-wrap;">${escapeHtml(challenge)}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      // Log the failure without storing submitted personal information.
      console.error('Custom software inquiry: send failed', { message: error.message });
      return NextResponse.json(
        { error: 'Failed to send your message. Please try again or email me directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Inquiry sent successfully' }, { status: 200 });
  } catch (err) {
    console.error('Custom software inquiry: unexpected error', {
      message: err instanceof Error ? err.message : 'Unknown error',
    });
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email me directly.' },
      { status: 500 }
    );
  }
}
