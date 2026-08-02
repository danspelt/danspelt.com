import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare } from 'lucide-react';

const problemsSolved = [
  'Important announcements being missed',
  'Maintenance concerns arriving through different channels',
  'Staff repeatedly answering the same questions',
  'Poor documentation of resident and management communication',
  'Low participation in community activities',
  'Difficulty tracking requests and follow-up work',
  'Limited opportunities for local business partnerships',
];

export default function CommunityHiveFeatured() {
  return (
    <section id="community-hive" className="container mx-auto max-w-5xl px-4 py-20 border-t border-border/60">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold tracking-wide uppercase mb-2 text-emerald-700 dark:text-emerald-300">
          Featured Project
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold">Community Hive</h2>
        <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
          A communication and management platform designed to help property managers, residential communities, and
          community organizations reduce administrative work, improve communication, and respond to problems earlier.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-14">
        <div className="rounded-2xl overflow-hidden ring-1 ring-border/60 bg-card/40">
          <Image
            src="/images/community-hive/community-hive-og.png"
            alt="Community Hive property management dashboard showing announcements, maintenance requests and community activity"
            width={1200}
            height={630}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4">What it solves</h3>
          <ul className="space-y-3 mb-8">
            {problemsSolved.map((problem) => (
              <li key={problem} className="flex items-start gap-3 text-muted-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0" />
                {problem}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="text-base px-6 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/case-studies/community-hive">
                View full project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base px-6">
              <Link href="/contact">
                <MessageSquare className="mr-2 w-4 h-4" />
                Discuss a similar solution
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/80 bg-card/60 px-6 py-8 sm:px-10 sm:py-10">
        <h3 className="text-2xl font-semibold mb-4">What I built</h3>
        <p className="text-muted-foreground leading-relaxed mb-6">
          I designed and developed Community Hive as a full-stack software platform. The work included product planning,
          user experience design, frontend development, backend development, database architecture, authentication,
          dashboards, communication features, deployment, and ongoing product strategy.
        </p>
        <ul className="flex flex-wrap gap-2">
          {[
            'Next.js',
            'React',
            'JavaScript',
            'Tailwind CSS',
            'Firebase',
            'Authentication',
            'Database design',
            'Responsive dashboards',
            'AI-assisted workflows',
            'Cloud deployment',
            'Git and GitHub',
            'Coolify and Docker',
          ].map((tech) => (
            <li key={tech} className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
