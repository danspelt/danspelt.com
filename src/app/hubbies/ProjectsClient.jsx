'use client';

import React, { useState, useEffect } from 'react';
import { Code, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProjectsClient({ initialProjects = [] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }

    if (!initialProjects.length) {
      fetchProjects();
    }
  }, [initialProjects]);

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Loading...
          </h1>
        </div>
      </div>
    );
  }

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
                <Card className="relative overflow-hidden transition-all hover:shadow-lg">
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
                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => window.open(project.url, '_blank')}
                        >
                          <Github className="mr-2 h-4 w-4" />
                          View Source
                        </Button>
                        {project.homepage && (
                          <Button
                            variant="default"
                            size="sm"
                            className="w-full"
                            onClick={() => window.open(project.homepage, '_blank')}
                          >
                            View Demo
                          </Button>
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
}
