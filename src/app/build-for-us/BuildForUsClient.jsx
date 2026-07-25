"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, Clipboard, ExternalLink, Mail, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const questions = [
  {
    id: "organization",
    question: "What kind of organization are you?",
    options: ["Senior living", "Non-profit housing or co-op", "Faith community", "Sports organization", "Small business", "Other community organization"],
  },
  {
    id: "time",
    question: "What consumes too much staff or volunteer time?",
    options: ["Answering the same questions", "Coordinating schedules", "Following up manually", "Managing forms and registrations", "Sharing updates across many channels"],
  },
  {
    id: "tracking",
    question: "What information is difficult to track?",
    options: ["Requests and follow-ups", "Members, residents, or customers", "Events and attendance", "Tasks and approvals", "Documents and policies"],
  },
  {
    id: "communication",
    question: "Where does communication break down?",
    options: ["People miss important updates", "Information is scattered", "Updates are not accessible to everyone", "Teams do not know who owns the next step", "Families, clients, or members feel out of the loop"],
  },
];

const solutions = {
  "Senior living": "an accessible resident and family communications hub",
  "Non-profit housing or co-op": "a resident request and building communications portal",
  "Faith community": "a volunteer, event, and member communications hub",
  "Sports organization": "a team scheduling and parent communications portal",
  "Small business": "a customer operations dashboard that removes manual follow-up",
  "Other community organization": "a community operations and communications portal",
};

const benefits = {
  "Answering the same questions": "Give people one dependable place to find clear, current answers.",
  "Coordinating schedules": "Replace back-and-forth messages with shared schedules, reminders, and clear ownership.",
  "Following up manually": "Make the next step visible so requests do not get lost between people or inboxes.",
  "Managing forms and registrations": "Turn paper or ad-hoc forms into a simple, trackable workflow.",
  "Sharing updates across many channels": "Publish an update once and reach the right people through an accessible, reliable channel.",
};

function OptionGroup({ question, value, onChange }) {
  return (
    <fieldset className="rounded-2xl border bg-card p-5">
      <legend className="px-1 text-base font-semibold">{question.question}</legend>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {question.options.map((option) => {
          const selected = value === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(question.id, option)}
              aria-pressed={selected}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${selected ? "border-primary bg-primary/10 text-foreground" : "border-border hover:border-primary/50 hover:bg-muted"}`}
            >
              <span className="flex items-start gap-3">
                <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${selected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"}`}>
                  {selected && <Check className="h-3 w-3" aria-hidden="true" />}
                </span>
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function BuildForUsClient() {
  const [answers, setAnswers] = useState({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const sharedAnswers = Object.fromEntries(
      questions.flatMap(({ id, options }) => {
        const value = new URLSearchParams(window.location.search).get(id);
        return value && options.includes(value) ? [[id, value]] : [];
      })
    );
    if (Object.keys(sharedAnswers).length) setAnswers(sharedAnswers);
  }, []);

  const complete = questions.every((question) => answers[question.id]);

  const plan = useMemo(() => {
    if (!complete) return null;
    const accessibilityNeed = answers.communication === "Updates are not accessible to everyone";
    return {
      project: solutions[answers.organization],
      benefit: benefits[answers.time],
      example: accessibilityNeed
        ? { label: "Accessibility work", href: "/accessibility", detail: "Use inclusive design and practical WCAG knowledge to make updates work for more people." }
        : { label: "Custom software approach", href: "/custom-software", detail: "Start with the real workflow, identify the smallest useful first release, then improve it with the people who use it." },
    };
  }, [answers, complete]);

  const setAnswer = (id, value) => setAnswers((current) => ({ ...current, [id]: value }));

  const share = async () => {
    const url = new URL(window.location.href);
    Object.entries(answers).forEach(([key, value]) => url.searchParams.set(key, value));
    const shareData = { title: "What could Dan build for us?", text: "Here is a practical software idea for our organization.", url: url.toString() };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(url.toString());
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2500);
      }
    } catch (error) {
      if (error.name !== "AbortError") setCopied(false);
    }
  };

  const discussionHref = plan
    ? `mailto:danspelt24@gmail.com?subject=${encodeURIComponent("Discussing a software idea")}&body=${encodeURIComponent(`I used the solution planner. We are a ${answers.organization.toLowerCase()} and would like to discuss ${plan.project}. Our biggest challenge is: ${answers.time}.`)}`
    : "/contact";

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"><Sparkles className="h-4 w-4" /> Practical software, starting with your real problem</p>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">What could Dan build for us?</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Answer four quick questions to explore a practical first project. This is a starting point for a conversation, not a generic software pitch.</p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(19rem,0.78fr)]">
        <div className="space-y-5">
          {questions.map((question) => <OptionGroup key={question.id} question={question} value={answers[question.id]} onChange={setAnswer} />)}
          <Button type="button" variant="ghost" onClick={() => setAnswers({})} className="gap-2"><RefreshCw className="h-4 w-4" /> Start over</Button>
        </div>

        <aside className="h-fit rounded-2xl border border-primary/20 bg-card p-6 shadow-sm lg:sticky lg:top-24">
          {!plan ? (
            <div className="py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"><Sparkles className="h-6 w-6" /></div>
              <h2 className="mt-5 text-xl font-bold">Your outline will appear here</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Choose one answer in each section to create a focused idea you can share with your team.</p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">Your practical starting point</p>
              <h2 className="mt-3 text-2xl font-bold capitalize">Build {plan.project}</h2>
              <div className="mt-6 space-y-5 text-sm leading-relaxed">
                <div><h3 className="font-semibold text-foreground">First project</h3><p className="mt-1 text-muted-foreground">A focused first release that helps with {answers.time.toLowerCase()} and makes {answers.tracking.toLowerCase()} easier to see and act on.</p></div>
                <div><h3 className="font-semibold text-foreground">Practical benefit</h3><p className="mt-1 text-muted-foreground">{plan.benefit}</p></div>
                <div><h3 className="font-semibold text-foreground">Relevant experience</h3><p className="mt-1 text-muted-foreground">{plan.example.detail}</p><Link href={plan.example.href} className="mt-2 inline-flex items-center gap-1 font-medium text-primary hover:underline">Explore {plan.example.label} <ExternalLink className="h-3.5 w-3.5" /></Link></div>
              </div>
              <div className="mt-7 grid gap-3">
                <Button type="button" onClick={share} variant="outline" className="gap-2"><Clipboard className="h-4 w-4" /> {copied ? "Link copied" : "Share with my team"}</Button>
                <Button asChild className="gap-2">{plan ? <a href={discussionHref}><Mail className="h-4 w-4" /> Discuss this with Dan</a> : <Link href={discussionHref}><Mail className="h-4 w-4" /> Discuss this with Dan</Link>}</Button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
