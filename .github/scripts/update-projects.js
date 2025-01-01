import { Octokit } from '@octokit/rest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function getRepositories() {
  try {
    const { data: repos } = await octokit.repos.listForUser({
      username: 'danspelt',
      sort: 'updated',
      direction: 'desc'
    });

    console.log(`Found ${repos.length} repositories`);

    const filteredRepos = repos
      .filter(repo => !repo.fork && repo.name !== 'danspelt.com');

    console.log(`Filtered to ${filteredRepos.length} repositories`);

    return filteredRepos.map(repo => ({
      title: formatRepoName(repo.name),
      year: new Date(repo.created_at).getFullYear().toString(),
      description: repo.description || `A ${repo.language} project focused on ${formatRepoName(repo.name)}.`,
      gradient: getRandomGradient(),
      icon: getIconForRepo(repo.language),
      url: repo.html_url,
      homepage: repo.homepage,
      tags: [
        repo.language,
        'Open Source',
        ...getAdditionalTags(repo)
      ].filter(Boolean),
      features: [
        `${repo.stargazers_count} stars`,
        `${repo.forks_count} forks`,
        repo.homepage ? 'Has demo' : 'No demo available'
      ]
    }));
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
}

function formatRepoName(name) {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getRandomGradient() {
  const gradients = [
    'from-blue-500 to-purple-500',
    'from-green-500 to-blue-500',
    'from-red-500 to-orange-500',
    'from-yellow-500 to-red-500',
    'from-purple-500 to-pink-500',
    'from-indigo-500 to-blue-500'
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
}

function getIconForRepo(language) {
  const icons = {
    JavaScript: '🟨',
    TypeScript: '🔷',
    Python: '🐍',
    Java: '☕',
    'C#': '🟩',
    PHP: '🐘',
    Ruby: '💎',
    Go: '🔵',
    Rust: '⚙️',
    default: '💻'
  };
  return icons[language] || icons.default;
}

function getAdditionalTags(repo) {
  const tags = [];
  if (repo.topics && repo.topics.length > 0) {
    console.log(`Topics for ${repo.name}:`, repo.topics);
    tags.push(...repo.topics);
  }
  if (repo.homepage) tags.push('Live Demo');
  return tags;
}

async function updateProjectsFile(projects) {
  try {
    console.log('Generating file content...');
    const content = `'use client';

import React from 'react';
import { Code, Github } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function ProjectsClient() {
  const projects = ${JSON.stringify(projects, null, 2)};

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
                    <div className={\`absolute inset-0 bg-gradient-to-r \${project.gradient} opacity-20\`} />
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

export default ProjectsClient;`;

    console.log('Writing files...');
    
    // Write to page.js
    const pageFilePath = path.join(process.cwd(), 'src', 'app', 'hubbies', 'page.js');
    fs.writeFileSync(pageFilePath, `
import ProjectsClient from './ProjectsClient';

export default function Page() {
  return <ProjectsClient />;
}
`, 'utf8');
    console.log('page.js written successfully');

    // Write to ProjectsClient.jsx
    const clientFilePath = path.join(process.cwd(), 'src', 'app', 'hubbies', 'ProjectsClient.jsx');
    fs.writeFileSync(clientFilePath, content, 'utf8');
    console.log('ProjectsClient.jsx written successfully');
  } catch (error) {
    console.error('Error updating projects file:', error);
    throw error;
  }
}

async function main() {
  try {
    console.log('Starting update process...');
    const projects = await getRepositories();
    console.log(`Processing ${projects.length} projects...`);
    await updateProjectsFile(projects);
    console.log('Successfully updated projects file');
  } catch (error) {
    console.error('Error in main function:', error);
    process.exit(1);
  }
}

main();
