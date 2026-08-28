import Link from 'next/link';
import { ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, Presentation } from 'lucide-react';
import { ALL_WORK, WORK_COUNTS } from '@/data/all-work';
import { APP_STATUS } from '@/data/projects';
import { PROJECT_STATUS } from '@/data/project-proof';

export const metadata = {
  title: 'All Work',
  description:
    'Browse Dan Spelt’s live applications, project case studies, technical writing, and professional engineering experience in one directory.',
  alternates: { canonical: 'https://danspelt.com/work' },
  openGraph: {
    title: 'All Work | Dan Spelt',
    description: 'Live applications, engineering case studies, technical guides, and professional experience in one directory.',
    url: 'https://danspelt.com/work',
  },
  twitter: {
    title: 'All Work | Dan Spelt',
    description: 'Live applications, engineering case studies, technical guides, and professional experience in one directory.',
  },
};

function SectionHeader({ id, eyebrow, title, description, count }) {
  return (
    <header className="max-w-3xl mb-7">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-2">{eyebrow}</p>
      <div className="flex flex-wrap items-baseline gap-3">
        <h2 id={id} className="text-3xl sm:text-4xl font-semibold">{title}</h2>
        <span className="text-sm text-muted-foreground">{count} {count === 1 ? 'entry' : 'entries'}</span>
      </div>
      <p className="mt-3 text-muted-foreground leading-relaxed">{description}</p>
    </header>
  );
}

function ExternalLabel() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}

export default function WorkDirectoryPage() {
  const sectionLinks = [
    ['#apps', `Apps & tools (${WORK_COUNTS.apps})`],
    ['#case-studies', `Case studies (${WORK_COUNTS.caseStudies})`],
    ['#writing', `Writing (${WORK_COUNTS.writing})`],
    ['#experience', `Experience (${WORK_COUNTS.professional})`],
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-14 sm:py-20">
      <header className="max-w-4xl mb-12 sm:mb-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">Portfolio directory</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-5">All work</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Live products, evidence-led case studies, technical guides, and the professional experience behind them—all in one place.
        </p>
        <nav aria-label="All work sections" className="mt-8 flex flex-wrap gap-2">
          {sectionLinks.map(([href, label]) => (
            <a key={href} href={href} className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary focus-ring">
              {label}
            </a>
          ))}
        </nav>
      </header>

      <section id="apps" aria-labelledby="apps-heading" className="scroll-mt-24 border-t border-border/70 py-12 sm:py-16">
        <SectionHeader id="apps-heading" eyebrow="Products" title="Apps and tools" count={WORK_COUNTS.apps} description="Public applications and current builds already listed in the portfolio. Live products open on their own domains." />
        <p className="-mt-3 mb-7">
          <Link href="/projects" className="inline-flex items-center text-sm font-medium text-primary hover:underline underline-offset-4">
            Open the detailed projects page <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
          </Link>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {ALL_WORK.apps.map((item) => (
            <article key={item.title} className="flex h-full flex-col rounded-xl border border-border/70 bg-card p-5">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">{APP_STATUS[item.status].label}</span>
                {item.tags.map((tag) => <span key={tag} className="text-muted-foreground">{tag}</span>)}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium">
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline underline-offset-4">
                    Visit product <ArrowUpRight className="ml-1.5 h-4 w-4" aria-hidden="true" /><ExternalLabel />
                  </a>
                ) : (
                  <Link href={item.href} className="inline-flex items-center text-primary hover:underline underline-offset-4">
                    View project status <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
                {item.caseStudyUrl && <Link href={item.caseStudyUrl} className="hover:underline underline-offset-4">Case study</Link>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="case-studies" aria-labelledby="case-studies-heading" className="scroll-mt-24 border-t border-border/70 py-12 sm:py-16">
        <SectionHeader id="case-studies-heading" eyebrow="Evidence" title="Case studies" count={WORK_COUNTS.caseStudies} description="Detailed accounts of the problem, engineering approach, technical decisions, testing, evidence, and known constraints." />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {ALL_WORK.caseStudies.map((item) => (
            <article key={item.title} className="rounded-xl border border-border/70 bg-card p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <span className="rounded-full bg-primary/10 px-2.5 py-1 font-medium text-primary">{PROJECT_STATUS[item.status].label}</span>
                <span>{item.role}</span>
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <Link href={item.href} className="mt-5 inline-flex items-center text-sm font-medium text-primary hover:underline underline-offset-4">
                Read case study <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="writing" aria-labelledby="writing-heading" className="scroll-mt-24 border-t border-border/70 py-12 sm:py-16">
        <SectionHeader id="writing-heading" eyebrow="Documentation" title="Technical writing and guides" count={WORK_COUNTS.writing} description="Public planning and implementation documents from the portfolio repository. These are working technical guides, not marketing articles." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ALL_WORK.writing.map((item) => (
            <article key={item.title} className="rounded-xl border border-border/70 bg-card p-5">
              <BookOpen className="h-5 w-5 text-primary mb-3" aria-hidden="true" />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline underline-offset-4">
                Read on GitHub <ArrowUpRight className="ml-1.5 h-4 w-4" aria-hidden="true" /><ExternalLabel />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-24 border-t border-border/70 py-12 sm:py-16">
        <SectionHeader id="experience-heading" eyebrow="Background" title="Professional experience" count={WORK_COUNTS.professional} description="Supporting context for hiring managers who want to understand technical breadth, accessibility work, and career history." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ALL_WORK.professional.map((item) => (
            <Link key={item.title} href={item.href} className="group rounded-xl border border-border/70 bg-card p-5 hover:border-primary/60 focus-ring">
              <h3 className="text-lg font-semibold group-hover:text-primary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">Open page <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </section>

      <aside aria-labelledby="talks-heading" className="rounded-2xl border border-border/70 bg-muted/30 p-6 sm:p-8">
        <Presentation className="h-6 w-6 text-primary mb-3" aria-hidden="true" />
        <h2 id="talks-heading" className="text-2xl font-semibold">Talks and presentations</h2>
        <p className="mt-2 text-muted-foreground leading-relaxed">No public talks or presentation recordings are currently listed in this portfolio.</p>
      </aside>

      <footer className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl bg-secondary px-6 py-8 text-secondary-foreground">
        <div>
          <BriefcaseBusiness className="h-6 w-6 mb-3 text-accent" aria-hidden="true" />
          <h2 className="text-2xl font-semibold">See a fit for your team?</h2>
          <p className="mt-2 text-secondary-foreground/75">I am open to senior full-stack engineering roles.</p>
        </div>
        <Link href="/contact?intent=hire" className="inline-flex shrink-0 items-center justify-center rounded-md bg-accent px-5 py-3 font-medium text-accent-foreground hover:bg-accent/90 focus-ring">
          Discuss a role <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      </footer>
    </div>
  );
}
