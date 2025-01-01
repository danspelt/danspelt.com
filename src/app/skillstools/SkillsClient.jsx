'use client';

import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Database, Globe, Laptop, Server, Terminal, Wrench } from 'lucide-react';

export default function SkillsClient() {
  const skills = [
    {
      category: "Frontend Development",
      icon: <Globe className="w-10 h-10 text-primary" />,
      description: "Building modern, responsive web interfaces",
      skills: [
        { name: "React & Next.js", level: 90 },
        { name: "JavaScript/ES6+", level: 95 },
        { name: "HTML5 & CSS3", level: 90 },
        { name: "Tailwind CSS", level: 85 },
        { name: "TypeScript", level: 80 },
      ]
    },
    {
      category: "Backend Development",
      icon: <Server className="w-10 h-10 text-primary" />,
      description: "Creating robust server-side applications",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Express.js", level: 85 },
        { name: "RESTful APIs", level: 90 },
        { name: "GraphQL", level: 75 },
        { name: "Python", level: 70 },
      ]
    },
    {
      category: "Database & Storage",
      icon: <Database className="w-10 h-10 text-primary" />,
      description: "Managing data and storage solutions",
      skills: [
        { name: "MongoDB", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "Redis", level: 70 },
        { name: "Firebase", level: 75 },
        { name: "AWS S3", level: 70 },
      ]
    },
    {
      category: "DevOps & Tools",
      icon: <Wrench className="w-10 h-10 text-primary" />,
      description: "Development and deployment tools",
      skills: [
        { name: "Git & GitHub", level: 90 },
        { name: "Docker", level: 75 },
        { name: "CI/CD", level: 80 },
        { name: "AWS", level: 70 },
        { name: "Linux", level: 75 },
      ]
    },
    {
      category: "Development Tools",
      icon: <Terminal className="w-10 h-10 text-primary" />,
      description: "Tools and environments I work with",
      skills: [
        { name: "VS Code", level: 95 },
        { name: "Git", level: 90 },
        { name: "npm/yarn/pnpm", level: 85 },
        { name: "Chrome DevTools", level: 90 },
        { name: "Postman", level: 85 },
      ]
    },
    {
      category: "Additional Skills",
      icon: <Laptop className="w-10 h-10 text-primary" />,
      description: "Other relevant technical skills",
      skills: [
        { name: "UI/UX Design", level: 75 },
        { name: "Responsive Design", level: 85 },
        { name: "SEO Optimization", level: 70 },
        { name: "Web Accessibility", level: 80 },
        { name: "Performance Optimization", level: 85 },
      ]
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Skills & Tools
        </h1>
        <p className="text-xl text-muted-foreground">
          A comprehensive overview of my technical expertise and tools I work with
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((category, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-4">
                {category.icon}
                <div>
                  <CardTitle className="text-xl">{category.category}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full">
                      <div
                        className="h-2 bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
