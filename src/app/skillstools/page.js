'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Globe, Laptop, Server, Terminal, Wrench } from 'lucide-react';

const skillCategories = [
  {
    category: "Frontend Development",
    icon: Globe,
    description: "Building modern, responsive web interfaces",
    skills: [
      { name: "React & Next.js", level: 90 },
      { name: "JavaScript/ES6+", level: 95 },
      { name: "HTML5 & CSS3", level: 90 },
      { name: "Tailwind CSS", level: 85 },
      { name: "TypeScript", level: 80 },
    ],
  },
  {
    category: "Backend Development",
    icon: Server,
    description: "Creating robust server-side applications",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 85 },
      { name: "RESTful APIs", level: 90 },
      { name: "GraphQL", level: 75 },
      { name: "Python", level: 70 },
    ],
  },
  {
    category: "Database & Storage",
    icon: Database,
    description: "Managing data and storage solutions",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Redis", level: 70 },
      { name: "Firebase", level: 75 },
    ],
  },
  {
    category: "DevOps & Infrastructure",
    icon: Wrench,
    description: "Deployment, CI/CD, and cloud services",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Docker", level: 75 },
      { name: "CI/CD Pipelines", level: 80 },
      { name: "Coolify / Self-hosted PaaS", level: 80 },
      { name: "Linux", level: 75 },
    ],
  },
  {
    category: "Development Tools",
    icon: Terminal,
    description: "Tools and environments I work with daily",
    skills: [
      { name: "VS Code / Windsurf", level: 95 },
      { name: "Chrome DevTools", level: 90 },
      { name: "npm / pnpm", level: 85 },
      { name: "Postman", level: 85 },
    ],
  },
  {
    category: "Additional Skills",
    icon: Laptop,
    description: "Design, accessibility, and optimization",
    skills: [
      { name: "Web Accessibility (WCAG)", level: 85 },
      { name: "Responsive Design", level: 90 },
      { name: "Performance Optimization", level: 85 },
      { name: "UI/UX Design", level: 75 },
      { name: "SEO", level: 70 },
    ],
  },
];

function AnimatedBar({ level }) {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWidth(level);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} className="h-2 rounded-full bg-secondary overflow-hidden">
      <div
        className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

const SkillsTools = () => {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Skills &amp; Tools
        </h1>
        <p className="text-lg text-muted-foreground">
          A comprehensive overview of my technical expertise
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Card key={cat.category} className="overflow-hidden">
              <CardHeader className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{cat.category}</CardTitle>
                    <CardDescription className="text-xs">{cat.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <AnimatedBar level={skill.level} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsTools;