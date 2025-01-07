import ProjectsClient from './ProjectsClient';
import { fallbackProjects } from './fallback-data';
import { Octokit } from '@octokit/rest';

// Force static page generation
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

async function getRepositories() {
  try {
    const token = process.env.GITHUB_TOKEN;
    
    if (!token) {
      console.error('No GitHub token found');
      return fallbackProjects;
    }

    const octokit = new Octokit({
      auth: token
    });

    // First verify the token works by getting the authenticated user
    try {
      const { data: user } = await octokit.users.getAuthenticated();
      console.log('Authenticated as:', user.login);
    } catch (error) {
      console.error('Authentication failed:', error.message);
      return fallbackProjects;
    }

    // Get repositories
    const { data: repos } = await octokit.repos.listForUser({
      username: 'danspelt',
      sort: 'pushed',
      direction: 'desc',
      per_page: 100,
      type: 'owner'
    });

    console.log(`Fetched ${repos.length} repositories`);

    return repos
      .filter(repo => !repo.fork && repo.name !== 'danspelt.com')
      .map(repo => ({
        title: repo.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        year: new Date(repo.pushed_at).toLocaleDateString('en-US', { 
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        description: repo.description || `A ${repo.language} project`,
        gradient: "from-[#93C5FD] via-[#60A5FA] to-[#3B82F6]",
        icon: repo.language === 'Python' ? '🐍' : 
              repo.language === 'JavaScript' ? '🌐' : 
              repo.language === 'TypeScript' ? '📘' : '💻',
        url: repo.html_url,
        homepage: repo.homepage,
        tags: [
          repo.language,
          'Open Source',
          ...(repo.topics || []),
          repo.homepage ? 'Live Demo' : null
        ].filter(Boolean),
      }));
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return fallbackProjects;
  }
}

export default async function Page() {
  const repositories = await getRepositories();
  return <ProjectsClient initialProjects={repositories || fallbackProjects} />;
}
