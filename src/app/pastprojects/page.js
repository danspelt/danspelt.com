'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from 'lucide-react';
import './timeline.css';

const PastProjects = () => {
  const projects = [
    {
      title: "LipSync Connect",
      year: "2023",
      description: "A Next.js app designed to enhance device accessibility and user customization.",
      gradient: "from-blue-500/20 via-indigo-500/20 to-purple-500/20",
      icon: "🎮",
      tags: ["Next.js", "React", "Accessibility", "User Experience"],
      features: [
        "Device accessibility features",
        "User customization options",
        "Modern interface design",
        "Responsive layout"
      ]
    },
    {
      title: "Visualization Dashboard (Youneeq)",
      year: "2022",
      description: "A MERN stack-based dashboard with Chart.js integration and MUI for a modern, responsive interface. Focused on web traffic visualization and user engagement.",
      gradient: "from-emerald-500/20 via-teal-500/20 to-green-500/20",
      icon: "📊",
      tags: ["MERN Stack", "Chart.js", "Material-UI", "Analytics"],
      features: [
        "Web traffic visualization",
        "User engagement tracking",
        "Interactive charts",
        "Responsive dashboard"
      ]
    },
    {
      title: "CanAssist Projects",
      year: "2021",
      description: "Implemented geospatial tools and social media APIs, enhancing user engagement and project functionality.",
      gradient: "from-orange-500/20 via-red-500/20 to-pink-500/20",
      icon: "🌍",
      tags: ["Geospatial", "Social Media APIs", "JavaScript", "Integration"],
      features: [
        "Geospatial functionality",
        "Social media integration",
        "User engagement features",
        "Project management tools"
      ]
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Past Projects
        </h1>
        <p className="text-xl text-muted-foreground">
          A showcase of my professional development work and contributions
        </p>
      </div>

      <div className="timeline-container relative">
        {/* Timeline line */}
        <div className="timeline-line" />

        <div className="space-y-24">
          {projects.map((project, index) => (
            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left-timeline' : 'right-timeline'}`}>
              {/* Year marker */}
              <div className="year-marker">
                <div className="absolute left-1/2 transform -translate-x-1/2 -mt-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg">{project.year}</span>
                  </div>
                </div>
              </div>

              {/* Project Card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'ml-auto mr-8' : 'mr-auto ml-8'}`}>
                <Card className="timeline-card">
                  <div className={`relative overflow-hidden aspect-video bg-gradient-to-br ${project.gradient}`}>
                    <div className="card-icon absolute inset-0 flex items-center justify-center opacity-50 text-6xl">
                      {project.icon}
                    </div>
                    <div className="absolute inset-0 bg-grid-white/10" />
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {project.title}
                    </CardTitle>
                    <CardDescription>
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="card-content">
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2">
                            <Code className="w-4 h-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
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
