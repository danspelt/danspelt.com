// Smoke test for /api/health plus the public legal pages and their footer
// links. Usage: node scripts/health-check.mjs [baseUrl]
const base = process.argv[2] ?? 'http://localhost:3000';

const failures = [];

const res = await fetch(`${base}/api/health`);
const body = await res.json();

if (res.status !== 200) failures.push(`expected status 200, got ${res.status}`);
if (body.status !== 'ok') failures.push(`expected body.status 'ok', got '${body.status}'`);
if (res.headers.get('cache-control') !== 'no-store')
  failures.push(`expected Cache-Control 'no-store', got '${res.headers.get('cache-control')}'`);

if (failures.length > 0) {
  console.error(`FAIL ${base}/api/health\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log(`PASS ${base}/api/health`);

// Legal pages must be reachable and linked from the global footer.
const legalRoutes = [
  '/privacy-policy',
  '/terms-of-use',
  '/cookie-policy',
  '/accessibility-statement',
];

const pageFailures = [];
for (const route of legalRoutes) {
  const pageRes = await fetch(`${base}${route}`);
  if (pageRes.status !== 200) {
    pageFailures.push(`${route}: expected status 200, got ${pageRes.status}`);
  }
}

const homeRes = await fetch(`${base}/`);
const homeHtml = await homeRes.text();
for (const route of legalRoutes) {
  if (!homeHtml.includes(`href="${route}"`)) {
    pageFailures.push(`homepage is missing a footer link to ${route}`);
  }
}

if (pageFailures.length > 0) {
  console.error(`FAIL ${base} legal pages\n- ${pageFailures.join('\n- ')}`);
  process.exit(1);
}
console.log(`PASS ${base} legal pages (${legalRoutes.length} routes, footer links present)`);
