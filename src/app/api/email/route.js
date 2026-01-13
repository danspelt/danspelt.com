import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

export const runtime = 'nodejs';

// Input validation schema
const emailSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
});

export async function POST(req) {
  try {
    const data = await req.json();
    
    // Validate input
    const validatedData = emailSchema.parse(data);
    const { name, email, message } = validatedData;

    const apiKey = (process.env.RESEND_API_KEY || process.env['\uFEFFRESEND_API_KEY'] || '').trim();
    const from = (process.env.RESEND_FROM || process.env.RESEND_FROM_EMAIL || '').trim();
    const toEmail = (process.env.CONTACT_TO_EMAIL || 'danspelt24@gmail.com').trim();

    if (!apiKey) {
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
          <p><strong>From:</strong> ${name} (${email})</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="white-space: pre-wrap;">${message}</p>
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

    const presentEnvKeys = Object.keys(process.env)
      .filter((k) => k.toUpperCase().includes('RESEND') || k.toUpperCase().includes('CONTACT_TO_EMAIL'))
      .sort();

    const resendApiKeyTrimmedLength = (process.env.RESEND_API_KEY || '').trim().length;
    const resendApiKeyBomTrimmedLength = (process.env['\uFEFFRESEND_API_KEY'] || '').trim().length;

    const configStatus = {
      hasResendApiKey: !!(process.env.RESEND_API_KEY || '').trim(),
      hasResendApiKeyBom: !!(process.env['\uFEFFRESEND_API_KEY'] || '').trim(),
      hasResendFrom: !!(process.env.RESEND_FROM || '').trim(),
      hasResendFromEmail: !!(process.env.RESEND_FROM_EMAIL || '').trim(),
      hasContactToEmail: !!(process.env.CONTACT_TO_EMAIL || '').trim(),
      resendApiKeyTrimmedLength,
      resendApiKeyBomTrimmedLength,
      presentEnvKeys,
    };

    console.error('Email configStatus:', configStatus);

    const details = error instanceof Error ? error.message : 'Unknown error';
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send email', details, configStatus },
      { status: 500 }
    );
  }
}
