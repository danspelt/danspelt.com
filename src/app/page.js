import HomeClient from './HomeClient';
import { PROFESSIONAL_PROFILE } from '@/data/professional-profile';

export const metadata = {
  title: {
    absolute: 'Custom Software Developer in Victoria, BC | Dan Spelt',
  },
  description:
    'Victoria, BC custom software developer with 18+ years of experience building full-stack web apps, workflow automation, and accessible software for businesses and organizations.',
  alternates: {
    canonical: 'https://danspelt.com',
  },
};

/**
 * Website and person schema built from the approved profile so structured
 * data cannot drift away from what the site actually says.
 */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://danspelt.com/#website',
      url: 'https://danspelt.com',
      name: 'Dan Spelt',
      description: 'Custom software development and full-stack engineering portfolio of Dan Spelt.',
      inLanguage: 'en-CA',
    },
    {
      '@type': 'Person',
      '@id': 'https://danspelt.com/#dan-spelt',
      name: PROFESSIONAL_PROFILE.name,
      jobTitle: PROFESSIONAL_PROFILE.title,
      description: PROFESSIONAL_PROFILE.headline,
      url: PROFESSIONAL_PROFILE.contact.website,
      image: 'https://danspelt.com/images/dan.jpeg',
      email: `mailto:${PROFESSIONAL_PROFILE.contact.email}`,
      sameAs: [
        PROFESSIONAL_PROFILE.contact.linkedin,
        'https://github.com/danspelt',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Victoria',
        addressRegion: 'British Columbia',
        addressCountry: 'CA',
      },
      knowsAbout: PROFESSIONAL_PROFILE.skills,
      alumniOf: PROFESSIONAL_PROFILE.education.map((edu) => ({
        '@type': 'EducationalOrganization',
        name: edu.institution,
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, non-user content generated from the approved profile file.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeClient />
    </>
  );
}
