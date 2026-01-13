import { Resend } from 'resend';

async function sendTestEmail() {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM;
    const toEmail = process.env.CONTACT_TO_EMAIL || 'danspelt24@gmail.com';

    if (!apiKey) throw new Error('RESEND_API_KEY is not configured');
    if (!from) throw new Error('RESEND_FROM is not configured');

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from,
      to: [toEmail],
      subject: 'Test Email from Website',
      text: 'This is a test email from your website.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Test Email</h2>
          <p>This is a test email from your website.</p>
          <p>If you receive this, the email functionality is working correctly!</p>
        </div>
      `,
    });

    if (error) throw new Error(error.message || 'Failed to send email');

    console.log('Email sent successfully!');
    console.log('Message ID:', data?.id);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendTestEmail();
