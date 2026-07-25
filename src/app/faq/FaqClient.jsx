'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const faqs = [
  {
    question: 'What workplace accommodations do you need?',
    answer:
      'For remote roles I do not need employer-funded accommodations up front. I already have my keyboard and accessibility tools set up to work effectively.',
  },
  {
    question: 'How does cerebral palsy affect day-to-day work?',
    answer:
      'It affects motor skills, so I use adaptive input and may need a little more time for some physical tasks. I have successfully handled full-time roles and complex projects by pairing deep experience with AI-assisted delivery.',
  },
  {
    question: 'Can you work full-time hours?',
    answer:
      'Yes. I have demonstrated I can handle demanding schedules and responsibilities in full-time roles.',
  },
  {
    question: 'What kinds of work are you strongest in?',
    answer:
      'Full-stack web development — JavaScript, TypeScript, Next.js, React, MongoDB, Firebase, and related tooling. I lead delivery, improve UI/UX, optimize performance, and drive accessibility compliance.',
  },
  {
    question: 'How do you collaborate with teammates?',
    answer:
      'I communicate clearly over tools like Slack and project trackers, and I work well asynchronously. Technology is a strength that helps collaboration stay smooth.',
  },
  {
    question: 'What should employers know about legal requirements?',
    answer:
      'Under the ADA, employers must provide reasonable accommodations and cannot discriminate based on disability. Focus on qualifications and essential job functions with or without reasonable accommodation.',
  },
  {
    question: 'What unique value do you bring?',
    answer:
      'Lived accessibility experience plus full-stack systems depth. That perspective often inspires better inclusive design decisions — not only for me, but for every user who needs assistive tech.',
  },
  {
    question: 'What helps most in the hiring process?',
    answer:
      'Focus on skills, experience, and outcomes. Keep interviews and assessments accessible, and be ready to discuss reasonable accommodations when relevant.',
  },
];

function FaqItem({ faq, index, open, onToggle }) {
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="border-b border-border">
      <h2>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => onToggle(index)}
          className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold hover:text-primary transition-colors"
        >
          <span>{faq.question}</span>
          <ChevronDown
            className={cn(
              'h-5 w-5 shrink-0 text-muted-foreground transition-transform',
              open && 'rotate-180 text-primary'
            )}
            aria-hidden="true"
          />
        </button>
      </h2>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="pb-5 text-muted-foreground leading-relaxed"
      >
        {faq.answer}
      </div>
    </div>
  );
}

export default function FaqClient() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <div className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-semibold mb-3">FAQ</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Straight answers about accommodations, cerebral palsy at work, and how I deliver.
        </p>
      </div>

      <div>
        {faqs.map((faq, index) => (
          <FaqItem
            key={faq.question}
            faq={faq}
            index={index}
            open={openIndex === index}
            onToggle={(i) => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        Still have a question?{' '}
        <Link href="/contact" className="text-primary hover:underline underline-offset-4">
          Contact me
        </Link>{' '}
        or read more{' '}
        <Link href="/about" className="text-primary hover:underline underline-offset-4">
          about my background
        </Link>
        .
      </p>
    </div>
  );
}
