import sgMail, { MailDataRequired } from "@sendgrid/mail";

type Props = {
  to: string;
  templateName: "ContactSubmission";
  dynamicTemplateData?: Record<string, string>;
};

export const sendEmail = async ({
  to,
  templateName,
  dynamicTemplateData,
}: Props) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

  const msg: MailDataRequired = {
    to,
    from: {
      email: "donotreply@thisisademobroski.mom",
      name: "This is a Demo Broski",
    },
    templateId: templates[templateName],
    dynamicTemplateData,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send email");
  }
};

const templates = {
  ContactSubmission: "d-66d3db510a7246468691d27b12e19a31",
};
