import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Layers,
  Monitor,
  ShieldCheck,
  Users,
} from 'lucide-react';

export const metadata = {
  title: 'Case Studies',
  description:
    'Accessibility engineering and full-stack system case studies from Neil Squire Society, CanAssist, and LipSync Connect — showcasing WCAG compliance, secure architecture, and measurable outcomes.',
};

const caseStudies = [
  {
    id: 'lipsync-connect',
    label: 'Accessibility Application',
    status: 'Shipped',
    title: 'LipSync Connect',
    subtitle: 'Next.js Device Accessibility Platform — Neil Squire Society',
    summary:
      'A web application enabling users with physical disabilities to control devices via lip and facial movements. Built accessibility-first from the ground up for a non-profit serving Canadians with motor impairments.',
    problem:
      'Neil Squire users required a device-control interface that worked reliably across assistive hardware setups, screen readers, and low-bandwidth environments — with zero tolerance for accessibility regressions.',
    stack: ['Next.js', 'React', 'TypeScript', 'WCAG 2.1 AA', 'Screen Reader APIs', 'Web Bluetooth'],
    accessibilityChallenges: [
      'Ensuring full keyboard navigability across all interaction states',
      'Building screen reader-compatible real-time feedback for device status',
      'Maintaining WCAG 2.1 AA compliance across dynamic UI components',
      'Designing for low-vision, motor-impaired, and switch-access users simultaneously',
    ],
    outcomes: [
      { metric: '30%', description: 'Reduction in bounce rate after accessibility overhaul' },
      { metric: '15%', description: 'Increase in sales attributed to screen reader compatibility' },
      { metric: 'WCAG 2.1 AA', description: 'Compliance standard achieved across all core flows' },
    ],
    architectureNotes:
      'Component architecture designed for progressive enhancement — core functionality works without JavaScript, enhanced interactions layer on top. All ARIA roles and live regions implemented per WAI-ARIA authoring practices.',
    icon: Monitor,
  },
  {
    id: 'wcag-initiative',
    label: 'Compliance Initiative',
    status: 'Delivered',
    title: 'WCAG Implementation Initiative',
    subtitle: 'Accessibility Compliance Programme — Neil Squire Society',
    summary:
      'A systematic accessibility audit and remediation initiative across Neil Squire\'s public-facing web platforms, resulting in measurable compliance gains and improved outcomes for users of assistive technologies.',
    problem:
      'Existing platforms had accumulated accessibility debt across colour contrast, keyboard traps, missing ARIA labels, and non-semantic HTML — creating barriers for the very population Neil Squire serves.',
    stack: ['WCAG 2.0 / 2.1', 'NVDA', 'VoiceOver', 'axe DevTools', 'Lighthouse', 'HTML / ARIA'],
    accessibilityChallenges: [
      'Auditing and categorizing hundreds of accessibility violations across multiple codebases',
      'Prioritizing remediation by user impact vs. implementation cost',
      'Training development team on WCAG authoring practices and testing workflows',
      'Establishing ongoing compliance monitoring and regression prevention',
    ],
    outcomes: [
      { metric: '20%', description: 'Increase in WCAG compliance score across platforms' },
      { metric: '30%', description: 'Reduction in bounce rate from accessibility improvements' },
      { metric: '15%', description: 'Sales increase from screen reader compatibility gains' },
    ],
    architectureNotes:
      'Remediation was delivered in priority tiers: critical barriers first (keyboard traps, missing labels), then structural improvements (landmark regions, heading hierarchy), then enhanced interactions (live regions, focus management). Each tier was tested with real assistive technology before sign-off.',
    icon: ShieldCheck,
  },
  {
    id: 'canassist-system',
    label: 'Full-Stack System',
    status: 'Delivered',
    title: 'Full-Stack Data System',
    subtitle: 'Secure Research Platform — CanAssist, University of Victoria',
    summary:
      'A full-stack web system for CanAssist\'s applied research and assistive technology teams, supporting cross-functional workflows, structured data management, and privacy-compliant document handling in a university environment.',
    problem:
      'CanAssist\'s research teams relied on fragmented tools — spreadsheets, shared drives, and email — creating data integrity issues, access control gaps, and audit trail deficiencies incompatible with academic and government reporting standards.',
    stack: ['React', 'Node.js', 'MongoDB', 'RBAC', 'REST API', 'Agile / Scrum'],
    accessibilityChallenges: [
      'Designing role-based access control that mapped cleanly to CanAssist\'s org hierarchy',
      'Ensuring all data handling aligned with FIPPA privacy standards',
      'Building audit logging for cross-team document access and modification',
      'Structuring APIs for long-term maintainability across rotating academic staff',
    ],
    outcomes: [
      { metric: 'FIPPA', description: 'Privacy compliance alignment for all data handling' },
      { metric: 'Agile', description: 'Delivered iteratively across Scrum sprints with research stakeholders' },
      { metric: 'Multi-role', description: 'RBAC supporting researcher, coordinator, and admin permission tiers' },
    ],
    architectureNotes:
      'System architecture prioritized data integrity and auditability over feature velocity. Every write operation is logged with actor, timestamp, and change delta. Role boundaries are enforced at both the API middleware layer and the database query layer — no client-side permission checks trusted alone.',
    icon: Layers,
  },
];

function OutcomeCard({ metric, description }) {
  return (
    <div className="text-center p-4 rounded-xl border bg-card">
      <div className="text-3xl font-extrabold text-primary mb-1">{metric}</div>
      <div className="text-xs text-muted-foreground leading-relaxed">{description}</div>
    </div>
  );
}

export default function CaseStudiesPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-3 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Case Studies
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Accessibility engineering and full-stack systems delivered in public-sector and mission-driven environments. Each study follows the same structure: problem, stack, challenges, measurable outcomes, and architectural reasoning.
        </p>
      </div>

      {/* Case Studies */}
      <div className="space-y-16">
        {caseStudies.map((study, idx) => {
          const Icon = study.icon;
          return (
            <div key={study.id} className="space-y-6">
              {/* Case Study Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">{study.label}</Badge>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/10 text-xs">
                      {study.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">Case Study {String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-1">{study.title}</h2>
                  <p className="text-muted-foreground">{study.subtitle}</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10 w-fit shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>

              {/* Summary */}
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground leading-relaxed">{study.summary}</p>
                </CardContent>
              </Card>

              {/* Problem */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">The Problem</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{study.problem}</p>
                </CardContent>
              </Card>

              {/* Stack */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Technical Stack</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {study.stack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Challenges */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Key Challenges</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {study.accessibilityChallenges.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Outcomes */}
              <div>
                <h3 className="text-base font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  Measurable Outcomes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {study.outcomes.map((o) => (
                    <OutcomeCard key={o.metric} {...o} />
                  ))}
                </div>
              </div>

              {/* Architecture Notes */}
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" />
                    Architectural Reasoning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{study.architectureNotes}</p>
                </CardContent>
              </Card>

              {idx < caseStudies.length - 1 && (
                <hr className="border-border" />
              )}
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-20 text-center space-y-4">
        <h2 className="text-2xl font-bold">Ready to work together?</h2>
        <p className="text-muted-foreground">
          Open to remote senior roles and government contracts. Let&apos;s talk about what you&apos;re building.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact">
            <Button size="lg">
              Get in Touch
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/accessibility">
            <Button variant="outline" size="lg">
              <Users className="mr-2 w-4 h-4" />
              Government & Accessibility Work
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
