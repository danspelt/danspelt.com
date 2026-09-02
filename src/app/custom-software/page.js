import CustomSoftwareClient from "./CustomSoftwareClient";

export const metadata = {
  title: "Custom Software That Fits Your Business | Dan Spelt",
  description:
    "What if the problems holding your business back are pointing the way forward? Practical custom software designed around your workflow, not the other way around.",
  openGraph: {
    title: "What If the Problems Holding Your Business Back Are Pointing the Way Forward?",
    description:
      "Practical custom software designed around your workflow, not the other way around. Start with the problem, not the product.",
    type: "website",
    url: "https://danspelt.com/custom-software",
  },
  alternates: {
    canonical: "https://danspelt.com/custom-software",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Dan Spelt — Custom Software Development",
  description:
    "Custom software, workflow automation, customer portals, and communication tools designed around your business challenges.",
  url: "https://danspelt.com/custom-software",
  founder: {
    "@type": "Person",
    name: "Dan Spelt",
    url: "https://danspelt.com",
  },
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Victoria",
    addressRegion: "BC",
    addressCountry: "CA",
  },
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
