import React from 'react';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { APP_STATUS, getLiveApps, getUpcomingApps } from '@/data/projects';

const statusStyles = {
  live: 'bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/10',
  pilot: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10',
  building: 'bg-muted text-muted-foreground border-border hover:bg-muted',
};

function AppCard({ app }) {
  const status = APP_STATUS[app.status];

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-3">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge className={statusStyles[app.status]}>{status.label}</Badge>
          {app.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-xl">{app.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-4">
        <p className="text-sm leading-relaxed text-muted-foreground">{app.description}</p>
        {(app.url || app.githubUrl || app.caseStudyUrl) && (
          <div className="flex flex-wrap gap-2">
            {app.url && (
              <Button asChild size="sm" className="flex items-center gap-2">
                {/* External app, so a plain anchor rather than next/link. */}
                <a href={app.url} target="_blank" rel="noopener noreferrer">
                  {app.cta || 'Visit live site'}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Button>
            )}
            {app.githubUrl && (
              <Button asChild size="sm" variant="outline">
                <a href={app.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                  View source
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Button>
            )}
            {app.caseStudyUrl && (
              <Button asChild size="sm" variant="outline">
                <Link href={app.caseStudyUrl}>Read the case study</Link>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function LiveApps() {
  const live = getLiveApps();
  const upcoming = getUpcomingApps();

  return (
    <section aria-labelledby="live-apps-heading" className="mb-20">
      <h2 id="live-apps-heading" className="mb-2 text-2xl font-semibold">
        Live apps &amp; tools
      </h2>
      <p className="mb-6 max-w-2xl text-muted-foreground">
        Everything below is deployed and publicly reachable. Each one started as a real problem
        worth solving.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {live.map((app) => (
          <AppCard key={app.slug} app={app} />
        ))}
      </div>

      {upcoming.length > 0 && (
        <>
          <h3 className="mb-4 mt-10 text-xl font-semibold">In development</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {upcoming.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
