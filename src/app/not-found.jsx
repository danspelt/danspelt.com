import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Page Not Found',
  description: 'The page you were looking for does not exist on danspelt.com.',
};

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-20 sm:py-28 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <Compass className="h-8 w-8 text-primary" aria-hidden="true" />
      </div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary mb-3">
        404 — Page not found
      </p>
      <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-5">
        This page moved or never existed
      </h1>
      <p className="mx-auto max-w-xl text-lg text-muted-foreground leading-relaxed mb-10">
        The link may be outdated or the address may have a typo. The portfolio, case studies,
        and contact page are all still here.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button asChild size="lg" className="btn-3d bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/">
            Back to home
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/work">
            Browse all work
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
      <p className="mt-10 text-sm text-muted-foreground">
        Looking to discuss a project?{' '}
        <Link href="/contact" className="font-medium text-primary hover:underline underline-offset-4 focus-ring rounded">
          Contact Dan
        </Link>
      </p>
    </div>
  );
}
