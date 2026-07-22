import CustomSoftwareClient from "./CustomSoftwareClient";

export const metadata = {
  title: "Custom Software Solutions for Business | Dan Spelt",
  description:
    "Explore practical custom software, workflow automation, customer portals, and communication tools designed around your business challenges.",
  openGraph: {
    title: "Turn Business Challenges Into Practical Software",
    description:
      "Explore practical custom software, workflow automation, customer portals, and communication tools designed around your business challenges.",
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
