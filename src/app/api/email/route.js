import sgMail from '@sendgrid/mail';
import { NextResponse } from 'next/server';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  const { name, email, message } = req.body;
  

    const msg = {
        to: 'dan@danspelt.com',
        from: email,
        subject: `New message from ${name}`,
        text: message
    };

    try {
        await sgMail.send(msg);
        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }
}
