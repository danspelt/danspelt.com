export function formatRepoName(name) {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getRandomGradient() {
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

export function getIconForRepo(language) {
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
