// Shared logic for the Project Cost Estimator (/estimate).
//
// The estimate is computed entirely in the browser. Nothing is sent to the
// server until the visitor explicitly asks Dan to follow up. The API route
// imports the same helpers so client and server agree on shape and vocabulary.
//
// Every number here is a planning assumption, not a quote. The result is
// always shown as a range with the assumptions spelled out.

import { z } from 'zod';

/** Dan's development rate. Excludes hosting, domains, and third-party fees. */
export const HOURLY_RATE_CAD = 85;

/** Productive build hours per week used to translate hours into a timeline. */
export const HOURS_PER_WEEK = 25;

/** Range multipliers around the central hours estimate. */
export const RANGE_LOW = 0.85;
export const RANGE_HIGH = 1.35;

export const PROJECT_TYPES = [
  {
    id: 'website',
    label: 'Website with forms',
    description: 'A marketing or information site with contact, booking, or intake forms.',
    baseHours: 30,
  },
  {
    id: 'automation',
    label: 'Automation or integration',
    description: 'Connect existing tools, automate a repetitive process, or sync data between systems.',
    baseHours: 40,
  },
  {
    id: 'internal-tool',
    label: 'Internal tool',
    description: 'A private app for your team: a queue, tracker, scheduler, or record system.',
    baseHours: 60,
  },
  {
    id: 'customer-portal',
    label: 'Customer or member portal',
    description: 'A sign-in area where customers, members, or residents see their own information and make requests.',
    baseHours: 100,
  },
  {
    id: 'mobile-pwa',
    label: 'Mobile-friendly app (PWA)',
    description: 'An installable, offline-tolerant app that works on phones and tablets without an app store.',
    baseHours: 120,
  },
  {
    id: 'saas-mvp',
    label: 'SaaS product (first version)',
    description: 'A multi-customer product with accounts, billing, and the smallest feature set a real user can complete.',
    baseHours: 160,
  },
];

export const PROJECT_TYPE_IDS = PROJECT_TYPES.map((t) => t.id);

export const FEATURES = [
  { id: 'auth', label: 'Accounts, sign-in, and roles', hours: 20 },
  { id: 'admin', label: 'Admin panel', hours: 20 },
  { id: 'notifications', label: 'Email or SMS notifications', hours: 12 },
  { id: 'uploads', label: 'File or photo uploads', hours: 10 },
  { id: 'payments', label: 'Payments or subscriptions', hours: 24 },
  { id: 'scheduling', label: 'Scheduling or calendar', hours: 24 },
  { id: 'reporting', label: 'Reporting dashboard or exports', hours: 24 },
  { id: 'integration', label: 'Third-party integration (per system)', hours: 20 },
  { id: 'ai', label: 'AI assistant or summaries', hours: 24 },
  { id: 'multi-tenant', label: 'Multiple organizations (multi-tenant)', hours: 40 },
  { id: 'accessibility', label: 'Accessibility review (WCAG 2.1 AA)', hours: 16 },
];

export const FEATURE_IDS = FEATURES.map((f) => f.id);

export const SCALES = [
  { id: 'team', label: 'A small team (under 10 people)', multiplier: 1.0 },
  { id: 'organization', label: 'An organization (10 to 200 people)', multiplier: 1.15 },
  { id: 'public', label: 'The public or many organizations (200+)', multiplier: 1.3 },
];

export const SCALE_IDS = SCALES.map((s) => s.id);

export const DATA_SOURCES = [
  { id: 'none', label: 'Starting fresh, nothing to migrate', hours: 0 },
  { id: 'spreadsheets', label: 'Spreadsheets or documents to import', hours: 12 },
  { id: 'legacy', label: 'An existing system or database to migrate from', hours: 30 },
];

export const DATA_SOURCE_IDS = DATA_SOURCES.map((d) => d.id);

export const TIMELINES = [
  { id: 'flexible', label: 'Flexible, quality first', multiplier: 1.0 },
  { id: 'two-months', label: 'Within about two months', multiplier: 1.1 },
  { id: 'asap', label: 'As soon as possible (under a month)', multiplier: 1.25 },
];

export const TIMELINE_IDS = TIMELINES.map((t) => t.id);

const byId = (list, id) => list.find((item) => item.id === id);

const roundTo = (value, step) => Math.round(value / step) * step;

/**
 * Pure, client-side estimate. Returns hour, cost, and timeline ranges plus the
 * assumptions behind them. Costs are rounded to the nearest $500.
 */
export function estimateProject({ projectType, features = [], scale, dataSource, timeline }) {
  const type = byId(PROJECT_TYPES, projectType);
  const scaleOption = byId(SCALES, scale);
  const dataOption = byId(DATA_SOURCES, dataSource);
  const timelineOption = byId(TIMELINES, timeline);
  if (!type || !scaleOption || !dataOption || !timelineOption) return null;

  const featureHours = features.reduce((sum, id) => sum + (byId(FEATURES, id)?.hours ?? 0), 0);
  const centralHours =
    (type.baseHours + featureHours + dataOption.hours) *
    scaleOption.multiplier *
    timelineOption.multiplier;

  const hoursLow = Math.round(centralHours * RANGE_LOW);
  const hoursHigh = Math.round(centralHours * RANGE_HIGH);

  return {
    hoursLow,
    hoursHigh,
    costLow: roundTo(hoursLow * HOURLY_RATE_CAD, 500),
    costHigh: roundTo(hoursHigh * HOURLY_RATE_CAD, 500),
    weeksLow: Math.max(1, Math.round(hoursLow / HOURS_PER_WEEK)),
    weeksHigh: Math.max(1, Math.round(hoursHigh / HOURS_PER_WEEK)),
    // An "ASAP" request only fits if the high end lands inside four weeks.
    timelineAtRisk: timeline === 'asap' && hoursHigh / HOURS_PER_WEEK > 4,
    assumptions: {
      hourlyRate: HOURLY_RATE_CAD,
      hoursPerWeek: HOURS_PER_WEEK,
      baseHours: type.baseHours,
      featureHours,
      dataHours: dataOption.hours,
      scaleMultiplier: scaleOption.multiplier,
      timelineMultiplier: timelineOption.multiplier,
    },
  };
}

export function formatCad(value) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

/**
 * Plain-language summary the visitor can copy or send to Dan.
 */
export function buildEstimateSummary(input) {
  const estimate = estimateProject(input);
  if (!estimate) return '';
  const type = byId(PROJECT_TYPES, input.projectType);
  const featureLabels = (input.features ?? [])
    .map((id) => byId(FEATURES, id)?.label)
    .filter(Boolean);

  return [
    `Project type: ${type.label}.`,
    `Features: ${featureLabels.length ? featureLabels.join(', ') : 'core functionality only'}.`,
    `Who uses it: ${byId(SCALES, input.scale).label}. Existing data: ${byId(DATA_SOURCES, input.dataSource).label}. Timeline: ${byId(TIMELINES, input.timeline).label}.`,
    `Estimated effort: ${estimate.hoursLow} to ${estimate.hoursHigh} hours, roughly ${estimate.weeksLow} to ${estimate.weeksHigh} weeks at about ${HOURS_PER_WEEK} build hours per week.`,
    `Estimated development cost: ${formatCad(estimate.costLow)} to ${formatCad(estimate.costHigh)} CAD at ${formatCad(HOURLY_RATE_CAD)} per hour. Hosting, domains, and third-party fees are extra.`,
    'This is a planning estimate based on the options selected above. It is not a quote. A fixed price follows a short scoping conversation.',
  ].join('\n\n');
}

/** Validation shape shared by the client and the API route. */
export const estimateSchema = z.object({
  projectType: z.enum(PROJECT_TYPE_IDS),
  features: z.array(z.enum(FEATURE_IDS)).max(FEATURE_IDS.length),
  scale: z.enum(SCALE_IDS),
  dataSource: z.enum(DATA_SOURCE_IDS),
  timeline: z.enum(TIMELINE_IDS),
  summary: z.string().min(1).max(2000),
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  organization: z.string().max(160).optional().or(z.literal('')),
  notes: z.string().max(2000).optional().or(z.literal('')),
  consentToContact: z.literal(true, {
    errorMap: () => ({ message: 'Please confirm you would like Dan to reply.' }),
  }),
  // Honeypot. Permissive on purpose so a filled value reaches the route and is
  // answered with a silent success rather than a revealing validation error.
  website: z.string().max(200).optional(),
});
