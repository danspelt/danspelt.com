import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PROFESSIONAL_PROFILE } from '@/data/professional-profile';
import { ArrowRight, Mail, Calendar } from 'lucide-react';

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
    'Full-Stack Web Development',
    'Custom Software Development',
    'Workflow Automation',
    'Accessibility Engineering',
    'WCAG Compliance',
    'SaaS Development',
    ...PROFESSIONAL_PROFILE.skills,
  ],
  hasOccupation: PROFESSIONAL_PROFILE.experience.map((job) => ({
    '@type': 'EmployeeRole',
    roleName: job.role,
    worksFor: { '@type': 'Organization', name: job.company },
    startDate: job.dates.split(' – ')[0],
    endDate: job.dates.split(' – ')[1] === 'Present' ? undefined : job.dates.split(' – ')[1],
    description: job.highlights.join('. '),
  })),
  alumniOf: PROFESSIONAL_PROFILE.education.map((edu) => ({
    '@type': 'EducationalOrganization',
    name: edu.institution,
  })),
};

export const metadata = {
  title: 'Dan Spelt Employment History | Full-Stack Developer Experience',
  description:
    'Dan Spelt\'s employment history: 18+ years as a full-stack developer at CanAssist, Youneeq, Neil Squire Society, and independent work. Victoria, BC, Canada.',
  keywords: [
    'Dan Spelt employment history',
    'full stack developer experience',
    'CanAssist developer',
    'Youneeq developer',
    'Neil Squire Society developer',
    'senior software developer Canada',
    'Victoria BC software developer',
    'accessibility developer experience',
    'remote full stack developer',
  ],
  openGraph: {
    title: 'Dan Spelt Employment History | Full-Stack Developer Experience',
    description:
      '18+ years of full-stack development experience across CanAssist, Youneeq, Neil Squire Society, and independent work in Victoria, BC.',
    url: 'https://danspelt.com/employment',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dan Spelt Employment History | Full-Stack Developer Experience',
    description:
      '18+ years of full-stack development experience across CanAssist, Youneeq, Neil Squire Society, and independent work.',
  },
  alternates: {
    canonical: 'https://danspelt.com/employment',
  },
};

export default function EmploymentPage() {
  const { experience, education } = PROFESSIONAL_PROFILE;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="container mx-auto max-w-5xl px-4 py-12 sm:py-16">
      <header className="max-w-3xl mb-12 sm:mb-16">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
          Career background
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-5">
          Employment history
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          18+ years building software for non-profits, universities, SaaS products, and community organizations.
          This page lists the roles behind the projects and case studies.
        </p>
      </header>

      <section aria-labelledby="employment-heading" className="mb-16">
        <h2 id="employment-heading" className="sr-only">
          Roles
        </h2>
        <div className="space-y-6">
          {experience.map((job) => (
            <Card key={`${job.role}-${job.company}`} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl sm:text-2xl font-semibold">{job.role}</CardTitle>
                    <p className="text-base text-muted-foreground mt-1">{job.company}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    {job.dates}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {job.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-3 text-muted-foreground leading-relaxed"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="education-heading" className="mb-16">
        <h2 id="education-heading" className="text-2xl sm:text-3xl font-semibold mb-6">
          Education
        </h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <Card key={edu.credential}>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-1">{edu.credential}</h3>
                <p className="text-muted-foreground mb-3">{edu.institution}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{edu.notes}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-2">See a fit for your team?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Open to remote full-time, contract, and project-based work.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild>
            <Link href="/contact?intent=hire">
              <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
              Discuss a role
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/about">
              About Dan
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </footer>
    </div>
    </>
  );
}
