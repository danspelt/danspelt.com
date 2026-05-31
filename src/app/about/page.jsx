import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accessibility, Award, Users, ArrowRight, FileText, Brain } from "lucide-react";
import IntroVideo from "@/components/IntroVideo";

export const metadata = {
  title: "About",
  description:
    "Full-Stack Developer and Accessibility Specialist with 18+ years of experience. I work with AI tools to move fast, collaborate well in teams, and deliver results — even if it takes me a little longer.",
};

const highlights = [
  {
    icon: Award,
    title: "18+ Years of Real Experience",
    text: "I have been building web systems professionally since 2008 — across non-profits, universities, SaaS products, and government-adjacent organizations. That depth shows up in the quality of my work.",
  },
  {
    icon: Brain,
    title: "AI-Assisted Development",
    text: "I use AI tools every day to work faster and smarter. Because I type more slowly than most developers, AI helps me stay competitive — and I've become genuinely skilled at prompting, directing, and verifying AI output.",
  },
  {
    icon: Users,
    title: "Strong Team Collaborator",
    text: "I work well in teams. I communicate clearly, I ask good questions, I keep things unblocked, and I follow through. I have worked in Agile/Scrum environments for years and I know how to contribute without ego.",
  },
  {
    icon: Accessibility,
    title: "Lived Accessibility Expertise",
    text: "I was born with cerebral palsy. I have used assistive technology my whole life. When I build for accessibility, it is not a checkbox — it is something I genuinely understand from the inside.",
  },
];

const About = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          About Dan Spelt
        </h1>
        <p className="text-lg text-muted-foreground">
          Full-Stack Developer &middot; Accessibility Specialist &middot; Remote
        </p>
      </div>

      {/* Video + Intro */}
      <div className="mb-16 space-y-8">
        <div className="max-w-2xl mx-auto">
          <IntroVideo />
        </div>
        <div className="space-y-4 max-w-3xl mx-auto">
          <p className="text-lg leading-relaxed text-muted-foreground">
            I&apos;m Dan Spelt — a full-stack developer with over 18 years of experience building
            web applications. I work across the whole stack: Next.js, React, Node.js, MongoDB,
            Docker, and more. I have shipped real products, worked in real teams, and solved real
            problems.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            I was born with cerebral palsy, which means I type more slowly than most developers.
            I won&apos;t pretend otherwise. But I use AI tools every day — not as a shortcut, but
            as an equalizer. They help me move at a pace that works, and they have made me a better,
            more deliberate engineer in the process.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            I will get the job done. It might take me a bit longer than average. But the work will
            be thorough, the code will be clean, and I will not stop until it is right.
          </p>
          <p className="text-sm text-muted-foreground border-l-2 border-primary/40 pl-4 italic">
            Open to remote roles — full-time, part-time, or contract. Let&apos;s talk.
          </p>
        </div>
      </div>

      {/* Highlight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
        {highlights.map((h) => (
          <Card key={h.title}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                  <h.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{h.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{h.text}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Sections */}
      <div className="space-y-8 max-w-3xl mx-auto">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Accessibility &amp; Compliance</h2>
          <p className="text-muted-foreground leading-relaxed">
            My WCAG implementation work at Neil Squire Society produced measurable outcomes:
            a 20% increase in accessibility compliance, a 30% reduction in bounce rate, and a 15%
            increase in sales attributed to screen reader compatibility improvements. This is not
            theoretical — these are delivered results in a real public-interest organization.
            My compliance work spans WCAG 2.0/2.1, ADA alignment, screen reader engineering,
            and structured accessibility auditing and documentation.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Systems &amp; Architecture</h2>
          <p className="text-muted-foreground leading-relaxed">
            I have designed and shipped several real systems: LipSync Connect (a Next.js
            accessibility platform for device interaction at Neil Squire Society); a full-stack
            data platform at CanAssist (University of Victoria); Community Hive (a multi-tenant
            SaaS for strata and HOA communities, built solo over 22 months); and AccessLens
            (a civic accessibility mapping platform, currently in active development). Each project
            reflects how I actually work — methodically, carefully, and with attention to the things
            that matter long-term.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Availability</h2>
          <p className="text-muted-foreground leading-relaxed">
            I am currently open to remote roles — developer, accessibility specialist, or a
            combination of both. I am not looking to oversell myself. I am looking for a team
            that values quality, reliability, and someone who genuinely cares about the work.
            If that sounds like a fit, let&apos;s talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Link href="/case-studies">
              <Button>
                View Case Studies
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/accessibility">
              <Button variant="outline">
                <FileText className="mr-2 w-4 h-4" />
                Government &amp; Accessibility Work
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost">Work With Me</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
