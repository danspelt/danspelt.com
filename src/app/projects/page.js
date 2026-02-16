'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink, Shield, Users, BarChart3, Wrench,
  Building2, MessageSquare, FileText, ChevronDown, ChevronUp,
  Layers, Database, Globe, Monitor, Container, Brain
} from 'lucide-react';

const techStack = {
  frontend: ["Next.js (App Router)", "React", "TailwindCSS", "ShadCN UI", "Dark/Light Theme"],
  backend: ["Node.js API Routes", "MongoDB", "RBAC", "JWT Auth", "Email Integration"],
  infrastructure: ["Docker", "Coolify (Self-hosted PaaS)", "Reverse Proxy", "Staging + Production Envs"],
};

const coreFeatures = [
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

const engineeringChallenges = [
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
          What I&apos;m building right now
        </p>
      </div>

      {/* Featured Project: Community Hive */}
      <div className="space-y-8">
        {/* Hero Card */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/10">
                    Active Project
                  </Badge>
                  <Badge variant="outline">SaaS</Badge>
                  <Badge variant="outline">Multi-Tenant</Badge>
                </div>
                <CardTitle className="text-3xl mb-2">Community Hive</CardTitle>
                <p className="text-muted-foreground">
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

        {/* Technology Stack */}
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
                {techStack.frontend.map((t) => <TechBadge key={t}>{t}</TechBadge>)}
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
                {techStack.backend.map((t) => <TechBadge key={t}>{t}</TechBadge>)}
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
                {techStack.infrastructure.map((t) => <TechBadge key={t}>{t}</TechBadge>)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Core Features */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coreFeatures.map((feature) => (
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
                {engineeringChallenges.map((challenge) => (
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
