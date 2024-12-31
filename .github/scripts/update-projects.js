const { Octokit } = require('@octokit/rest');
const fs = require('fs');
const path = require('path');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function getRepositories() {
  const { data: repos } = await octokit.repos.listForUser({
    username: 'danspelt',
    sort: 'updated',
    direction: 'desc'
  });

  return repos
    .filter(repo => !repo.fork) // Exclude forked repositories
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
        ...getAdditionalTags(repo)
      ].filter(Boolean),
      features: [
        `Built with ${repo.language}`,
        repo.homepage ? 'Live deployment' : '',
        'Open source project',
        `Last updated ${new Date(repo.updated_at).toLocaleDateString()}`
      ].filter(Boolean)
    }))
    .slice(0, 6); // Get top 6 most recently updated repos
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

function getAdditionalTags(repo) {
  const tags = [];
  if (repo.homepage) tags.push('Deployed');
  if (repo.license) tags.push(repo.license.spdx_id);
  return tags;
}

async function updateProjectsFile(projects) {
  const projectsFilePath = path.join(process.cwd(), 'src', 'app', 'pastprojects', 'page.js');
  const fileContent = fs.readFileSync(projectsFilePath, 'utf8');
  
  // Replace the projects array while preserving the rest of the file
  const newContent = fileContent.replace(
    /const projects = \[[\s\S]*?\];/m,
    `const projects = ${JSON.stringify(projects, null, 2)};`
  );
  
  fs.writeFileSync(projectsFilePath, newContent);
}

async function main() {
  try {
    const projects = await getRepositories();
    await updateProjectsFile(projects);
    console.log('Successfully updated projects');
  } catch (error) {
    console.error('Error updating projects:', error);
    process.exit(1);
  }
}

main();
