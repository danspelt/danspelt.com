import { Octokit } from '@octokit/rest';

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

export async function GET() {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  });

  try {
    const { data: repos } = await octokit.repos.listForUser({
      username: 'danspelt',
      sort: 'updated',
      direction: 'desc'
    });

    const filteredRepos = repos
      .filter(repo => !repo.fork && repo.name !== 'danspelt.com')
      .map(repo => ({
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
          ...(repo.topics || []),
          repo.homepage ? 'Live Demo' : null
        ].filter(Boolean),
        features: [
          `${repo.stargazers_count} stars`,
          `${repo.forks_count} forks`,
          repo.homepage ? 'Has demo' : 'No demo available'
        ]
      }));

    return Response.json(filteredRepos);
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return Response.json({ error: 'Failed to fetch repositories' }, { status: 500 });
  }
}
