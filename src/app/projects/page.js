'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Globe, Laptop, ExternalLink, Code, Star } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "AI Resume Builder",
      description: "A modern web application that uses AI to help users create professional resumes",
      image: "/projects/ai-resume.jpg",
      tags: ["Next.js", "OpenAI", "Tailwind CSS", "MongoDB"],
      liveUrl: "https://ai-resume.example.com",
      githubUrl: "https://github.com/yourusername/ai-resume",
      features: [
        "AI-powered content suggestions",
        "Multiple template designs",
        "Real-time preview",
        "PDF export functionality"
      ]
    },
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with advanced features and modern UI",
      image: "/projects/ecommerce.jpg",
      tags: ["React", "Node.js", "Express", "PostgreSQL"],
      liveUrl: "https://ecommerce.example.com",
      githubUrl: "https://github.com/yourusername/ecommerce",
      features: [
        "Product management",
        "Shopping cart",
        "Payment integration",
        "Order tracking"
      ]
    },
    {
      title: "Task Management App",
      description: "A collaborative task management tool for teams and individuals",
      image: "/projects/task-app.jpg",
      tags: ["React", "Firebase", "Material-UI", "Redux"],
      liveUrl: "https://task-app.example.com",
      githubUrl: "https://github.com/yourusername/task-app",
      features: [
        "Real-time updates",
        "Team collaboration",
        "File attachments",
        "Progress tracking"
      ]
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather information with interactive maps and forecasts",
      image: "/projects/weather.jpg",
      tags: ["React", "OpenWeather API", "Mapbox", "ChartJS"],
      liveUrl: "https://weather.example.com",
      githubUrl: "https://github.com/yourusername/weather",
      features: [
        "Location-based weather",
        "7-day forecast",
        "Interactive maps",
        "Weather alerts"
      ]
    },
    {
      title: "Social Media Analytics",
      description: "Analytics dashboard for social media performance tracking",
      image: "/projects/analytics.jpg",
      tags: ["Next.js", "D3.js", "GraphQL", "AWS"],
      liveUrl: "https://analytics.example.com",
      githubUrl: "https://github.com/yourusername/analytics",
      features: [
        "Real-time analytics",
        "Custom reports",
        "Data visualization",
        "Export capabilities"
      ]
    },
    {
      title: "Blog Platform",
      description: "Modern blogging platform with markdown support and SEO optimization",
      image: "/projects/blog.jpg",
      tags: ["Next.js", "MDX", "Prisma", "PostgreSQL"],
      liveUrl: "https://blog.example.com",
      githubUrl: "https://github.com/yourusername/blog",
      features: [
        "Markdown support",
        "SEO optimization",
        "Comment system",
        "Analytics integration"
      ]
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Projects
        </h1>
        <p className="text-xl text-muted-foreground">
          A showcase of my recent development projects and experiments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="flex flex-col overflow-hidden group">
            <div className="relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="sm" className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Live Demo
                  </Button>
                </a>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="sm" className="flex items-center gap-2">
                    <Github className="w-4 h-4" />
                    Code
                  </Button>
                </a>
              </div>
            </div>
            
            <CardHeader>
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-grow">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
                  {project.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;
