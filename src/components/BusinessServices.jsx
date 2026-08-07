import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Cog, MessageSquare, FileSearch, Bot, ShieldCheck, BarChart3 } from 'lucide-react';

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
            tabIndex={0}
            className="depth-card flex items-start gap-4 p-5 rounded-2xl border border-border/60 bg-card/50 glow-ring focus-ring"
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
