import ProjectsClient from './ProjectsClient';

async function getRepositories() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/github`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching repositories:', error);
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

export default async function Page() {
  const repositories = await getRepositories();
  return <ProjectsClient initialProjects={repositories} />;
}
