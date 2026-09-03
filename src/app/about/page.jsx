import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accessibility, Award, Users, ArrowRight, FileText, Brain } from "lucide-react";
import IntroVideo from "@/components/IntroVideo";

export const metadata = {
  title: "About",
  description:
    "Dan Spelt — Full-Stack Developer and Accessibility Specialist based in Victoria, BC, Canada. 18+ years of experience working remotely with teams worldwide.",
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
    text: "I use AI tools deliberately as a professional development capability — for research, coding, testing, documentation, architecture, security review, and quality oversight. This means faster exploration, thorough review, and well-built software.",
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
          Full-Stack Developer &middot; Accessibility Specialist &middot; Victoria, BC, Canada
        </p>
        <p className="text-sm text-muted-foreground/80 mt-1">
          Open to remote roles worldwide
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
            I use modern AI tools deliberately as part of my development practice — for research,
            coding, testing, documentation, architecture, security review, and quality oversight.
            That combination helps me explore ideas quickly while keeping the work thorough and clean.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            I was born with cerebral palsy and have used assistive technology my whole life, so
            accessibility is something I understand from experience, not just from guidelines. When I
            build for accessibility, it is not a checkbox — it is a genuine part of how I think
            about software and the people who use it.
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
