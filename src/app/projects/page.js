'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink, Shield, Users, BarChart3, Wrench,
  Building2, MessageSquare, FileText, ChevronDown, ChevronUp,
  Layers, Database, Globe, Monitor, Container, Brain, MapPin
} from 'lucide-react';

const accessLensTechStack = {
  frontend: ["Next.js 16 (App Router)", "React 18", "TypeScript", "Tailwind CSS"],
  backend: ["Next.js API Routes", "MongoDB", "Auth.js (NextAuth v5)", "Zod 4.x"],
  infrastructure: ["Docker (Multi-stage)", "Leaflet + OpenStreetMap", "Nominatim Geocoding", "Coolify"],
};

const accessLensFeatures = [
  {
    icon: MapPin,
    title: "Accessibility Scoring & Mapping",
    description: "Each place receives a calculated score (0–100) across 10 criteria. Colour-coded map markers (green/yellow/red) rendered via Leaflet and OpenStreetMap — no paid API key required.",
  },
  {
    icon: Users,
    title: "Community Reviews & Reporting",
    description: "Reviewers submit accessibility reports and ratings. Business accounts manage their own places. Structured issue reporting with moderation pipeline.",
  },
  {
    icon: Shield,
    title: "Multi-Provider Authentication",
    description: "Auth.js with Google OAuth, email magic link, and credential sign-in. BCrypt password hashing, JWT session management, and route-level middleware protection.",
  },
  {
    icon: Database,
    title: "Geospatial Data Architecture",
    description: "MongoDB 2dsphere index for proximity queries. 10 collections including geocode cache with TTL, GeoJSON location model, and compound indexes for filter performance.",
  },
  {
    icon: Globe,
    title: "City-Scale Seeded Data",
    description: "50+ real verified places in Victoria, BC across 12 categories — restaurants, government, parks, transit, hospitals, and more — production-ready at launch.",
  },
  {
    icon: FileText,
    title: "WCAG 2.1 AA Compliance",
    description: "Built in alignment with the Accessible Canada Act and BC Accessibility Act. Semantic HTML, ARIA labels, keyboard navigation, and screen reader compatibility throughout.",
  },
];

const hiveTechStack = {
  frontend: ["Next.js (App Router)", "React", "TailwindCSS", "ShadCN UI", "Dark/Light Theme"],
  backend: ["Node.js API Routes", "MongoDB", "RBAC", "JWT Auth", "Email Integration"],
  infrastructure: ["Docker", "Coolify (Self-hosted PaaS)", "Reverse Proxy", "Staging + Production Envs"],
};

const hiveCoreFeatures = [
  {
    icon: Users,
    title: "Role-Based Dashboards",
    description: "Dynamic dashboards for Property Managers, Council Presidents, Council Members, and Residents. Each role sees scoped data and authorized actions only.",
  },
  {
    icon: MessageSquare,
    title: "Communication Engine",
    description: "Centralized announcements, scheduled messaging, multi-channel notifications, AI-assisted tone polishing & summary generation, and automated weekly Building Brief digests.",
  },
  {
    icon: Wrench,
    title: "Maintenance & Ticketing",
    description: "Residents submit maintenance requests, ARC requests, violations reports, and service tickets. Auto-categorized, status-tracked, and logged with full audit history.",
  },
  {
    icon: FileText,
    title: "Document & Governance",
    description: "Secure storage for governing documents and meeting minutes. Controlled access permissions, audit trails, and exportable data on contract termination.",
  },
  {
    icon: BarChart3,
    title: "Engagement & Analytics",
    description: "Resident polls & surveys, quorum support tools, message open-rate analytics, engagement tracking dashboard, and automated recognition messaging.",
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Tenant-scoped database queries, role-based permission middleware, document access restriction, Canadian privacy compliance alignment, and audit log framework.",
  },
];

const hiveEngineeringChallenges = [
  "Designing clean multi-tenant data isolation in MongoDB",
  "Building role-based dynamic dashboards with scoped permissions",
  "Creating automated digest generation using AI",
  "Structuring a licensing model adaptable to building size",
  "Deploying self-hosted SaaS infrastructure with environment isolation",
  "Designing a white-label capable architecture",
];

function TechBadge({ children }) {
  return (
    <Badge variant="secondary" className="text-xs">
      {children}
    </Badge>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

const Projects = () => {
  const [showChallenges, setShowChallenges] = useState(false);

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Projects
        </h1>
        <p className="text-lg text-muted-foreground">
          What I&apos;ve built
        </p>
      </div>

      {/* ── AccessLens ── */}
      <div className="space-y-8 mb-20">
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/10">
                    Active
                  </Badge>
                  <Badge variant="outline">Accessibility</Badge>
                  <Badge variant="outline">Civic Tech</Badge>
                </div>
                <CardTitle className="text-3xl mb-2">AccessLens</CardTitle>
                <p className="text-sm text-muted-foreground font-medium">Founder &amp; Developer &mdash; May 2026 &ndash; Present</p>
                <p className="text-muted-foreground mt-1">
                  Accessibility Intelligence Platform for Cities
                </p>
              </div>
              <a href="https://www.accesslens.ca/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Visit Live Site
                </Button>
              </a>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              AccessLens is a community-driven platform that helps people with disabilities navigate cities
              using crowdsourced accessibility data, interactive maps, and community reviews. Each place
              receives a calculated accessibility score across 10 criteria, visualized with colour-coded
              markers on an OpenStreetMap-powered map. Launched production-ready with 50+ verified places
              in Victoria, BC.
            </p>
          </CardContent>
        </Card>

        {/* AccessLens Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-primary" />
                <CardTitle className="text-base">Frontend</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {accessLensTechStack.frontend.map((t) => <TechBadge key={t}>{t}</TechBadge>)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-primary" />
                <CardTitle className="text-base">Backend</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {accessLensTechStack.backend.map((t) => <TechBadge key={t}>{t}</TechBadge>)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Container className="w-4 h-4 text-primary" />
                <CardTitle className="text-base">Infrastructure</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {accessLensTechStack.infrastructure.map((t) => <TechBadge key={t}>{t}</TechBadge>)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AccessLens Features */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accessLensFeatures.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </div>

      <hr className="border-border mb-20" />

      {/* ── Community Hive ── */}
      <div className="space-y-8">
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/10">
                    Shipped
                  </Badge>
                  <Badge variant="outline">SaaS</Badge>
                  <Badge variant="outline">Multi-Tenant</Badge>
                </div>
                <CardTitle className="text-3xl mb-2">Community Hive</CardTitle>
                <p className="text-sm text-muted-foreground font-medium">Founder &amp; Developer &mdash; Jan 2025 &ndash; Apr 2026</p>
                <p className="text-muted-foreground mt-1">
                  Multi-Tenant Communication Platform for Strata &amp; HOA Communities
                </p>
              </div>
              <a href="http://communityhive.ca/" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Visit Live Site
                </Button>
              </a>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              Community Hive is a multi-tenant SaaS platform designed to centralize communication
              between property managers, strata councils, HOA boards, and residents. The system
              replaces fragmented tools (email chains, paper notices, social media groups) with a
              secure, structured, and scalable communication architecture. It supports multiple
              buildings, unit hierarchies, and role-based dashboards, enabling controlled document
              access, structured issue tracking, automated announcements, and AI-enhanced
              communication workflows.
            </p>
          </CardContent>
        </Card>

        {/* Architecture Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Layers className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Architecture Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Multi-tenant SaaS &mdash; single codebase, tenant-isolated data model
            </p>
            <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm leading-relaxed">
              <div>Tenant <span className="text-muted-foreground">(Property Management Firm or Strata Org)</span></div>
              <div className="ml-4">
                <span className="text-muted-foreground">&rarr;</span> Building / Community
              </div>
              <div className="ml-8">
                <span className="text-muted-foreground">&rarr;</span> Unit
              </div>
              <div className="ml-12">
                <span className="text-muted-foreground">&rarr;</span> Resident
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Each entity is scoped with strict tenant isolation to ensure secure data separation across communities.
            </p>
          </CardContent>
        </Card>

        {/* Community Hive Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-primary" />
                <CardTitle className="text-base">Frontend</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {hiveTechStack.frontend.map((t) => <TechBadge key={t}>{t}</TechBadge>)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-primary" />
                <CardTitle className="text-base">Backend</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {hiveTechStack.backend.map((t) => <TechBadge key={t}>{t}</TechBadge>)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Container className="w-4 h-4 text-primary" />
                <CardTitle className="text-base">Infrastructure</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {hiveTechStack.infrastructure.map((t) => <TechBadge key={t}>{t}</TechBadge>)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Community Hive Core Features */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hiveCoreFeatures.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>

        {/* Engineering Challenges */}
        <Card>
          <CardHeader
            className="cursor-pointer"
            onClick={() => setShowChallenges((v) => !v)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <CardTitle className="text-xl">Engineering Challenges Solved</CardTitle>
              </div>
              {showChallenges ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          </CardHeader>
          {showChallenges && (
            <CardContent>
              <ul className="space-y-3">
                {hiveEngineeringChallenges.map((challenge) => (
                  <li key={challenge} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </CardContent>
          )}
        </Card>

        {/* Design Philosophy */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-xl">Design Philosophy</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Reduce administrative overhead",
                "Increase resident engagement",
                "Prevent communication breakdowns",
                "Replace multiple disorganized tools with a unified platform",
                "Automate recurring communication tasks using AI-assisted workflows",
                "Scalable architecture for regulated community environments",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Projects;
