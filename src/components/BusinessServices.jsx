import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  ChevronDown,
  Cog,
  FileSearch,
  LifeBuoy,
  MessageSquare,
  RefreshCw,
  ShieldCheck,
  Wrench,
} from 'lucide-react';

const websiteOffer = [
  {
    icon: Wrench,
    title: 'Build the right foundation',
    summary: 'A new website shaped around the people who need to use it and the action they need to take.',
    points: ['Responsive implementation', 'Clear content structure and navigation', 'Accessible interaction patterns'],
  },
  {
    icon: RefreshCw,
    title: 'Refresh what already exists',
    summary: 'Improve an existing site without replacing useful content or working systems unnecessarily.',
    points: ['Accessibility-minded UX review', 'Focused interface and content improvements', 'Performance and maintainability cleanup'],
  },
  {
    icon: LifeBuoy,
    title: 'Keep it useful',
    summary: 'Ongoing maintenance and support for teams that need a reliable technical partner after launch.',
    points: ['Content and feature updates', 'Issue investigation and practical fixes', 'Documentation for future changes'],
  },
];

const services = [
  {
    icon: Cog,
    title: 'Custom Software',
    body: 'Tailor-made tools that adapt to how your team actually works — not the other way around.',
  },
  {
    icon: MessageSquare,
    title: 'Communication Platforms',
    body: 'Centralize announcements, requests, and updates so nothing gets lost between email, chat, and paper.',
  },
  {
    icon: Bot,
    title: 'AI-Assisted Workflows',
    body: 'Add practical AI where it saves time: triage, summarization, tone help, and smart suggestions.',
  },
  {
    icon: FileSearch,
    title: 'Process Audits',
    body: 'Map how work actually happens, find the friction, and design the smallest useful fix.',
  },
  {
    icon: ShieldCheck,
    title: 'Accessibility & Compliance',
    body: 'WCAG-aligned design and development so your platform works for more people and fewer legal risks.',
  },
  {
    icon: BarChart3,
    title: 'Data & Reporting',
    body: 'Turn scattered information into dashboards and reports that support better decisions.',
  },
];

export default function BusinessServices() {
  return (
    <section className="container mx-auto max-w-5xl px-4 py-20 border-t border-border/60">
      <div className="interactive-card mb-14 overflow-hidden rounded-3xl border border-primary/30 bg-card shadow-sm">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Accessible Web Launch
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
              A clearer website that works for more people
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Build a new website or improve the one you have with accessibility-minded UX,
              maintainable implementation, and support that can continue after launch.
            </p>
            <Button asChild size="lg" className="btn-3d bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/contact">
                Discuss your website
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <p className="mt-3 text-xs text-muted-foreground">
              Start with your current site, goals, and biggest usability concern.
            </p>
          </div>

          <div className="space-y-3">
            {websiteOffer.map(({ icon: Icon, title, summary, points }, index) => (
              <details
                key={title}
                open={index === 0}
                className="evidence-disclosure group rounded-xl border border-border/70 bg-background/70"
              >
                <summary className="focus-ring flex cursor-pointer list-none items-start gap-3 rounded-xl p-4 hover:bg-muted/60">
                  <span className="rounded-lg bg-primary/10 p-2 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{title}</span>
                    <span className="mt-1 block text-sm font-normal text-muted-foreground leading-relaxed">
                      {summary}
                    </span>
                  </span>
                  <ChevronDown className="mt-2 h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <ul className="space-y-2 border-t border-border/70 px-4 py-4 sm:pl-16">
                  {points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-10 max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-semibold">Business Services</h2>
        <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
          Practical software and AI solutions for communication, operations, and administration challenges.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {services.map(({ icon: Icon, title, body }) => (
          <div
            key={title}
            className="interactive-card flex items-start gap-4 p-5 rounded-2xl border border-border/60 bg-card/50 glow-ring"
          >
            <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
              <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild size="lg" className="text-base px-8 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/custom-software">
            Explore custom software
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="text-base px-8">
          <Link href="/contact">Discuss your business idea</Link>
        </Button>
      </div>
    </section>
  );
}
