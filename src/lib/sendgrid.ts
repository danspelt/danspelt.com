import { Resend } from "resend";

type Props = {
  to: string;
  templateName: "ContactSubmission";
  dynamicTemplateData?: Record<string, string>;
};

export const sendEmail = async ({
  to,
  dynamicTemplateData,
}: Props) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { name, email, message } = dynamicTemplateData ?? {};

  try {
    await resend.emails.send({
      from: "Dan Spelt <noreply@danspelt.com>",
      to,
      subject: `New contact form message from ${name ?? "someone"}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }
};
