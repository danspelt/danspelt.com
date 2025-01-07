'use client';

import React, { useState } from 'react';
import { Code, Github, ExternalLink, X, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown';
import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";

const gradients = {
  'Python': 'from-blue-500 to-green-500',
  'JavaScript': 'from-yellow-400 to-orange-500',
  'TypeScript': 'from-blue-400 to-blue-600',
  'HTML': 'from-orange-400 to-red-500',
  'CSS': 'from-blue-400 to-purple-500',
  'default': 'from-gray-500 to-gray-700'
};

export default function ProjectsClient({ initialProjects }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [readme, setReadme] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReadme = async (owner, repo, branch) => {
    try {
      setLoading(true);
      console.log(`Fetching README for ${owner}/${repo} from branch ${branch}`);
      
      const response = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`);
      console.log('README.md response status:', response.status);
      
      if (!response.ok) {
        console.log('Trying lowercase readme.md...');
        const lowercaseResponse = await fetch(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/readme.md`);
        console.log('readme.md response status:', lowercaseResponse.status);
        
        if (!lowercaseResponse.ok) {
          console.log('No README found');
          return null;
        }
        const text = await lowercaseResponse.text();
        console.log('Found lowercase readme.md:', text.substring(0, 100) + '...');
        return text;
      }
      
      const text = await response.text();
      console.log('Found README.md:', text.substring(0, 100) + '...');
      return text;
    } catch (error) {
      console.error('Error fetching README:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = async (project) => {
    if (!project.defaultBranch) {
      console.error('No default branch specified for project:', project.name);
      window.open(project.url, '_blank', 'noopener,noreferrer');
      return;
    }

    setSelectedProject(project);
    setLoading(true);
    
    try {
      const content = await fetchReadme('danspelt', project.name, project.defaultBranch);
      if (content) {
        setReadme(content);
      } else {
        console.log('No README found, opening GitHub URL');
        window.open(project.url, '_blank', 'noopener,noreferrer');
        setSelectedProject(null);
      }
    } catch (error) {
      console.error('Error in handleCardClick:', error);
      window.open(project.url, '_blank', 'noopener,noreferrer');
      setSelectedProject(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Projects
            </h2>
            <p className="text-muted-foreground">
              Here are some of my projects from GitHub. Click on a project to view its README or visit the repository.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialProjects.map((project, index) => (
              <Card 
                key={index} 
                className="group overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:-translate-y-2"
                onClick={() => handleCardClick(project)}
              >
                <CardHeader className={`bg-gradient-to-r ${gradients[project.tags[0]] || gradients.default} p-6 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-grid-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold text-white group-hover:scale-105 transition-transform">
                        {project.title}
                      </CardTitle>
                      <span className="text-2xl transform group-hover:scale-110 transition-transform">
                        {project.icon}
                      </span>
                    </div>
                    <CardDescription className="text-white/90 mt-2">
                      {project.year}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={!!selectedProject}
        onClose={() => {
          setSelectedProject(null);
          setReadme(null);
        }}
      >
        {selectedProject && (
          <div className="prose dark:prose-invert max-w-none">
            <h1 className="flex items-center gap-4 mb-8">
              {selectedProject.title}
              <div className="flex gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                >
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </a>
                </Button>
                {selectedProject.homepage && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                  >
                    <a
                      href={selectedProject.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Demo
                    </a>
                  </Button>
                )}
              </div>
            </h1>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : readme ? (
              <ReactMarkdown>{readme}</ReactMarkdown>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No README available for this project.</p>
                <p className="mt-2">
                  <a 
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View project on GitHub
                  </a>
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
}
