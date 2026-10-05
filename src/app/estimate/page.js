import ProjectEstimator from '@/components/estimate/ProjectEstimator';
import { Card, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'Project Cost Estimator | Custom Software Pricing | Dan Spelt',
  description:
    'Answer five quick questions for a ballpark effort and cost range for custom software. A planning estimate, not a quote — a fixed price follows a short scoping call.',
  alternates: {
    canonical: 'https://danspelt.com/estimate',
  },
  openGraph: {
    title: 'Project Cost Estimator | Custom Software Pricing | Dan Spelt',
    description:
      'Get a ballpark cost and effort range for your custom software idea in five quick questions.',
    url: 'https://danspelt.com/estimate',
    type: 'website',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Cost Estimator | Custom Software Pricing | Dan Spelt',
    description:
      'Get a ballpark cost and effort range for your custom software idea in five quick questions.',
  },
};

export default function EstimatePage() {
  return (
    <article className="bg-background">
      <section className="border-b border-border/60">
        <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
          <div className="max-w-2xl mb-8">
            <h1 className="text-3xl sm:text-4xl font-semibold mb-3">Project Cost Estimator</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Answer five quick questions for a ballpark effort and cost range for your project.
              Everything is calculated in your browser — nothing is sent unless you choose to send
              it.
            </p>
          </div>
          <ProjectEstimator />
        </div>
      </section>

      <section aria-labelledby="how-estimate-works" className="bg-muted/20">
        <div className="container mx-auto max-w-3xl px-4 py-16 sm:py-20">
          <h2 id="how-estimate-works" className="text-2xl sm:text-3xl font-semibold mb-6">
            How the estimate works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">A plain hourly rate</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The estimate uses $85/hour CAD and about 25 build hours per week. The scale and
                  timeline multipliers are listed with every result, so nothing is hidden.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Always a range</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Real projects have unknowns, so the result is shown as a low-to-high range with the
                  assumptions listed next to it.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">A fixed price follows</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If the range looks reasonable, a short scoping conversation turns it into a written
                  fixed price before any work begins.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </article>
  );
}
