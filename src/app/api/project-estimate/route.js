import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  DATA_SOURCES,
  FEATURES,
  PROJECT_TYPES,
  SCALES,
  TIMELINES,
  estimateProject,
  estimateSchema,
  formatCad,
} from '@/lib/project-estimate';
import { consumeRateLimit, getClientKey } from '@/lib/rate-limit';

export const runtime = 'nodejs';

const escapeHtml = (str = '') =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const labelFor = (list, id) => list.find((item) => item.id === id)?.label ?? id;

const WINDOW_MS = 60 * 60 * 1000; // 1 hour

/** Loose ceiling on all requests, including malformed ones, to deter abuse. */
const MAX_REQUESTS_PER_WINDOW = 30;

/** Strict ceiling on actual emails sent, so typos never burn a send slot. */
const MAX_SENDS_PER_WINDOW = 5;

const tooMany = (retryAfterSeconds) =>
  NextResponse.json(
    { error: 'Too many submissions. Please try again later or email Dan directly.' },
    { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
  );

export async function POST(req) {
  try {
    const clientKey = getClientKey(req);

    const abuse = consumeRateLimit(`project-estimate:requests:${clientKey}`, {
      max: MAX_REQUESTS_PER_WINDOW,
      windowMs: WINDOW_MS,
    });
    if (abuse.limited) return tooMany(abuse.retryAfterSeconds);

    const data = await req.json();
    const parsed = estimateSchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', fields: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const {
      projectType,
      features,
      scale,
      dataSource,
      timeline,
      summary,
      name,
      email,
      organization,
      notes,
      website,
    } = parsed.data;

    // Honeypot triggered — report success without sending anything.
    if (website) {
      return NextResponse.json({ message: 'Received' }, { status: 200 });
    }

    // Only well-formed, genuine submissions count against the send quota.
    const send = consumeRateLimit(`project-estimate:sends:${clientKey}`, {
      max: MAX_SENDS_PER_WINDOW,
      windowMs: WINDOW_MS,
    });
    if (send.limited) return tooMany(send.retryAfterSeconds);

    const apiKey = (process.env.RESEND_API_KEY || process.env['﻿RESEND_API_KEY'] || '').trim();
    const from = (process.env.RESEND_FROM || process.env.RESEND_FROM_EMAIL || '').trim();
    const toEmail = (process.env.CONTACT_TO_EMAIL || 'danspelt24@gmail.com').trim();

    if (!apiKey || !from || !from.includes('@')) {
      console.error('Project estimate: email service is not configured', {
        hasApiKey: !!apiKey,
        hasFrom: !!from,
      });
      return NextResponse.json(
        { error: 'The contact service is temporarily unavailable. Please email Dan directly.' },
        { status: 500 }
      );
    }

    const typeLabel = labelFor(PROJECT_TYPES, projectType);
    const featureLabels =
      features.map((id) => labelFor(FEATURES, id)).join(', ') || 'core functionality only';
    const scaleLabel = labelFor(SCALES, scale);
    const dataLabel = labelFor(DATA_SOURCES, dataSource);
    const timelineLabel = labelFor(TIMELINES, timeline);

    // Recomputed server-side — never trust client-supplied numbers.
    const estimate = estimateProject({ projectType, features, scale, dataSource, timeline });
    const estimateText = estimate
      ? `${estimate.hoursLow}–${estimate.hoursHigh} hours, ${formatCad(
          estimate.costLow
        )}–${formatCad(estimate.costHigh)} CAD, roughly ${estimate.weeksLow}–${estimate.weeksHigh} weeks`
      : '(could not compute)';
    const timelineFlag = estimate?.timelineAtRisk
      ? 'Yes — ASAP timeline likely too tight for scope'
      : 'No';

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to: [toEmail],
      subject: `Project estimate request from ${name}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Organization: ${organization || '(not provided)'}`,
        '',
        `Project type: ${typeLabel}`,
        `Features: ${featureLabels}`,
        `Who uses it: ${scaleLabel}`,
        `Existing data: ${dataLabel}`,
        `Timeline: ${timelineLabel}`,
        `Computed range: ${estimateText}`,
        `Timeline at risk: ${timelineFlag}`,
        '',
        'Their summary:',
        summary,
        '',
        'Extra notes:',
        notes || '(none)',
      ].join('\n'),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Project Cost Estimator submission</h2>
          <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
          <p><strong>Organization:</strong> ${escapeHtml(organization || '(not provided)')}</p>
          <p><strong>Project type:</strong> ${escapeHtml(typeLabel)}</p>
          <p><strong>Features:</strong> ${escapeHtml(featureLabels)}</p>
          <p><strong>Who uses it:</strong> ${escapeHtml(scaleLabel)}</p>
          <p><strong>Existing data:</strong> ${escapeHtml(dataLabel)}</p>
          <p><strong>Timeline:</strong> ${escapeHtml(timelineLabel)}</p>
          <p><strong>Computed range:</strong> ${escapeHtml(estimateText)}</p>
          <p><strong>Timeline at risk:</strong> ${escapeHtml(timelineFlag)}</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="white-space: pre-wrap;">${escapeHtml(summary)}</p>
          </div>
          <h3>Extra notes</h3>
          <p style="white-space: pre-wrap;">${escapeHtml(notes || '(none)')}</p>
        </div>
      `,
    });

    if (error) {
      console.error('Project estimate: send failed', { message: error.message });
      return NextResponse.json(
        { error: 'Failed to send. Please try again or email Dan directly.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Sent successfully' }, { status: 200 });
  } catch (err) {
    console.error('Project estimate: unexpected error', {
      message: err instanceof Error ? err.message : 'Unknown error',
    });
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email Dan directly.' },
      { status: 500 }
    );
  }
}
