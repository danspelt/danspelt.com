import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Accessibility, Award, Users, Rocket } from "lucide-react";

export const metadata = {
  title: "About",
};

const highlights = [
  {
    icon: Award,
    title: "18+ Years Experience",
    text: "Seasoned full-stack developer with a proven track record of delivering robust, scalable applications across diverse industries.",
  },
  {
    icon: Accessibility,
    title: "Accessibility Champion",
    text: "WCAG 2.0 implementation expertise born from personal experience with cerebral palsy — building genuinely inclusive digital experiences.",
  },
  {
    icon: Users,
    title: "Team Collaborator",
    text: "Proven ability to work with cross-functional teams, translating business requirements into technical solutions that exceed expectations.",
  },
  {
    icon: Rocket,
    title: "Innovation Driven",
    text: "From multi-tenant SaaS platforms to AI-enhanced workflows, I thrive on pushing boundaries and solving complex engineering challenges.",
  },
];

const About = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          About Me
        </h1>
        <p className="text-lg text-muted-foreground">
          Transforming challenges into innovation
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
            I&apos;m Dan Spelt, a seasoned full-stack web developer with over 18 years of experience
            crafting robust, scalable, and user-centric applications. My ability to collaborate with
            cross-functional teams, coupled with deep technical expertise, has consistently resulted
            in the successful delivery of projects that meet both business and user needs.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            I was born with cerebral palsy, a condition affecting muscle coordination and mobility.
            Rather than a limitation, it has been a source of inspiration &mdash; fueling my drive to
            innovate and find creative solutions that I incorporate into every project. I bring a
            unique blend of technical expertise, real-world experience, and a relentless drive to
            create solutions that empower users and clients alike.
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
          <h2 className="text-2xl font-semibold mb-3">Accessibility &amp; Inclusion</h2>
          <p className="text-muted-foreground leading-relaxed">
            Choosing to collaborate with me means partnering with a professional who is deeply
            committed to making technology accessible to all. My condition has instilled in me
            resilience, adaptability, and a profound understanding of the importance of accessibility
            in technology. I have implemented WCAG 2.0 standards in various projects, resulting in
            improved compliance and enhanced user experiences for individuals with disabilities.
            My commitment extends beyond compliance &mdash; it&apos;s about creating genuinely inclusive experiences.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Notable Work</h2>
          <p className="text-muted-foreground leading-relaxed">
            I have led the development of several high-impact projects, including a Next.js app
            designed to enhance device accessibility, a comprehensive visualization dashboard using
            the MERN stack, and most recently, Community Hive &mdash; a multi-tenant SaaS platform
            for strata and HOA community communication. Each project reflects my commitment to
            clean architecture, scalable design, and user-first thinking.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Let&apos;s Work Together</h2>
          <p className="text-muted-foreground leading-relaxed">
            Whether you are seeking a senior developer to lead a complex project or a partner who
            understands the nuances of accessibility and diversity, I am confident that my skills
            and experiences will make a valuable contribution to your team. Let&apos;s collaborate
            to build something extraordinary together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
