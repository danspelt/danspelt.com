'use client';

import { useMemo, useState } from 'react';
import { Check, Copy, Printer, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';
import {
  RECOVERY_HIGH,
  RECOVERY_LOW,
  SOLUTION_PATTERNS,
  WORKING_WEEKS_PER_YEAR,
  buildChallengeSummary,
  estimateOpportunity,
  formatCad,
  formatHours,
} from '@/lib/business-challenge';

const percent = (value) => `${Math.round(value * 100)}%`;

export default function ChallengeResult({ answers, onBack }) {
  const { category, consequence, people, hoursPerWeek, hourlyCost } = answers;

  const estimate = useMemo(
    () => estimateOpportunity({ people, hoursPerWeek, hourlyCost }),
    [people, hoursPerWeek, hourlyCost]
  );
  const summary = useMemo(() => buildChallengeSummary(answers), [answers]);
  const patterns = SOLUTION_PATTERNS[category] ?? [];

  const [copied, setCopied] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    organization: '',
    notes: '',
    consentToContact: false,
    website: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setFormError('Copying is blocked in this browser. You can select the summary text manually.');
    }
  }

  function openContact() {
    setShowContact(true);
    trackEvent('contact_started', { source: 'challenge_finder', path: 'business' });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting || submitted) return;

    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Please enter a valid email address.';
    if (!form.consentToContact) nextErrors.consentToContact = 'Please confirm you would like Dan to reply.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch('/api/business-challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          consequence,
          people,
          hoursPerWeek,
          hourlyCost,
          summary,
          name: form.name.trim(),
          email: form.email.trim(),
          organization: form.organization.trim(),
          notes: form.notes.trim(),
          consentToContact: true,
          website: form.website,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        trackEvent('contact_submitted', { source: 'challenge_finder', path: 'business' });
      } else {
        const data = await response.json().catch(() => ({}));
        setFormError(data.error || 'That did not send. Please try again or email Dan directly.');
      }
    } catch {
      setFormError('Network error. Please try again or email Dan directly.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-border/70 bg-card p-5 sm:p-6">
        <h3 className="text-xl font-semibold mb-4">Your estimated opportunity</h3>
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div>
            <dt className="text-sm text-muted-foreground">Time spent per year</dt>
            <dd className="text-2xl font-semibold">{formatHours(estimate.annualHours)}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">
              Possible recovery ({percent(RECOVERY_LOW)}–{percent(RECOVERY_HIGH)})
            </dt>
            <dd className="text-2xl font-semibold">
              {formatHours(estimate.recoverableHoursLow)} – {formatHours(estimate.recoverableHoursHigh)}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">At {formatCad(hourlyCost)} per hour</dt>
            <dd className="text-2xl font-semibold">
              {formatCad(estimate.recoverableCostLow)} – {formatCad(estimate.recoverableCostHigh)}
            </dd>
          </div>
        </dl>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Assumptions: {people} {people === 1 ? 'person' : 'people'} × {hoursPerWeek}{' '}
          {hoursPerWeek === 1 ? 'hour' : 'hours'} per week × {WORKING_WEEKS_PER_YEAR} working weeks, at an
          assumed {formatCad(hourlyCost)} per hour. This is an estimate from the numbers you entered. It is
          not a quote and not a guaranteed saving.
        </p>
      </div>

      {patterns.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Two ways this is usually solved</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {patterns.map((pattern) => (
              <div key={pattern.title} className="rounded-xl border border-border/70 bg-card p-5">
                <h4 className="font-semibold mb-2">{pattern.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{pattern.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold mb-3">Your summary</h3>
        <div className="rounded-xl border border-border/70 bg-muted/40 p-5 whitespace-pre-line text-sm leading-relaxed">
          {summary}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button type="button" variant="outline" onClick={handleCopy}>
            {copied ? (
              <Check className="mr-2 w-4 h-4" aria-hidden="true" />
            ) : (
              <Copy className="mr-2 w-4 h-4" aria-hidden="true" />
            )}
            {copied ? 'Copied' : 'Copy summary'}
          </Button>
          <Button type="button" variant="outline" onClick={() => window.print()}>
            <Printer className="mr-2 w-4 h-4" aria-hidden="true" />
            Print
          </Button>
          <Button type="button" variant="ghost" onClick={onBack}>
            Change my answers
          </Button>
        </div>
        <p aria-live="polite" className="sr-only">
          {copied ? 'Summary copied to the clipboard.' : ''}
        </p>
      </div>

      {!showContact && !submitted && (
        <div className="rounded-xl border border-border/70 bg-card p-5 sm:p-6">
          <h3 className="text-xl font-semibold mb-2">Want Dan to look at this?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Sending is optional. Nothing above has left your browser yet.
          </p>
          <Button type="button" onClick={openContact}>
            <Send className="mr-2 w-4 h-4" aria-hidden="true" />
            Send this summary to Dan
          </Button>
        </div>
      )}

      {showContact && !submitted && (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-xl border border-border/70 bg-card p-5 sm:p-6 space-y-4"
        >
          <h3 className="text-xl font-semibold">Send this summary to Dan</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Please do not include customer names, health information, passwords, or internal financial
            documents.
          </p>

          <div>
            <label htmlFor="challenge-name" className="block text-sm font-medium mb-1">
              Your name <span aria-hidden="true">*</span>
            </label>
            <input
              id="challenge-name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'challenge-name-error' : undefined}
              className="w-full rounded-md border border-border bg-background px-3 py-2 focus-ring"
            />
            {errors.name && (
              <p id="challenge-name-error" role="alert" className="mt-1 text-sm text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="challenge-email" className="block text-sm font-medium mb-1">
              Email <span aria-hidden="true">*</span>
            </label>
            <input
              id="challenge-email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'challenge-email-error' : undefined}
              className="w-full rounded-md border border-border bg-background px-3 py-2 focus-ring"
            />
            {errors.email && (
              <p id="challenge-email-error" role="alert" className="mt-1 text-sm text-destructive">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="challenge-org" className="block text-sm font-medium mb-1">
              Organization (optional)
            </label>
            <input
              id="challenge-org"
              type="text"
              autoComplete="organization"
              value={form.organization}
              onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))}
              className="w-full rounded-md border border-border bg-background px-3 py-2 focus-ring"
            />
          </div>

          <div>
            <label htmlFor="challenge-notes" className="block text-sm font-medium mb-1">
              Anything to add (optional)
            </label>
            <textarea
              id="challenge-notes"
              rows={4}
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              className="w-full rounded-md border border-border bg-background px-3 py-2 focus-ring"
            />
          </div>

          {/* Honeypot: hidden from people and assistive technology. */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="challenge-website">Website</label>
            <input
              id="challenge-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
            />
          </div>

          <div>
            <div className="flex items-start gap-2">
              <input
                id="challenge-consent"
                type="checkbox"
                checked={form.consentToContact}
                onChange={(e) => setForm((f) => ({ ...f, consentToContact: e.target.checked }))}
                aria-invalid={Boolean(errors.consentToContact)}
                aria-describedby={errors.consentToContact ? 'challenge-consent-error' : undefined}
                className="mt-1 focus-ring"
              />
              <label htmlFor="challenge-consent" className="text-sm leading-relaxed">
                Send this summary to Dan and reply to me by email. <span aria-hidden="true">*</span>
              </label>
            </div>
            {errors.consentToContact && (
              <p id="challenge-consent-error" role="alert" className="mt-1 text-sm text-destructive">
                {errors.consentToContact}
              </p>
            )}
          </div>

          {formError && (
            <p role="alert" className="text-sm text-destructive">
              {formError}
            </p>
          )}

          <Button type="submit" disabled={submitting}>
            <Send className="mr-2 w-4 h-4" aria-hidden="true" />
            {submitting ? 'Sending…' : 'Send to Dan'}
          </Button>
        </form>
      )}

      {submitted && (
        <div
          role="status"
          className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 sm:p-6"
        >
          <h3 className="text-xl font-semibold mb-2">Sent. Thank you.</h3>
          <p className="text-sm leading-relaxed">
            Dan has your summary and will reply to the email address you gave. Your answers are still on
            screen above if you would like to copy or print them.
          </p>
        </div>
      )}
    </div>
  );
}
