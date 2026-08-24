import HomeClient from './HomeClient';
import { PROFESSIONAL_PROFILE } from '@/data/professional-profile';

export const metadata = {
  title: {
    absolute: 'Dan Spelt — Senior Full-Stack Engineer',
  },
  description:
    'Senior full-stack engineer with 18+ years building accessible applications, analytics tools, assistive technology, and production web platforms. Open to full-time roles.',
  alternates: {
    canonical: 'https://danspelt.com',
  },
};

/**
 * Person schema built from the approved profile so structured data cannot
 * drift away from what the site actually says.
 */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PROFESSIONAL_PROFILE.name,
  jobTitle: PROFESSIONAL_PROFILE.title,
  description: PROFESSIONAL_PROFILE.headline,
  url: PROFESSIONAL_PROFILE.contact.website,
  email: `mailto:${PROFESSIONAL_PROFILE.contact.email}`,
  sameAs: [PROFESSIONAL_PROFILE.contact.linkedin],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Victoria',
    addressRegion: 'BC',
    addressCountry: 'CA',
  },
  knowsAbout: PROFESSIONAL_PROFILE.skills,
  alumniOf: PROFESSIONAL_PROFILE.education.map((edu) => ({
    '@type': 'EducationalOrganization',
    name: edu.institution,
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, non-user content generated from the approved profile file.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <HomeClient />
    </>
  );
}
