const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'danspelt24@gmail.com',
    pass: process.env.SMTP_PASS
  },
});

async function sendTestEmail() {
  try {
    const info = await transporter.sendMail({
      from: '"Test Sender" <danspelt24@gmail.com>',
      to: 'danspelt24@gmail.com',
      subject: 'Test Email from Website',
      text: 'This is a test email from your website.',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Test Email</h2>
          <p>This is a test email from your website.</p>
          <p>If you receive this, the email functionality is working correctly!</p>
        </div>
      `
    });

    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

sendTestEmail();
