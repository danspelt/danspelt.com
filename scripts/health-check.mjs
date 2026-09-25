// Smoke test for /api/health plus the public legal pages and their footer
// links. Usage: node scripts/health-check.mjs [baseUrl]
const base = process.argv[2] ?? 'http://localhost:3000';

const failures = [];

async function fetchWithTimeout(url, timeoutMs = 10_000) {
  try {
    return await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    failures.push(`${url}: request failed (${detail})`);
    return null;
  }
}

const res = await fetchWithTimeout(`${base}/api/health`);
let body = null;

if (res) {
  try {
    body = await res.json();
  } catch {
    failures.push('expected the health endpoint to return valid JSON');
  }
}

if (res && res.status !== 200) failures.push(`expected status 200, got ${res.status}`);
if (body?.status !== 'ok') failures.push(`expected body.status 'ok', got '${body?.status}'`);
if (body?.service !== 'danspelt.com')
  failures.push(`expected body.service 'danspelt.com', got '${body?.service}'`);
if (typeof body?.timestamp !== 'string' || Number.isNaN(Date.parse(body.timestamp)))
  failures.push(`expected body.timestamp to be an ISO timestamp, got '${body?.timestamp}'`);
if (res && res.headers.get('cache-control') !== 'no-store')
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
  const pageRes = await fetchWithTimeout(`${base}${route}`);
  if (pageRes && pageRes.status !== 200) {
    pageFailures.push(`${route}: expected status 200, got ${pageRes.status}`);
  }
}

const homeRes = await fetchWithTimeout(`${base}/`);
if (homeRes) {
  const homeHtml = await homeRes.text();
  for (const route of legalRoutes) {
    if (!homeHtml.includes(`href="${route}"`)) {
      pageFailures.push(`homepage is missing a footer link to ${route}`);
    }
  }
}

if (failures.length > 0 || pageFailures.length > 0) {
  console.error(`FAIL ${base} site checks\n- ${[...failures, ...pageFailures].join('\n- ')}`);
  process.exit(1);
}
console.log(`PASS ${base} legal pages (${legalRoutes.length} routes, footer links present)`);
