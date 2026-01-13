'use client';

import { useEffect, useState } from 'react';
import ProjectsClient from './ProjectsClient';
import { fallbackProjects } from './fallback-data';

export default function Page() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/github');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setProjects(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return <ProjectsClient initialProjects={projects} />;
}
