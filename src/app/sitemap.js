export default function sitemap() {
  const base = 'https://danspelt.com';
  const routes = [
    '',
    '/about',
    '/work',
    '/case-studies',
    '/accessibility',
    '/projects',
    '/skillstools',
    '/timeline',
    '/custom-software',
    '/contact',
    '/faq',
    '/insights',
    '/ai-chat',
    '/build-for-us',
    '/case-studies/community-hive',
    '/case-studies/accesslens',
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date('2026-09-10'),
    changeFrequency: route === '' || route === '/custom-software' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/custom-software' || route === '/case-studies' ? 0.9 : 0.7,
  }));
}
