export default function sitemap() {
  const base = 'https://danspelt.com';
  const routes = [
    '',
    '/about',
    '/case-studies',
    '/accessibility',
    '/projects',
    '/skillstools',
    '/timeline',
    '/custom-software',
    '/contact',
    '/faq',
    '/ai-chat',
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/custom-software' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/custom-software' || route === '/case-studies' ? 0.9 : 0.7,
  }));
}
