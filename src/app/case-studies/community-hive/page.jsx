import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Megaphone,
  Wrench,
  MessageSquare,
  FileText,
  Calendar,
  ClipboardList,
  Briefcase,
  TrendingUp,
  Users,
} from 'lucide-react';
import { CheckCircle2, ExternalLink } from 'lucide-react';
import { COMMUNITY_HIVE_SCREENSHOTS } from '@/data/project-proof';
import CommunityHiveSlideshow from '@/components/community-hive/CommunityHiveSlideshow';

export const metadata = {
  title: 'Community Hive Case Study | Custom Business Software by Dan Spelt',
  description:
    'See how Dan Spelt designed and developed Community Hive, a custom platform for communication, maintenance tracking, community engagement, and property management.',
  keywords: [
    'custom business software',
    'property management software',
    'community management platform',
    'maintenance request software',
    'business process automation',
    'custom AI solutions',
    'full-stack developer Canada',
    'Next.js developer',
    'custom software Victoria BC',
  ],
  alternates: {
    canonical: 'https://danspelt.com/case-studies/community-hive',
  },
  openGraph: {
    title: 'Community Hive Case Study | Custom Business Software by Dan Spelt',
    description:
      'See how Dan Spelt designed and developed Community Hive, a custom platform for communication, maintenance tracking, community engagement, and property management.',
    url: 'https://danspelt.com/case-studies/community-hive',
    siteName: 'Dan Spelt',
    images: [
      {
        url: 'https://danspelt.com/images/community-hive/community-hive-og.png',
        width: 1200,
        height: 630,
        alt: 'Community Hive community management platform preview',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Community Hive Case Study | Custom Business Software by Dan Spelt',
    description:
      'See how Dan Spelt designed and developed Community Hive, a custom platform for communication, maintenance tracking, community engagement, and property management.',
    images: ['https://danspelt.com/images/community-hive/community-hive-og.png'],
  },
};

const problems = [
  'Important announcements being missed',
  'Maintenance concerns arriving through different channels',
  'Staff repeatedly answering the same questions',
  'Poor documentation of resident and management communication',
  'Low participation in community activities',
  'Difficulty tracking requests and follow-up work',
  'Limited opportunities for local business partnerships',
];

const features = [
  {
    icon: Megaphone,
    title: 'Centralized Announcements',
    description:
      'Management can publish important information in one place instead of relying on scattered emails, paper notices, or social media.',
  },
  {
    icon: Wrench,
    title: 'Maintenance Requests',
    description:
      'Residents can submit concerns, attach information, and follow the progress of each request.',
  },
  {
    icon: MessageSquare,
    title: 'Community Communication',
    description:
      'Residents and administrators can receive updates and access relevant information from one platform.',
  },
  {
    icon: FileText,
    title: 'Document Management',
    description:
      'Important forms, policies, meeting information, and community documents can be organized and shared.',
  },
  {
    icon: Calendar,
    title: 'Events and Activities',
    description:
      'Communities can promote events, track participation, and encourage stronger engagement.',
  },
  {
    icon: ClipboardList,
    title: 'Surveys and Feedback',
    description:
      'Administrators can gather feedback, conduct votes, and better understand community needs.',
  },
  {
    icon: Briefcase,
    title: 'Business Partnerships',
    description:
      'Local businesses can be promoted through relevant community partnerships and advertising opportunities.',
  },
];

const businessValue = [
  {
    icon: Users,
    title: 'Save Staff Time',
    description: 'Bring communication, maintenance requests, documents, and community information into one system.',
  },
  {
    icon: Wrench,
    title: 'Reduce Expensive Problems',
    description: 'Allow residents to report maintenance concerns early, before they become larger repairs.',
  },
  {
    icon: FileText,
    title: 'Improve Accountability',
    description: 'Create a documented record of notices, requests, updates, and decisions.',
  },
  {
    icon: MessageSquare,
    title: 'Improve Customer Experience',
    description: 'Make it easier for residents and tenants to find information and receive updates.',
  },
  {
    icon: TrendingUp,
    title: 'Create New Revenue',
    description: 'Support partnerships with nearby businesses and relevant community services.',
  },
];

const process = [
  'Identify the operational problem',
  'Speak with potential users',
  'Define the smallest useful solution',
  'Design the user experience',
  'Build the core application',
  'Test the workflow',
  'Collect feedback',
  'Improve the product',
];

const technologies = [
  'Next.js',
  'React',
  'JavaScript',
  'Tailwind CSS',
  'shadcn/ui',
  'Node.js API routes',
  'MongoDB',
  'Role-based access control',
  'JWT authentication',
  'Responsive dashboards',
  'AI-assisted workflows',
  'Git and GitHub',
  'Coolify and Docker',
];

const adjacentMarkets = [
  'Retirement communities',
  'Non-profit housing',
  'Housing cooperatives',
  'Mixed-use developments',
  'Commercial properties',
  'Sports organizations',
  'Churches and community groups',
];

export default function CommunityHiveCaseStudy() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-10 sm:py-16">
      <div className="mb-10 max-w-3xl">
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10">
            Pilot
          </Badge>
          <Badge variant="outline">SaaS</Badge>
          <Badge variant="outline">Multi-Tenant</Badge>
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold mb-4">Community Hive</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A communication and management platform designed to help property managers, residential communities, and
          community organizations reduce administrative work, improve communication, and respond to problems earlier.
        </p>
      </div>

      <CommunityHiveSlideshow
        screenshots={COMMUNITY_HIVE_SCREENSHOTS}
        className="mb-16"
      />

      <section className="mb-16 max-w-3xl">
        <h2 className="text-3xl font-semibold mb-4">Project Summary</h2>
        <p className="text-muted-foreground leading-relaxed">
          Community Hive is a full-stack SaaS platform that centralizes communication, maintenance requests, documents,
          events, and management workflows for property managers, strata councils, HOA boards, and residents. It
          replaces fragmented tools — email chains, paper notices, social media groups — with a secure, structured, and
          scalable communication architecture.
        </p>
      </section>

      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold mb-4">The Challenge</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Property managers and community leaders often rely on disconnected tools: email, paper notices, informal
              messages, spreadsheets, and separate booking or maintenance systems. Information gets lost, residents
              miss updates, and staff spend too much time repeating answers.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The result is delayed maintenance responses, low event participation, unclear accountability, and a poor
              experience for both residents and staff.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">The Solution</h2>
            <p className="text-muted-foreground leading-relaxed">
              Community Hive centralizes communication, requests, information, documents, activities, and management
              workflows in one place. Each building or community gets scoped access, role-based dashboards, and a clear
              record of every announcement, request, and decision.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">Who It Is For</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The first target market is property management and residential communities — condos, strata corporations,
          HOAs, and managed buildings.
        </p>
        <p className="text-sm text-muted-foreground mb-2">Adjacent markets with similar challenges include:</p>
        <ul className="flex flex-wrap gap-2">
          {adjacentMarkets.map((market) => (
            <li key={market} className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
              {market}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Problems Community Hive Helps Solve</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {problems.map((problem) => (
            <div key={problem} className="flex items-start gap-3 text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              {problem}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Main Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Designed to Create Measurable Business Value</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessValue.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg">{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-6">
          Exact performance data is being collected with early users. No statistics or financial claims are invented.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">What I Built</h2>
        <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
          I designed and developed Community Hive as a full-stack software platform. The work included product planning,
          user experience design, frontend development, backend development, database architecture, authentication,
          dashboards, communication features, deployment, and ongoing product strategy.
        </p>
        <ul className="flex flex-wrap gap-2 mb-8">
          {technologies.map((tech) => (
            <li key={tech} className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
              {tech}
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Development Process</h2>
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {process.map((step, i) => (
            <li key={step} className="flex items-start gap-3 text-muted-foreground">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold shrink-0 mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-16 max-w-3xl">
        <h2 className="text-3xl font-semibold mb-4">Future Opportunities</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            Deeper AI-assisted communication tools for tone, summarization, and automated digests.
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            Expanded analytics and engagement scoring for community managers.
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            White-label capabilities for property management firms and consultancies.
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            Mobile app for on-the-go resident and staff access.
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-border/80 bg-card/70 px-6 py-10 sm:px-10 sm:py-12 mb-16">
        <h2 className="text-3xl font-semibold mb-4">Have a Similar Business Challenge?</h2>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
          Your business may not need Community Hive exactly, but it may have similar communication, administration,
          tracking, or workflow problems. I can help you identify the opportunity and build a solution around how your
          business actually works.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg" className="text-base px-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/contact">
              Discuss Your Idea
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-base px-8">
            <Link href="/custom-software">Request a Software Consultation</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="text-base px-8">
            <a href="http://communityhive.ca" target="_blank" rel="noopener noreferrer">
              Visit Live Site
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
