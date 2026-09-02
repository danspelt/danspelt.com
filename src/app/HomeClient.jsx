import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  Code2,
  Database,
  Globe,
  Layers,
  RefreshCw,
  Search,
  Settings,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroImage from '@/components/HeroImage';
import ProjectProofExplorer from '@/components/home/ProjectProofExplorer';
import CommunityHiveSpotlight from '@/components/home/CommunityHiveSpotlight';

const steps = [
  {
    number: '1',
    title: 'Understand the problem',
    body: 'Identify where time, information or communication is being lost.',
  },
  {
    number: '2',
    title: 'Design the solution',
    body: 'Determine what can realistically be improved with software.',
  },
  {
    number: '3',
    title: 'Build the right system',
    body: 'Develop a focused, maintainable solution around the organization\'s needs.',
  },
  {
    number: '4',
    title: 'Improve over time',
    body: 'Test, learn from users and refine the system as requirements become clearer.',
  },
];

const capabilities = [
  {
    icon: Building2,
    title: 'Custom business software',
    body: 'Focused applications built around your workflow rather than forcing your workflow into an off-the-shelf tool.',
  },
  {
    icon: Globe,
    title: 'Web applications',
    body: 'Modern browser-based systems your team can access from anywhere without installation or manual updates.',
  },
  {
    icon: RefreshCw,
    title: 'Workflow automation',
    body: 'Reduce repetitive manual steps by connecting data, notifications and approvals into coherent processes.',
  },
  {
    icon: Database,
    title: 'Data and reporting systems',
    body: 'Organize scattered information so it is accurate, searchable, and useful for decisions.',
  },
  {
    icon: Sparkles,
    title: 'Accessible interfaces',
    body: 'Usable design from the start, including accessibility for people with diverse abilities and assistive technology.',
  },
  {
    icon: Settings,
    title: 'Software modernization',
    body: 'Update aging systems, replace spreadsheets, and connect disconnected tools without a risky big-bang rewrite.',
  },
];

export default function HomeClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
        <div className="container mx-auto max-w-6xl px-4 py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="hero-rise text-sm font-medium tracking-[0.18em] uppercase text-secondary-foreground/75 mb-4">
                Custom software development · Based in Victoria, BC
              </p>
              <h1 className="hero-rise hero-rise-delay-1 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[0.98] mb-5">
                Custom Software for Real-World Business Problems
              </h1>
              <p className="hero-rise hero-rise-delay-2 text-lg sm:text-xl text-secondary-foreground/90 leading-relaxed mb-4 text-balance">
                I design and build practical software that helps businesses and organizations reduce administrative work, improve efficiency, and manage information more effectively.
              </p>
              <p className="hero-rise hero-rise-delay-3 text-base text-secondary-foreground/70 max-w-xl mb-8 leading-relaxed">
                18+ years of software development experience across web applications, business systems, accessibility tools, and specialized software.
              </p>
              <div className="hero-rise hero-rise-delay-4 flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="btn-3d text-base px-8 bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/contact?intent=project">
                    Discuss Your Project
                    <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="btn-3d text-base px-8 border-secondary-foreground/35 bg-secondary-foreground/10 text-secondary-foreground hover:bg-secondary-foreground/18 hover:text-secondary-foreground"
                >
                  <Link href="#case-study">
                    <Layers className="mr-2 w-4 h-4" aria-hidden="true" />
                    See What I've Built
                  </Link>
                </Button>
              </div>
              <p className="hero-rise hero-rise-delay-4 mt-5 text-sm text-secondary-foreground/75">
                Based in Victoria, BC · Working remotely with businesses and organizations
              </p>
            </div>

            <HeroImage />
          </div>
        </div>
      </section>

      {/* Problem / Opportunity */}
      <section className="border-b border-border/60 bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-5">
              Your business may not need more staff. It may need a better system.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Businesses and organizations often lose time because important processes depend on email, spreadsheets, paper forms, disconnected applications and manual follow-up.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              The result is duplicated work, missed information, slow responses and frustrated staff.
            </p>
            <p className="text-xl text-foreground leading-relaxed mb-6">
              Custom software can change that.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I work with organizations to identify inefficient processes and develop focused software solutions that make those processes simpler, faster and easier to manage. From a single workflow to a complete business platform, I build software around the way your organization actually works.
            </p>
          </div>
        </div>
      </section>

      {/* How I Help */}
      <section className="border-b border-border/60 bg-muted/20">
        <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-3">
              From inefficient workflow to working software
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A practical process that keeps the real problem in focus from first conversation to first release and beyond.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {steps.map(({ number, title, body }) => (
              <li key={number} className="flex gap-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-semibold"
                  aria-hidden="true"
                >
                  {number}
                </span>
                <div>
                  <h3 className="text-xl font-semibold mb-1">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Case Study */}
      <CommunityHiveSpotlight />

      {/* Other Work */}
      <ProjectProofExplorer />

      {/* Capabilities */}
      <section id="capabilities" className="border-b border-border/60 bg-background">
        <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-3">Capabilities</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A short list of what I can help with. The technical stack is chosen to fit the problem, not the other way around.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {capabilities.map(({ icon: Icon, title, body }) => (
              <div key={title} className="depth-card h-full p-5 rounded-2xl bg-card/60 border border-border/60">
                <Icon className="w-6 h-6 text-primary mb-4" aria-hidden="true" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{body}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border/70 bg-muted/30 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Typical stack
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              React, Next.js, TypeScript, Node.js, MongoDB, PostgreSQL, Tailwind CSS, shadcn/ui, Docker, Coolify, .NET, C#, and cloud platforms. If your organization already has preferred tools, I work with those too.
            </p>
            <p className="mt-3">
              <Link
                href="/skillstools"
                className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80 focus-ring rounded"
              >
                See full skills and technical background
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="container mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
              An experienced developer who starts with the problem—not the technology
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-5">
              18+ years developing software for universities, nonprofits, businesses and specialized technology projects.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-5">
              I bring accessibility, usability, maintainability and practical business requirements into the process from the beginning, not as afterthoughts. My background includes assistive technology, analytics platforms, community software, and production web systems.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              If you want to know more about my professional background, case studies, or previous work, those details are available on the site.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild variant="outline">
                <Link href="/about">View background</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/case-studies">Read case studies</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card p-6 sm:p-8 glass">
            <blockquote className="text-lg leading-relaxed text-foreground mb-4">
              “I don't sell programming. I help organizations improve operations, with programming as the means of delivering it.”
            </blockquote>
            <p className="text-sm text-muted-foreground">— Dan Spelt</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="border-t border-border/60 bg-muted/25">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="rounded-2xl border border-border/80 bg-card glass px-6 py-10 sm:px-10 sm:py-12 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="text-3xl sm:text-4xl font-semibold mb-3">
                  Have a process that isn't working as well as it should?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Let's talk about what could be improved. No pitch deck required—just a short conversation about your workflow.
                </p>
              </div>
              <Button asChild size="lg" className="btn-3d shrink-0 bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/contact?intent=project">
                  Discuss Your Project
                  <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
