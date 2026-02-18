import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accessibility, Award, Users, ShieldCheck, ArrowRight, FileText } from "lucide-react";

export const metadata = {
  title: "About",
  description:
    "Senior Full-Stack Engineer and Accessibility Specialist with 18+ years of experience in WCAG compliance, secure systems, and public-sector web development.",
};

const highlights = [
  {
    icon: Award,
    title: "18+ Years Engineering Experience",
    text: "Proven track record delivering robust, scalable, and maintainable systems across public-sector, non-profit, and SaaS environments.",
  },
  {
    icon: Accessibility,
    title: "WCAG Compliance Specialist",
    text: "Implemented WCAG 2.0/2.1 standards across multiple platforms, achieving a 20% compliance increase and measurable improvements in screen reader compatibility.",
  },
  {
    icon: ShieldCheck,
    title: "Secure, Standards-Driven Development",
    text: "Experience with privacy compliance, role-based access control, audit logging, and documentation practices aligned with public-sector expectations.",
  },
  {
    icon: Users,
    title: "Cross-functional Collaboration",
    text: "Consistent delivery within Agile/Scrum teams — translating complex requirements into technical solutions that serve diverse user populations.",
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
          Senior Full-Stack Engineer &middot; Accessibility & Compliance Specialist &middot; Remote
        </p>
      </div>

      {/* Photo + Intro */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
        <div className="shrink-0">
          <Image
            src="/images/dan.jpeg"
            alt="Dan Spelt"
            width={180}
            height={180}
            className="rounded-2xl shadow-lg"
          />
        </div>
        <div className="space-y-4">
          <p className="text-lg leading-relaxed text-muted-foreground">
            I&apos;m Dan Spelt — a Senior Full-Stack Engineer with over 18 years of experience
            designing and delivering secure, scalable web systems. I specialize in accessibility-first
            architecture, WCAG compliance implementation, and long-term maintainability for
            public-sector and enterprise-grade platforms.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            I was born with cerebral palsy. That lived experience informs every technical decision
            I make around assistive technology, inclusive design, and compliance standards. It&apos;s
            not a background detail — it&apos;s the reason I build the way I build.
          </p>
          <p className="text-sm text-muted-foreground border-l-2 border-primary/40 pl-4 italic">
            Open to remote senior roles and government contracts.
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
            I have led the design and delivery of several high-complexity systems: LipSync Connect,
            a Next.js accessibility platform for device interaction; a full-stack data system at
            CanAssist (University of Victoria) emphasizing privacy standards and cross-functional
            collaboration; and Community Hive, a multi-tenant SaaS platform with tenant-isolated
            data architecture, RBAC, and AI-assisted communication workflows. Each reflects
            a consistent commitment to clean architecture, security, and long-term maintainability.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Availability</h2>
          <p className="text-muted-foreground leading-relaxed">
            I am currently open to remote senior engineering roles and government or public-sector
            contracts. I bring deep accessibility and compliance expertise, strong architectural
            ownership, and a track record of delivery in structured, cross-functional environments.
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
