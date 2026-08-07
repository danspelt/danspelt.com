'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import {
  CHALLENGE_CATEGORIES,
  CONSEQUENCES,
  DEFAULT_HOURLY_COST,
} from '@/lib/business-challenge';
import ChallengeResult from './ChallengeResult';

const TOTAL_STEPS = 4;

const initialAnswers = {
  category: '',
  people: 3,
  hoursPerWeek: 2,
  hourlyCost: DEFAULT_HOURLY_COST,
  consequence: '',
};

export default function BusinessChallengeFinder() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState(initialAnswers);
  const [error, setError] = useState(null);
  const [started, setStarted] = useState(false);
  const headingRef = useRef(null);
  const isFirstRender = useRef(true);

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

  const markStarted = useCallback(() => {
    if (started) return;
    setStarted(true);
    trackEvent('challenge_started', { entry_point: 'homepage' });
  }, [started]);

  const goNext = useCallback(() => {
    if (step === 1 && !answers.category) {
      setError('Please choose the friction that fits best.');
      return;
    }
    if (step === 2) {
      if (!Number.isFinite(answers.people) || answers.people < 1 || answers.people > 500) {
        setError('Enter how many people do this work, between 1 and 500.');
        return;
      }
      if (!Number.isFinite(answers.hoursPerWeek) || answers.hoursPerWeek < 0.25 || answers.hoursPerWeek > 80) {
        setError('Enter hours per week between 0.25 and 80.');
        return;
      }
      if (!Number.isFinite(answers.hourlyCost) || answers.hourlyCost < 15 || answers.hourlyCost > 500) {
        setError('Enter an hourly cost between $15 and $500.');
        return;
      }
    }
    if (step === 3 && !answers.consequence) {
      setError('Please choose the main consequence.');
      return;
    }

    setError(null);
    const next = step + 1;
    setStep(next);

    if (next === TOTAL_STEPS) {
      trackEvent('challenge_completed', { category: answers.category });
    }
  }, [step, answers]);

  const goBack = useCallback(() => {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  }, []);

  const stepTitles = {
    1: 'What is slowing things down?',
    2: 'How much time does it take?',
    3: 'What does it cost you?',
    4: 'Here is the opportunity',
  };

  return (
    <section
      id="challenge-finder"
      aria-labelledby="challenge-finder-heading"
      className="scroll-mt-20 border-b border-border/60"
    >
      <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-20">
        <div className="max-w-2xl mb-8">
          <h2 id="challenge-finder-heading" className="text-3xl sm:text-4xl font-semibold mb-3">
            Business Challenge Finder
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Tell me the friction, and I will show you what it is costing and how I would adapt a
            solution to your workflow. Everything is calculated in your browser — nothing is sent
            unless you choose to send it.
          </p>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card/60 p-5 sm:p-7 glass shadow-2xl">
          <p className="text-sm font-medium text-muted-foreground mb-2">
            Step {step} of {TOTAL_STEPS}
          </p>
          <h3
            ref={headingRef}
            tabIndex={-1}
            className="text-2xl font-semibold mb-6 focus-ring rounded-md"
          >
            {stepTitles[step]}
          </h3>

          {step === 1 && (
            <fieldset onChange={markStarted}>
              <legend className="sr-only">Choose the main friction</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CHALLENGE_CATEGORIES.map((option) => {
                  const selected = answers.category === option.id;
                  return (
                    <label
                      key={option.id}
                      className={cn(
                        'depth-card flex gap-3 rounded-xl border p-4 cursor-pointer glow-ring',
                        selected ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted/60'
                      )}
                    >
                      <input
                        type="radio"
                        name="challenge-category"
                        value={option.id}
                        checked={selected}
                        onChange={() => update({ category: option.id })}
                        className="mt-1 focus-ring"
                      />
                      <span>
                        <span className="block font-medium">{option.label}</span>
                        <span className="block text-sm text-muted-foreground leading-relaxed">
                          {option.description}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label htmlFor="challenge-people" className="block text-sm font-medium mb-1">
                  People doing this work
                </label>
                <input
                  id="challenge-people"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={500}
                  step={1}
                  value={answers.people}
                  onChange={(e) => update({ people: Number.parseInt(e.target.value, 10) })}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 focus-ring shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="challenge-hours" className="block text-sm font-medium mb-1">
                  Hours per week, each
                </label>
                <input
                  id="challenge-hours"
                  type="number"
                  inputMode="decimal"
                  min={0.25}
                  max={80}
                  step={0.25}
                  value={answers.hoursPerWeek}
                  onChange={(e) => update({ hoursPerWeek: Number.parseFloat(e.target.value) })}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 focus-ring shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="challenge-cost" className="block text-sm font-medium mb-1">
                  Assumed hourly cost (CAD)
                </label>
                <input
                  id="challenge-cost"
                  type="number"
                  inputMode="numeric"
                  min={15}
                  max={500}
                  step={5}
                  value={answers.hourlyCost}
                  onChange={(e) => update({ hourlyCost: Number.parseFloat(e.target.value) })}
                  aria-describedby="challenge-cost-help"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 focus-ring shadow-sm"
                />
                <p id="challenge-cost-help" className="mt-1 text-xs text-muted-foreground">
                  Fully loaded cost, not salary. Edit this to match your situation.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <fieldset>
              <legend className="sr-only">Choose the main consequence</legend>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CONSEQUENCES.map((option) => {
                  const selected = answers.consequence === option.id;
                  return (
                    <label
                      key={option.id}
                      className={cn(
                        'depth-card flex items-center gap-3 rounded-xl border p-4 cursor-pointer glow-ring',
                        selected ? 'border-primary bg-primary/10' : 'border-border hover:bg-muted/60'
                      )}
                    >
                      <input
                        type="radio"
                        name="challenge-consequence"
                        value={option.id}
                        checked={selected}
                        onChange={() => update({ consequence: option.id })}
                        className="focus-ring"
                      />
                      <span className="font-medium">{option.label}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {step === TOTAL_STEPS && <ChallengeResult answers={answers} onBack={() => setStep(1)} />}

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
      </div>
    </section>
  );
}
