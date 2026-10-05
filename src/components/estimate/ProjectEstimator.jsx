'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Copy, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import {
  DATA_SOURCES,
  FEATURES,
  PROJECT_TYPES,
  SCALES,
  TIMELINES,
  buildEstimateSummary,
  estimateProject,
  formatCad,
} from '@/lib/project-estimate';

const TOTAL_STEPS = 5;

const initialAnswers = {
  projectType: '',
  features: [],
  scale: '',
  dataSource: '',
  timeline: '',
};

const initialForm = {
  name: '',
  email: '',
  organization: '',
  notes: '',
  consentToContact: false,
  website: '',
};

function OptionCard({ name, type = 'radio', value, checked, onChange, label, description }) {
  return (
    <label
      className={cn(
        'depth-card flex gap-3 rounded-xl border p-4 cursor-pointer glow-ring',
        checked ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted/60'
      )}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-1 focus-ring"
      />
      <span>
        <span className="block font-medium">{label}</span>
        {description && (
          <span className="block text-sm text-muted-foreground leading-relaxed">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}

export default function ProjectEstimator() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState(initialAnswers);
  const [error, setError] = useState(null);
  const [started, setStarted] = useState(false);
  const headingRef = useRef(null);
  const isFirstRender = useRef(true);

  const estimate = useMemo(() => estimateProject(answers), [answers]);
  const summary = useMemo(() => buildEstimateSummary(answers), [answers]);

  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);

  // Move focus to the step heading so screen reader users hear the new step,
  // but never steal focus on the initial render.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  const update = useCallback((patch) => {
    setAnswers((prev) => ({ ...prev, ...patch }));
    setError(null);
  }, []);

  const toggleFeature = useCallback((id) => {
    setAnswers((prev) => ({
      ...prev,
      features: prev.features.includes(id)
        ? prev.features.filter((f) => f !== id)
        : [...prev.features, id],
    }));
    setError(null);
  }, []);

  const markStarted = useCallback(() => {
    if (started) return;
    setStarted(true);
    trackEvent('estimate_started', { entry_point: 'estimate_page' });
  }, [started]);

  const goNext = useCallback(() => {
    if (step === 1 && !answers.projectType) {
      setError('Please choose the project type that fits best.');
      return;
    }
    if (step === 3) {
      if (!answers.scale) {
        setError('Please choose who will use it.');
        return;
      }
      if (!answers.dataSource) {
        setError('Please choose whether there is existing data.');
        return;
      }
    }
    if (step === 4 && !answers.timeline) {
      setError('Please choose a timeline.');
      return;
    }

    setError(null);
    const next = step + 1;
    setStep(next);

    if (next === TOTAL_STEPS) {
      trackEvent('estimate_completed', { project_type: answers.projectType });
    }
  }, [step, answers]);

  const goBack = useCallback(() => {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setFormError('Copying is blocked in this browser. You can select the summary text manually.');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting || submitted) return;

    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nextErrors.email = 'Please enter a valid email address.';
    if (!form.consentToContact)
      nextErrors.consentToContact = 'Please confirm you would like Dan to reply.';

    setFormErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch('/api/project-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType: answers.projectType,
          features: answers.features,
          scale: answers.scale,
          dataSource: answers.dataSource,
          timeline: answers.timeline,
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
        trackEvent('estimate_sent', { project_type: answers.projectType });
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

  const stepTitles = {
    1: 'What kind of project is it?',
    2: 'Which features do you need?',
    3: 'Who will use it, and is there existing data?',
    4: 'When do you need it?',
    5: 'Your ballpark estimate',
  };

  return (
    <div className="rounded-2xl border border-border/70 bg-card/60 p-5 sm:p-7 glass shadow-2xl">
      <p className="text-sm font-medium text-muted-foreground mb-2">
        Step {step} of {TOTAL_STEPS}
      </p>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl font-semibold mb-6 focus-ring rounded-md"
      >
        {stepTitles[step]}
      </h2>

      {step === 1 && (
        <fieldset onChange={markStarted}>
          <legend className="sr-only">Choose the project type</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROJECT_TYPES.map((option) => (
              <OptionCard
                key={option.id}
                name="estimate-project-type"
                value={option.id}
                checked={answers.projectType === option.id}
                onChange={() => update({ projectType: option.id })}
                label={option.label}
                description={option.description}
              />
            ))}
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset onChange={markStarted}>
          <legend className="sr-only">Choose the features you need</legend>
          <p className="text-sm text-muted-foreground mb-4">
            Choose as many as apply — or none if the core project covers it.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURES.map((option) => (
              <OptionCard
                key={option.id}
                type="checkbox"
                name="estimate-features"
                value={option.id}
                checked={answers.features.includes(option.id)}
                onChange={() => toggleFeature(option.id)}
                label={option.label}
              />
            ))}
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <div className="space-y-7" onChange={markStarted}>
          <fieldset>
            <legend className="text-sm font-medium mb-3">Who will use it?</legend>
            <div className="grid grid-cols-1 gap-3">
              {SCALES.map((option) => (
                <OptionCard
                  key={option.id}
                  name="estimate-scale"
                  value={option.id}
                  checked={answers.scale === option.id}
                  onChange={() => update({ scale: option.id })}
                  label={option.label}
                />
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-sm font-medium mb-3">
              Is there existing data to bring over?
            </legend>
            <div className="grid grid-cols-1 gap-3">
              {DATA_SOURCES.map((option) => (
                <OptionCard
                  key={option.id}
                  name="estimate-data-source"
                  value={option.id}
                  checked={answers.dataSource === option.id}
                  onChange={() => update({ dataSource: option.id })}
                  label={option.label}
                />
              ))}
            </div>
          </fieldset>
        </div>
      )}

      {step === 4 && (
        <fieldset onChange={markStarted}>
          <legend className="sr-only">Choose a timeline</legend>
          <div className="grid grid-cols-1 gap-3">
            {TIMELINES.map((option) => (
              <OptionCard
                key={option.id}
                name="estimate-timeline"
                value={option.id}
                checked={answers.timeline === option.id}
                onChange={() => update({ timeline: option.id })}
                label={option.label}
              />
            ))}
          </div>
        </fieldset>
      )}

      {step === TOTAL_STEPS && estimate && (
        <div className="space-y-8">
          <div className="rounded-xl border border-border/70 bg-card p-5 sm:p-6">
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <div>
                <dt className="text-sm text-muted-foreground">Estimated cost (CAD)</dt>
                <dd className="text-2xl font-semibold">
                  {formatCad(estimate.costLow)} – {formatCad(estimate.costHigh)}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Estimated effort</dt>
                <dd className="text-2xl font-semibold">
                  {estimate.hoursLow} – {estimate.hoursHigh} hours
                </dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Roughly</dt>
                <dd className="text-2xl font-semibold">
                  {estimate.weeksLow} – {estimate.weeksHigh} weeks
                </dd>
              </div>
            </dl>

            <details className="mb-5">
              <summary className="text-sm font-medium cursor-pointer rounded-md focus-ring">
                Assumptions behind this range
              </summary>
              <ul className="mt-3 text-sm text-muted-foreground leading-relaxed list-disc pl-5 space-y-1">
                <li>{formatCad(estimate.assumptions.hourlyRate)} per hour</li>
                <li>About {estimate.assumptions.hoursPerWeek} build hours per week</li>
                <li>Base scope: {estimate.assumptions.baseHours} hours</li>
                <li>Selected features: {estimate.assumptions.featureHours} hours</li>
                <li>Existing data: {estimate.assumptions.dataHours} hours</li>
                <li>Scale multiplier: ×{estimate.assumptions.scaleMultiplier}</li>
                <li>Timeline multiplier: ×{estimate.assumptions.timelineMultiplier}</li>
              </ul>
            </details>

            {estimate.timelineAtRisk && (
              <p className="text-sm leading-relaxed mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
                A timeline under a month is unlikely to fit this scope. If you send this estimate,
                Dan will suggest a phased first version that delivers the core sooner.
              </p>
            )}

            <p className="text-sm text-muted-foreground leading-relaxed">
              This is a planning estimate, not a quote. Hosting, domains, and third-party fees are
              extra. A fixed price follows a short scoping conversation.
            </p>
          </div>

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
                {copied ? 'Copied' : 'Copy estimate'}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setStep(1)}>
                Change my answers
              </Button>
            </div>
            <p aria-live="polite" className="sr-only">
              {copied ? 'Estimate copied to the clipboard.' : ''}
            </p>
          </div>

          {!submitted && (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-xl border border-border/70 bg-card p-5 sm:p-6 space-y-4"
            >
              <h3 className="text-xl font-semibold">Send this estimate to Dan</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sending is optional. Nothing above has left your browser yet. Please do not include
                customer names, health information, passwords, or internal financial documents.
              </p>

              <div>
                <label htmlFor="estimate-name" className="block text-sm font-medium mb-1">
                  Your name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="estimate-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  aria-invalid={Boolean(formErrors.name)}
                  aria-describedby={formErrors.name ? 'estimate-name-error' : undefined}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 focus-ring"
                />
                {formErrors.name && (
                  <p id="estimate-name-error" role="alert" className="mt-1 text-sm text-destructive">
                    {formErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="estimate-email" className="block text-sm font-medium mb-1">
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="estimate-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  aria-invalid={Boolean(formErrors.email)}
                  aria-describedby={formErrors.email ? 'estimate-email-error' : undefined}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 focus-ring"
                />
                {formErrors.email && (
                  <p id="estimate-email-error" role="alert" className="mt-1 text-sm text-destructive">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="estimate-org" className="block text-sm font-medium mb-1">
                  Organization (optional)
                </label>
                <input
                  id="estimate-org"
                  type="text"
                  autoComplete="organization"
                  value={form.organization}
                  onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 focus-ring"
                />
              </div>

              <div>
                <label htmlFor="estimate-notes" className="block text-sm font-medium mb-1">
                  Anything to add (optional)
                </label>
                <textarea
                  id="estimate-notes"
                  rows={4}
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 focus-ring"
                />
              </div>

              {/* Honeypot: hidden from people and assistive technology. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="estimate-website">Website</label>
                <input
                  id="estimate-website"
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
                    id="estimate-consent"
                    type="checkbox"
                    checked={form.consentToContact}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, consentToContact: e.target.checked }))
                    }
                    aria-invalid={Boolean(formErrors.consentToContact)}
                    aria-describedby={
                      formErrors.consentToContact ? 'estimate-consent-error' : undefined
                    }
                    className="mt-1 focus-ring"
                  />
                  <label htmlFor="estimate-consent" className="text-sm leading-relaxed">
                    Send this estimate to Dan and reply to me by email.{' '}
                    <span aria-hidden="true">*</span>
                  </label>
                </div>
                {formErrors.consentToContact && (
                  <p
                    id="estimate-consent-error"
                    role="alert"
                    className="mt-1 text-sm text-destructive"
                  >
                    {formErrors.consentToContact}
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
              <p className="text-sm leading-relaxed mb-4">
                Dan has your estimate and will reply to the email address you gave. Your answers are
                still on screen above if you would like to copy them.
              </p>
              <Button asChild variant="outline">
                <Link href="/contact?intent=estimate">Tell Dan more about the project</Link>
              </Button>
            </div>
          )}
        </div>
      )}

      {error && (
        <p role="alert" className="mt-5 text-sm text-destructive">
          {error}
        </p>
      )}

      {step < TOTAL_STEPS && (
        <div className="flex flex-col sm:flex-row gap-3 mt-7">
          {step > 1 && (
            <Button type="button" variant="outline" onClick={goBack} className="btn-3d">
              <ArrowLeft className="mr-2 w-4 h-4" aria-hidden="true" />
              Back
            </Button>
          )}
          <Button
            type="button"
            onClick={() => {
              markStarted();
              goNext();
            }}
            className="btn-3d"
          >
            {step === TOTAL_STEPS - 1 ? 'Show my estimate' : 'Continue'}
            <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
          </Button>
        </div>
      )}
    </div>
  );
}
