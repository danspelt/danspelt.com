import Link from 'next/link';
import {
  ArrowRight,
  Code2,
  Accessibility,
  ShieldCheck,
  Users,
  Brain,
  BriefcaseBusiness,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroImage from '@/components/HeroImage';
import ProjectProofExplorer from '@/components/home/ProjectProofExplorer';
import { PROFESSIONAL_PROFILE } from '@/data/professional-profile';

const strengths = [
  {
    icon: Users,
    title: 'Team player',
    body: 'I communicate clearly, collaborate well, and follow through — without needing to be the loudest voice in the room.',
  },
  {
    icon: Brain,
    title: 'AI-assisted delivery',
    body: 'I type more slowly than most. AI is my equalizer — I direct, prompt, and verify so quality ships on time.',
  },
  {
    icon: Accessibility,
    title: 'Lived accessibility',
    body: 'Born with cerebral palsy, I understand assistive technology from the inside — not only from a checklist.',
  },
  {
    icon: Code2,
    title: 'Stack-agnostic',
    body: 'I learn the tools you already use, or I bring the right ones. Either way, the system is built around your goals.',
  },
];

export default function HomeClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="container mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="hero-rise text-sm font-medium tracking-[0.18em] uppercase text-secondary-foreground/75 mb-4">
                Senior full-stack engineer · Victoria, BC
              </p>
              <h1 className="hero-rise hero-rise-delay-1 font-display text-4xl sm:text-5xl font-semibold leading-[0.98] mb-5">
                I build dependable software for complex, human problems
              </h1>
              <p className="hero-rise hero-rise-delay-2 text-xl sm:text-2xl text-secondary-foreground/90 leading-relaxed mb-4 text-balance">
                Eighteen-plus years delivering full-stack applications, accessible technology, analytics tools, and production web platforms.
              </p>
              <p className="hero-rise hero-rise-delay-3 text-base text-secondary-foreground/70 max-w-xl mb-8 leading-relaxed">
                I bring senior engineering judgment, clear collaboration, and lived accessibility expertise to teams using React, Next.js, Node.js, and modern web platforms.
              </p>
              <div className="hero-rise hero-rise-delay-4 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="btn-3d text-base px-8 bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/contact?intent=hire">
                    Discuss a role with me
                    <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="btn-3d text-base px-8 border-secondary-foreground/35 bg-secondary-foreground/10 text-secondary-foreground hover:bg-secondary-foreground/18 hover:text-secondary-foreground"
                >
                  <Link href="#proof">
                    <BriefcaseBusiness className="mr-2 w-4 h-4" aria-hidden="true" />
                    Review engineering proof
                  </Link>
                </Button>
              </div>
              <p className="hero-rise hero-rise-delay-4 mt-5 text-sm text-secondary-foreground/75">
                Open to full-time roles · Remote, hybrid, or Greater Victoria
              </p>
              <p className="hero-rise hero-rise-delay-4 mt-2">
                <Link
                  href="/skillstools"
                  className="text-sm font-medium text-secondary-foreground/80 underline underline-offset-4 hover:text-secondary-foreground focus-ring rounded"
                >
                  See skills and technical experience
                </Link>
              </p>
            </div>

            <HeroImage />
          </div>
        </div>
      </section>

      <section aria-labelledby="career-proof-heading" className="border-b border-border/60 bg-background">
        <div className="container mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <div className="max-w-3xl mb-8">
            <h2 id="career-proof-heading" className="text-3xl sm:text-4xl font-semibold mb-3">
              Experience grounded in shipped work
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I have worked across assistive technology, analytics, community platforms, and public-facing websites—turning user needs into maintainable systems with documentation and testing.
            </p>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="rounded-xl border border-border bg-card p-5">
              <dt className="text-sm text-muted-foreground">Professional experience</dt>
              <dd className="mt-1 text-3xl font-display font-semibold">18+ years</dd>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <dt className="text-sm text-muted-foreground">Longest engineering tenure</dt>
              <dd className="mt-1 text-lg font-semibold">CanAssist, University of Victoria</dd>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <dt className="text-sm text-muted-foreground">Work arrangements</dt>
              <dd className="mt-1 text-lg font-semibold">Remote, hybrid, or Greater Victoria</dd>
            </div>
          </dl>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PROFESSIONAL_PROFILE.experience.slice(0, 3).map((job) => (
              <article key={`${job.company}-${job.role}`} className="rounded-xl border border-border/70 bg-card p-5">
                <p className="text-sm text-primary font-medium mb-1">{job.dates}</p>
                <h3 className="text-xl font-semibold">{job.role}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">{job.company}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{job.highlights[1]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ProjectProofExplorer />

      <section aria-label="All portfolio work" className="border-b border-border/60 bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-8 text-center">
          <Link href="/work" className="inline-flex items-center rounded-md px-4 py-3 font-medium text-primary hover:bg-primary/10 focus-ring">
            Browse all projects, case studies, and technical writing
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* About Dan */}
      <section className="container mx-auto max-w-5xl px-4 py-20">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-3">
            About Dan
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A senior engineer who communicates clearly, works across disciplines, and understands accessibility from the inside.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {strengths.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <div className="depth-card h-full p-5 rounded-2xl bg-card/60 border border-border/60">
                <Icon className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why hire */}
      <section className="container mx-auto max-w-4xl px-4 pb-24">
        <div className="rounded-2xl border border-border/80 glass px-6 py-10 sm:px-10 sm:py-12">
          <h2 className="text-3xl font-semibold mb-4">Looking for a senior engineer?</h2>
          <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
            I can join an established team, learn its systems, and contribute across product discovery, implementation, accessibility, testing, and technical documentation. If that matches the role you are hiring for, I would like to hear about it.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {[
              { icon: ShieldCheck, label: 'Secure, maintainable implementation' },
              { icon: Users, label: 'Cross-functional collaboration' },
              { icon: Accessibility, label: 'Accessible interface engineering' },
              { icon: Code2, label: 'Full-stack product delivery' },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <Link href="/contact?intent=hire">
                Discuss a role
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/case-studies">Read case studies</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/about">View background</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/25">
        <div className="container mx-auto max-w-4xl px-4 py-10 text-center">
          <p className="text-sm text-muted-foreground">
            Looking for project-based help instead? <Link href="/custom-software" className="font-medium text-primary underline underline-offset-4">See custom software services</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
