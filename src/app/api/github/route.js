import { Octokit } from '@octokit/rest';
import { NextResponse } from 'next/server';

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
    Swift: '🔶',
    Kotlin: '🟣',
    Dart: '🎯'
  };
  return icons[language] || '📦';
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    console.error('GitHub token not configured');
    return NextResponse.json(
      { error: 'GitHub token not configured', details: 'Please set GITHUB_TOKEN in environment variables' },
      { status: 500 }
    );
  }

  try {
    const octokit = new Octokit({
      auth: token,
      request: {
        fetch: fetch.bind(global)
      }
    });

    console.log('Fetching repositories for user: danspelt');
    
    const { data: repos } = await octokit.repos.listForUser({
      username: 'danspelt',
      sort: 'pushed',
      direction: 'desc',
      per_page: 100
    });

    console.log(`Found ${repos.length} repositories`);

    const filteredRepos = repos
      .filter(repo => !repo.fork && repo.name !== 'danspelt.com')
      .map(repo => ({
        title: formatRepoName(repo.name),
        year: new Date(repo.pushed_at).toLocaleDateString('en-US', { 
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        description: repo.description || `A ${repo.language} project focused on ${formatRepoName(repo.name)}.`,
        gradient: getRandomGradient(),
        icon: getIconForRepo(repo.language),
        url: repo.html_url,
        homepage: repo.homepage,
        tags: [
          repo.language,
          'Open Source',
          ...(repo.topics || []),
          repo.homepage ? 'Live Demo' : null
        ].filter(Boolean),
      }));

    console.log(`Returning ${filteredRepos.length} filtered repositories`);
    return NextResponse.json(filteredRepos);
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch repositories',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
