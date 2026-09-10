import CustomSoftwareClient from "./CustomSoftwareClient";

export const metadata = {
  title: "Custom Software Development & Workflow Automation",
  description:
    "Custom software development for businesses and organizations that need better workflows, less administrative work, and practical full-stack web applications.",
  openGraph: {
    title: "Custom Software Development & Workflow Automation | Dan Spelt",
    description:
      "Practical full-stack software designed around your workflow, communication, and information needs.",
    type: "website",
    url: "https://danspelt.com/custom-software",
    images: ["/og.png"],
  },
  alternates: {
    canonical: "https://danspelt.com/custom-software",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Dan Spelt — Custom Software Development",
  description:
    "Custom software, workflow automation, customer portals, and communication tools designed around your business challenges.",
  url: "https://danspelt.com/custom-software",
  provider: {
    "@type": "Person",
    "@id": "https://danspelt.com/#dan-spelt",
    name: "Dan Spelt",
    url: "https://danspelt.com",
  },
  serviceType: [
    "Custom software development",
    "Workflow automation",
    "Full-stack web application development",
    "Accessible web application development",
  ],
  areaServed: "Worldwide",
};

export default function CustomSoftwarePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CustomSoftwareClient />
    </>
  );
}
