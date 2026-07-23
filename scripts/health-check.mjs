// Smoke test for /api/health. Usage: node scripts/health-check.mjs [baseUrl]
const base = process.argv[2] ?? 'http://localhost:3000';

const res = await fetch(`${base}/api/health`);
const body = await res.json();

const failures = [];
if (res.status !== 200) failures.push(`expected status 200, got ${res.status}`);
if (body.status !== 'ok') failures.push(`expected body.status 'ok', got '${body.status}'`);
if (res.headers.get('cache-control') !== 'no-store')
  failures.push(`expected Cache-Control 'no-store', got '${res.headers.get('cache-control')}'`);

if (failures.length > 0) {
  console.error(`FAIL ${base}/api/health\n- ${failures.join('\n- ')}`);
  process.exit(1);
}
console.log(`PASS ${base}/api/health`);
