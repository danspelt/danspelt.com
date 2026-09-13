import HomeClient from './HomeClient';
import { PROFESSIONAL_PROFILE } from '@/data/professional-profile';

export const metadata = {
  title: {
    absolute:
      'Dan Spelt — Custom Software Developer & Business Problem Solver | Victoria BC',
  },
  description:
    'Hire Dan Spelt, a custom software developer and full-stack engineer in Victoria, BC. 18+ years building business software, workflow automation, accessible web apps, and SaaS platforms for organizations across Canada and the US.',
  keywords: [
    'custom software developer Victoria BC',
    'business software developer',
    'full stack developer Victoria BC',
    'software consultant Victoria BC',
    'workflow automation developer',
    'SaaS developer Canada',
    'accessible web applications',
    'Next.js developer',
    'React developer',
    'business process software',
  ],
  openGraph: {
    title: 'Dan Spelt — Custom Software Developer & Business Problem Solver | Victoria BC',
    description:
      'Custom software development, workflow automation, and accessible web applications from a senior full-stack developer in Victoria, BC.',
    url: 'https://danspelt.com',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dan Spelt — Custom Software Developer & Business Problem Solver | Victoria BC',
    description:
      'Custom software development, workflow automation, and accessible web applications from a senior full-stack developer in Victoria, BC.',
  },
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
  knowsAbout: [
    'Custom Software Development',
    'Full-Stack Web Development',
    'Workflow Automation',
    'Business Process Improvement',
    'SaaS Platform Development',
    'Accessibility Engineering',
    'WCAG Compliance',
    'Assistive Technology',
    'React',
    'Next.js',
    'Node.js',
    'MongoDB',
    'TypeScript',
    ...PROFESSIONAL_PROFILE.skills,
  ],
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
