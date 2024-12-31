export async function getGitHubProjects() {
  try {
    const response = await fetch('https://api.github.com/users/danspelt/repos', {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub projects');
    }

    const repos = await response.json();
    
    return repos
      .filter(repo => !repo.fork && repo.name !== 'danspelt.com') // Exclude forks and personal website
      .map(repo => ({
        title: formatRepoName(repo.name),
        year: new Date(repo.created_at).getFullYear().toString(),
        description: repo.description || `A ${repo.language} project focused on ${formatRepoName(repo.name)}.`,
        gradient: getRandomGradient(),
        icon: getIconForRepo(repo.language),
        link: repo.homepage,
        github: repo.html_url,
        tags: [
          repo.language,
          'Open Source',
          ...(repo.homepage ? ['Deployed'] : []),
          ...(repo.license ? [repo.license.spdx_id] : [])
        ].filter(Boolean),
        features: [
          `Built with ${repo.language}`,
          repo.homepage ? 'Live deployment' : '',
          'Open source project',
          `Last updated ${new Date(repo.updated_at).toLocaleDateString()}`
        ].filter(Boolean)
      }))
      .sort((a, b) => new Date(b.year) - new Date(a.year))
      .slice(0, 6); // Get top 6 most recent repos
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
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
    'from-blue-500/20 via-indigo-500/20 to-purple-500/20',
    'from-green-500/20 via-emerald-500/20 to-teal-500/20',
    'from-orange-500/20 via-red-500/20 to-pink-500/20',
    'from-purple-500/20 via-pink-500/20 to-red-500/20',
    'from-yellow-500/20 via-orange-500/20 to-red-500/20',
    'from-teal-500/20 via-cyan-500/20 to-blue-500/20'
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
}

function getIconForRepo(language) {
  const icons = {
    JavaScript: '📜',
    TypeScript: '💎',
    Python: '🐍',
    HTML: '🌐',
    CSS: '🎨',
    default: '💻'
  };
  return icons[language] || icons.default;
}
