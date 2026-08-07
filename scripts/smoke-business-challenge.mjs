// Smoke test for the Business Challenge Finder API.
// Usage: node scripts/smoke-business-challenge.mjs [baseUrl]
//
// Uses deliberately fake data. It never asserts that email was delivered, only
// that validation, consent, honeypot, and rate limiting behave correctly.

const base = process.argv[2] || 'http://localhost:3000';
const url = `${base}/api/business-challenge`;

const valid = {
  category: 'admin',
  consequence: 'delay',
  people: 6,
  hoursPerWeek: 2,
  hourlyCost: 45,
  summary: 'Smoke test summary.',
  name: 'Smoke Test',
  email: 'smoke@example.com',
  consentToContact: true,
};

async function post(body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.status;
}

const cases = [
  ['rejects unknown category', { ...valid, category: 'nope' }, 400],
  ['rejects missing consent', { ...valid, consentToContact: false }, 400],
  ['rejects invalid email', { ...valid, email: 'not-an-email' }, 400],
  ['rejects people out of range', { ...valid, people: 9999 }, 400],
  ['rejects hoursPerWeek out of range', { ...valid, hoursPerWeek: 500 }, 400],
  ['accepts honeypot silently', { ...valid, website: 'bot' }, 200],
];

let failures = 0;

for (const [name, body, expected] of cases) {
  const status = await post(body);
  const ok = status === expected;
  if (!ok) failures += 1;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name} (expected ${expected}, got ${status})`);
}

// Valid submissions are capped at 5 per hour, so a short burst must eventually
// return 429. Invalid requests above must NOT have consumed this quota.
let saw429 = false;
for (let i = 0; i < 10; i += 1) {
  const status = await post(valid);
  if (status === 429) {
    saw429 = true;
    break;
  }
}
if (!saw429) failures += 1;
console.log(`${saw429 ? 'PASS' : 'FAIL'}  rate limits repeated submissions`);

console.log(failures === 0 ? '\nAll checks passed.' : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
