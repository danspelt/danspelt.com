import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Accessibility,
  ShieldCheck,
  FileText,
  Users,
  BarChart3,
  CheckCircle2,
  Monitor,
  BookOpen,
} from 'lucide-react';

export const metadata = {
  title: 'Accessibility Engineering & Public Sector Experience',
  description:
    'WCAG 2.0/2.1 compliance implementation, ADA alignment, screen reader engineering, and public-sector web development experience. Available for government contracts and senior accessibility roles.',
};

const complianceAreas = [
  {
    icon: Accessibility,
    title: 'WCAG 2.0 / 2.1 Implementation',
    description:
      'Full audit-to-remediation lifecycle: barrier identification, priority triage, systematic remediation, and regression testing. Achieved 20% compliance increase across public-facing platforms at Neil Squire Society.',
  },
  {
    icon: Monitor,
    title: 'Screen Reader Compatibility Engineering',
    description:
      'Hands-on implementation with NVDA, VoiceOver, and JAWS. Covers ARIA role assignment, live region management, focus routing, and keyboard navigation patterns — tested with real assistive technology.',
  },
  {
    icon: ShieldCheck,
    title: 'ADA Alignment',
    description:
      'Web accessibility implementations aligned with ADA Title II and Title III requirements, including documentation of compliance rationale suitable for procurement review.',
  },
  {
    icon: FileText,
    title: 'Documentation & Testing Processes',
    description:
      'Structured accessibility testing plans, VPAT-style documentation, audit reports, and remediation logs that satisfy public-sector procurement and contract compliance requirements.',
  },
  {
    icon: Users,
    title: 'Cross-functional Coordination',
    description:
      'Bridging design, content, and engineering teams on accessibility standards — including training, style guide integration, and establishing team-level compliance practices.',
  },
  {
    icon: BarChart3,
    title: 'Metrics-driven Improvement',
    description:
      'Every engagement tracked against measurable baselines: compliance scores, Lighthouse accessibility audits, user session data, and screen reader user feedback.',
  },
];

const metrics = [
  { value: '20%', label: 'WCAG compliance increase' },
  { value: '30%', label: 'Bounce rate reduction' },
  { value: '15%', label: 'Sales increase from screen reader compatibility' },
  { value: '18+', label: 'Years building accessible systems' },
];

const govReadinessSignals = [
  'WCAG 2.0 / 2.1 compliance implementation experience',
  'ADA Title II/III alignment documentation',
  'Privacy-compliant data handling (FIPPA / PIPEDA aligned)',
  'Role-based access control and audit logging',
  'Cross-functional Agile/Scrum delivery',
  'Documentation and testing process ownership',
  'Screen reader compatibility with NVDA, VoiceOver, JAWS',
  'Long-term maintainability and handoff documentation',
  'Public-sector and non-profit organization experience',
  'Remote-ready with asynchronous collaboration experience',
];

const organizations = [
  {
    name: 'Neil Squire Society',
    type: 'Non-profit · Assistive Technology',
    contribution:
      'Led WCAG implementation initiative across public-facing platforms. Achieved 20% compliance increase, 30% bounce rate reduction, and 15% sales increase via screen reader improvements. Built LipSync Connect — a Next.js accessibility application for device control.',
  },
  {
    name: 'CanAssist — University of Victoria',
    type: 'University Research Unit · Assistive Technology',
    contribution:
      'Delivered a full-stack data management system for applied research teams. Emphasis on privacy compliance (FIPPA), role-based access control, and audit trail integrity for academic and government reporting requirements.',
  },
];

export default function AccessibilityPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4 text-xs tracking-wide">
          Government & Public Sector
        </Badge>
        <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Accessibility Engineering &amp; Public Sector Experience
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          WCAG compliance implementation, screen reader engineering, privacy-aligned systems, and
          structured documentation — delivered in public-interest organizations.
        </p>
        <p className="text-sm text-muted-foreground border border-primary/20 rounded-lg px-4 py-3 inline-block bg-primary/5">
          <span className="font-medium text-foreground">Availability:</span> Open to remote senior roles and government contracts.
        </p>
      </div>

      {/* Metrics */}
      <section className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <div key={m.value} className="text-center p-6 rounded-xl border bg-card">
              <div className="text-4xl font-extrabold text-primary mb-2">{m.value}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance Areas */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">Accessibility Engineering Capabilities</h2>
        <p className="text-muted-foreground mb-8">
          What government and senior hiring panels look for — and what I&apos;ve delivered.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {complianceAreas.map((area) => {
            const Icon = area.icon;
            return (
              <Card key={area.title}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 text-sm">{area.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{area.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Organizations */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-2">Public-Sector & Mission-Driven Experience</h2>
        <p className="text-muted-foreground mb-8">
          Organizations where compliance, privacy, and inclusive design were operational requirements — not aspirations.
        </p>
        <div className="space-y-4">
          {organizations.map((org) => (
            <Card key={org.name}>
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <CardTitle className="text-lg">{org.name}</CardTitle>
                  <Badge variant="outline" className="text-xs w-fit">{org.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{org.contribution}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Government Readiness Checklist */}
      <section className="mb-16">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Government Contract Readiness
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Common evaluation criteria for public-sector web contracts — and where I align.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {govReadinessSignals.map((signal) => (
                <div key={signal} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {signal}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Positioned Closing Statement */}
      <section className="rounded-2xl border bg-card p-8 sm:p-12 text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">The Rare Intersection</h2>
        <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
          Most senior engineers don&apos;t deeply understand accessibility. Most accessibility engineers
          don&apos;t deeply understand full-stack systems architecture. I sit at that intersection —
          born from 18+ years of engineering practice and lived experience with assistive technology.
          That&apos;s especially valuable in government, education, healthcare, and enterprise SaaS.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/case-studies">
            <Button size="lg">
              View Case Studies
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg">
              Work With Me
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
