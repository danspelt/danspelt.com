'use client';

import React from 'react';
import { Code, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProjectsClient({ initialProjects = [] }) {
  if (!initialProjects || initialProjects.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Loading Projects...
          </h1>
          <p className="text-center text-gray-600">
            Please wait while we fetch the latest projects.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          My Projects
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialProjects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className={`bg-gradient-to-r ${project.gradient} p-6`}>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-white">
                    {project.title}
                  </CardTitle>
                  <span className="text-2xl">{project.icon}</span>
                </div>
                <CardDescription className="text-white/90 mt-2">
                  {project.year}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Source
                    </a>
                  </Button>
                  {project.homepage && (
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center"
                      >
                        <Code className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
