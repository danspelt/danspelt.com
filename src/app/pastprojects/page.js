'use client';

import React from 'react';
import { Code } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import './timeline.css';

const projects = [
  {
    title: "EcoCart Boutique",
    year: "2024",
    description: "A modern e-commerce platform built with TypeScript, focusing on sustainable and eco-friendly products.",
    gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
    icon: "🌱",
    link: "https://shop-nine-psi.vercel.app",
    github: "https://github.com/danspelt/ecocartboutique",
    tags: ["TypeScript", "Next.js", "E-commerce", "Sustainability"],
    features: [
      "Modern e-commerce functionality",
      "Sustainable product focus",
      "Responsive design",
      "User-friendly interface"
    ]
  },
  {
    title: "PrimePulse",
    year: "2024",
    description: "A news and content platform built with JavaScript, delivering real-time updates and personalized content.",
    gradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20",
    icon: "📰",
    link: "https://nextnews-nine.vercel.app",
    github: "https://github.com/danspelt/primepulse",
    tags: ["JavaScript", "Next.js", "Content Platform", "Real-time"],
    features: [
      "Real-time news updates",
      "Personalized content delivery",
      "Modern UI/UX",
      "Responsive design"
    ]
  },
  {
    title: "TaskFlow",
    year: "2024",
    description: "A TypeScript-based task management application for streamlined productivity and project organization.",
    gradient: "from-orange-500/20 via-red-500/20 to-pink-500/20",
    icon: "✅",
    link: "https://taskflow-delta.vercel.app",
    github: "https://github.com/danspelt/taskflow",
    tags: ["TypeScript", "Task Management", "Productivity", "MIT License"],
    features: [
      "Task organization",
      "Project management",
      "Progress tracking",
      "Team collaboration"
    ]
  }
];

const PastProjects = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          Hobby Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12">
          A collection of personal projects I've built to explore new technologies and solve interesting problems.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="group relative">
              <div className="relative">
                <Card className="relative overflow-hidden transition-all">
                  <div className="absolute inset-0">
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-20`} />
                    <div className="absolute inset-0 bg-grid-white/10" />
                  </div>
                  
                  <div className="absolute top-4 right-4 text-2xl">
                    {project.icon}
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 dark:text-white flex items-center justify-between">
                      <span>{project.title}</span>
                      <span className="text-sm text-gray-500">{project.year}</span>
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="card-content">
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <Code className="mr-2 h-4 w-4" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="flex gap-4 mt-4">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Live Demo
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastProjects;
