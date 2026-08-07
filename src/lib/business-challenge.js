// Shared logic for the Business Challenge Finder.
//
// The estimate runs entirely in the browser. Nothing is sent to the server
// until the visitor explicitly chooses to contact Dan. These helpers are also
// imported by the API route so the client and server agree on shape and
// vocabulary.

import { z } from 'zod';

/** Conservative: 48 working weeks rather than 52. */
export const WORKING_WEEKS_PER_YEAR = 48;

/** Deliberately cautious recovery band. Never presented as a guarantee. */
export const RECOVERY_LOW = 0.15;
export const RECOVERY_HIGH = 0.35;

export const DEFAULT_HOURLY_COST = 45;

export const CHALLENGE_CATEGORIES = [
  {
    id: 'admin',
    label: 'Repetitive administration',
    description: 'The same manual steps are repeated every week.',
  },
  {
    id: 'records',
    label: 'Scattered information',
    description: 'Information lives in email, spreadsheets, paper, and people’s heads.',
  },
  {
    id: 'communication',
    label: 'Customer or member communication',
    description: 'Updates get missed and staff answer the same questions repeatedly.',
  },
  {
    id: 'scheduling',
    label: 'Scheduling or bookings',
    description: 'Coordinating people, rooms, or appointments takes too much effort.',
  },
  {
    id: 'reporting',
    label: 'Reporting and visibility',
    description: 'It is hard to see what is happening without building a report by hand.',
  },
  {
    id: 'new-service',
    label: 'A new service or product idea',
    description: 'There is an idea that needs to become a working product.',
  },
];

export const CHALLENGE_CATEGORY_IDS = CHALLENGE_CATEGORIES.map((c) => c.id);

export const CONSEQUENCES = [
  { id: 'delay', label: 'Things take too long' },
  { id: 'mistakes', label: 'Mistakes and rework' },
  { id: 'missed-revenue', label: 'Missed revenue or opportunities' },
  { id: 'visibility', label: 'Poor visibility into what is happening' },
  { id: 'frustration', label: 'Staff frustration and turnover' },
];

export const CONSEQUENCE_IDS = CONSEQUENCES.map((c) => c.id);

/**
 * Two plain-language solution patterns per friction category. These describe
 * approaches Dan has actually built, not products for sale.
 */
export const SOLUTION_PATTERNS = {
  admin: [
    {
      title: 'A guided internal tool',
      body: 'Replace the manual steps with one form and one clear queue, so the work happens the same way every time and nothing is retyped.',
    },
    {
      title: 'Targeted automation',
      body: 'Automate only the predictable parts — reminders, status changes, document generation — and leave judgement to people.',
    },
  ],
  records: [
    {
      title: 'One structured record',
      body: 'Give each customer, property, member, or job a single record so information is found rather than searched for.',
    },
    {
      title: 'Import and connect what exists',
      body: 'Bring in the current spreadsheets and connect the tools you already pay for instead of starting over.',
    },
  ],
  communication: [
    {
      title: 'A central announcement and request channel',
      body: 'Publish updates once and let people check status themselves, which is the pattern behind Community Hive.',
    },
    {
      title: 'A self-serve answer library',
      body: 'Document the repeat questions where people actually look, so staff stop answering them individually.',
    },
  ],
  scheduling: [
    {
      title: 'A booking and availability view',
      body: 'Show real availability and let people book within your rules, with confirmations handled automatically.',
    },
    {
      title: 'Coordination dashboard',
      body: 'Give the coordinator one screen showing conflicts, gaps, and pending confirmations.',
    },
  ],
  reporting: [
    {
      title: 'A live dashboard',
      body: 'Replace hand-built reports with a view that is always current, similar to the analytics dashboard work at Youneeq.',
    },
    {
      title: 'Scheduled summaries',
      body: 'Send the few numbers that matter to the people who need them, on a schedule, without anyone assembling them.',
    },
  ],
  'new-service': [
    {
      title: 'A small, real first version',
      body: 'Build the smallest version that a real user can complete end to end, then improve it with their feedback.',
    },
    {
      title: 'A validation prototype',
      body: 'Prove the risky assumption first with a working prototype before committing to a full build.',
    },
  ],
};

/**
 * Pure, client-side estimate. Returns a range and the assumptions behind it.
 */
export function estimateOpportunity({ people, hoursPerWeek, hourlyCost }) {
  const annualHours = people * hoursPerWeek * WORKING_WEEKS_PER_YEAR;
  const annualLabourCost = annualHours * hourlyCost;
  const recoverableHoursLow = annualHours * RECOVERY_LOW;
  const recoverableHoursHigh = annualHours * RECOVERY_HIGH;

  return {
    annualHours,
    annualLabourCost,
    recoverableHoursLow,
    recoverableHoursHigh,
    recoverableCostLow: recoverableHoursLow * hourlyCost,
    recoverableCostHigh: recoverableHoursHigh * hourlyCost,
    assumptions: {
      workingWeeks: WORKING_WEEKS_PER_YEAR,
      recoveryLow: RECOVERY_LOW,
      recoveryHigh: RECOVERY_HIGH,
      hourlyCost,
    },
  };
}

const wholeHours = (value) => Math.round(value);

export function formatHours(value) {
  return `${wholeHours(value).toLocaleString('en-CA')} hours`;
}

export function formatCad(value) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

/**
 * Build the plain-language summary the visitor can copy, print, or send.
 */
export function buildChallengeSummary({ category, consequence, people, hoursPerWeek, hourlyCost }) {
  const categoryLabel =
    CHALLENGE_CATEGORIES.find((c) => c.id === category)?.label ?? 'An operational problem';
  const consequenceLabel =
    CONSEQUENCES.find((c) => c.id === consequence)?.label ?? 'It causes friction';
  const estimate = estimateOpportunity({ people, hoursPerWeek, hourlyCost });

  return [
    `Main friction: ${categoryLabel}.`,
    `Main consequence: ${consequenceLabel}.`,
    `${people} ${people === 1 ? 'person' : 'people'} spend about ${hoursPerWeek} ${
      hoursPerWeek === 1 ? 'hour' : 'hours'
    } per week on this, which is roughly ${formatHours(
      estimate.annualHours
    )} per year at ${WORKING_WEEKS_PER_YEAR} working weeks.`,
    `If a focused workflow recovered ${Math.round(RECOVERY_LOW * 100)}–${Math.round(
      RECOVERY_HIGH * 100
    )}% of that time, the opportunity would be roughly ${formatHours(
      estimate.recoverableHoursLow
    )} to ${formatHours(estimate.recoverableHoursHigh)} per year.`,
    `At an assumed ${formatCad(hourlyCost)} per hour that is about ${formatCad(
      estimate.recoverableCostLow
    )} to ${formatCad(estimate.recoverableCostHigh)} per year, before considering fewer errors or faster follow-up.`,
    'This is an estimate based on the numbers entered above. It is not a quote and not a guaranteed saving.',
  ].join('\n\n');
}

/** Validation shape shared by the client and the API route. */
export const challengeSchema = z.object({
  category: z.enum(CHALLENGE_CATEGORY_IDS),
  consequence: z.enum(CONSEQUENCE_IDS),
  people: z.number().int().min(1).max(500),
  hoursPerWeek: z.number().min(0.25).max(80),
  hourlyCost: z.number().min(15).max(500),
  summary: z.string().min(1).max(2000),
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  organization: z.string().max(160).optional().or(z.literal('')),
  notes: z.string().max(2000).optional().or(z.literal('')),
  consentToContact: z.literal(true, {
    errorMap: () => ({ message: 'Please confirm you would like Dan to reply.' }),
  }),
  // Honeypot. Deliberately permissive so a filled value reaches the route and
  // can be answered with a silent success instead of a validation error that
  // would tell a bot exactly which field gave it away.
  website: z.string().max(200).optional(),
});
