'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Send, User, Bot, Loader2, Mail, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormattedMessage } from '@/components/FormattedMessage';
import { QUICK_PROMPTS } from '@/data/professional-profile';
import { trackEvent } from '@/lib/analytics';

const MAX_INPUT_LENGTH = 4000;

/** Shown when the AI route is unavailable so the visitor is never stuck. */
const FALLBACK_LINKS = [
  { title: 'Projects', url: '/projects' },
  { title: 'Case studies', url: '/case-studies' },
  { title: 'Custom software services', url: '/custom-software' },
  { title: 'Contact Dan', url: '/contact' },
];

function formatTime(date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
}

export default function AIChatClient() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi — I'm Dan's AI assistant. I can answer questions about his experience, skills, projects, and how he might help with your project. What would you like to know?",
      createdAt: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailForm, setEmailForm] = useState({
    name: '',
    email: '',
    company: '',
    needs: '',
    consent: false,
    website: '',
  });
  const [isEmailing, setIsEmailing] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showEmailForm]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const buildTranscript = useCallback(() => {
    return messages
      .filter((m) => m.role !== 'system')
      .map((m) => `${m.role === 'assistant' ? 'Dan AI' : 'Visitor'}: ${m.content}`)
      .join('\n\n');
  }, [messages]);

  const [showFallback, setShowFallback] = useState(false);

  const sendText = useCallback(
    async (rawText) => {
      const text = rawText.trim();
      if (!text || text.length > MAX_INPUT_LENGTH) return;

      const userMessage = { role: 'user', content: text, createdAt: Date.now() };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setStatus(null);
      setEmailStatus(null);
      setIsLoading(true);

      try {
        const response = await fetch('/api/ai-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });
        const data = await response.json();

        if (response.ok) {
          const sources = Array.isArray(data.sources) ? data.sources : [];
          setShowFallback(false);
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: data.reply,
              sources,
              createdAt: Date.now(),
            },
          ]);
          if (sources.length > 0) {
            trackEvent('ask_dan_sources_shown', { source_count: sources.length });
          }
        } else {
          setShowFallback(true);
          setStatus({
            type: 'error',
            text: data.error || 'The AI assistant is unavailable. Please try again.',
          });
        }
      } catch {
        setShowFallback(true);
        setStatus({ type: 'error', text: 'Network error. Please try again.' });
      } finally {
        setIsLoading(false);
        setTimeout(() => textareaRef.current?.focus(), 50);
      }
    },
    [messages]
  );

  const handleSend = useCallback(() => sendText(input), [sendText, input]);

  const handleQuickPrompt = useCallback(
    (prompt) => {
      trackEvent('ask_dan_quick_prompt', { prompt_id: prompt.id });
      sendText(prompt.text);
    },
    [sendText]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmailSubmit = async () => {
    const { name, email, company, needs, consent, website } = emailForm;

    if (!name.trim() || !email.trim() || !needs.trim() || !consent) {
      setEmailStatus({
        type: 'error',
        text: 'Please fill in your name, email, and needs, and confirm consent.',
      });
      return;
    }

    setIsEmailing(true);
    setEmailStatus(null);

    try {
      const response = await fetch('/api/ai-chat/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          needs,
          consent,
          website,
          transcript: buildTranscript(),
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setEmailStatus({ type: 'success', text: 'Sent. Dan will follow up by email.' });
      } else {
        setEmailStatus({
          type: 'error',
          text: data.error || 'Something went wrong. Please try again or email directly.',
        });
      }
    } catch {
      setEmailStatus({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsEmailing(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-10 text-center sm:text-left"
      >
        <h1 className="text-4xl sm:text-5xl font-semibold mb-3 tracking-tight">Chat with Dan's AI</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
          Ask about my experience, skills, projects, and how I can help with your software needs.
        </p>
      </motion.div>

      <section
        aria-label="AI conversation"
        className="rounded-2xl border border-border bg-card/70 shadow-sm p-4 sm:p-6 flex flex-col min-h-[500px]"
        suppressHydrationWarning
      >
        <div
          className="flex-1 overflow-y-scroll space-y-4 max-h-[55vh] pr-1 mb-4 scroll-smooth custom-scrollbar"
          role="log"
          aria-live="polite"
        >
          <AnimatePresence initial={false}>
            {messages.map((message, idx) => {
              const id = `${message.role}-${idx}`;
              const isAssistant = message.role === 'assistant';
              return (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-3 ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isAssistant ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'
                    }`}
                    aria-hidden="true"
                  >
                    {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={`flex flex-col items-start ${isAssistant ? 'max-w-[90%]' : 'max-w-[80%]'}`}>
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        isAssistant
                          ? 'bg-muted rounded-bl-md'
                          : 'bg-primary text-primary-foreground rounded-br-md'
                      }`}
                    >
                      <span className="sr-only">{isAssistant ? 'Dan AI: ' : 'You: '}</span>
                      {isAssistant ? (
                        <FormattedMessage content={message.content} />
                      ) : (
                        message.content
                      )}
                    </div>
                    {isAssistant && message.sources?.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Sources used</p>
                        <ul className="flex flex-wrap gap-2">
                          {message.sources.map((source) => (
                            <li key={source.url}>
                              <Link
                                href={source.url}
                                className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 focus-ring"
                              >
                                {source.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <span className="text-xs text-muted-foreground mt-1">
                      {message.createdAt ? formatTime(new Date(message.createdAt)) : ''}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Bot className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Thinking…</span>
              </div>
            </motion.div>
          )}
          <div ref={scrollRef} />
        </div>

        {messages.length <= 2 && (
          <div className="mb-3">
            <p className="text-xs font-medium text-muted-foreground mb-2">Try one of these</p>
            <ul className="flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((prompt) => (
                <li key={prompt.id}>
                  <button
                    type="button"
                    onClick={() => handleQuickPrompt(prompt)}
                    disabled={isLoading}
                    className="text-xs font-medium px-3 py-1.5 rounded-full border border-border bg-card hover:bg-muted disabled:opacity-50 focus-ring"
                  >
                    {prompt.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <label htmlFor="ai-chat-message" className="sr-only">
              Your message
            </label>
            <textarea
              id="ai-chat-message"
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              maxLength={MAX_INPUT_LENGTH}
              className="field-input resize-none min-h-[44px] max-h-[200px] pr-16"
              placeholder="Ask about Dan's experience, skills, or projects…"
              aria-describedby="ai-message-help"
              disabled={isLoading}
              suppressHydrationWarning
            />
            <span
              id="ai-message-length"
              className={`absolute right-3 bottom-2 text-[10px] tabular-nums ${
                input.length > MAX_INPUT_LENGTH * 0.9 ? 'text-destructive' : 'text-muted-foreground'
              }`}
            >
              {input.length}/{MAX_INPUT_LENGTH}
            </span>
          </div>
          <Button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || input.length > MAX_INPUT_LENGTH || isLoading}
            size="icon"
            className="shrink-0"
            aria-label="Send message"
            suppressHydrationWarning
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p id="ai-message-help" className="sr-only">
          Press Enter to send, Shift + Enter for a new line.
        </p>

        <div role="status" aria-live="polite" className="min-h-10 mt-3">
          <AnimatePresence mode="wait">
            {status && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className={`flex items-start gap-2 text-sm p-3 rounded-lg ${
                  status.type === 'error'
                    ? 'bg-destructive/10 text-destructive'
                    : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                }`}
              >
                {status.type === 'error' ? (
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                ) : (
                  <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
                )}
                {status.text}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {showFallback && (
          <div className="mt-3 rounded-lg border border-border bg-card p-4">
            <p className="text-sm font-medium mb-2">You can still find what you need</p>
            <ul className="flex flex-wrap gap-2">
              {FALLBACK_LINKS.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 focus-ring"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!showEmailForm ? (
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowEmailForm(true)}
            className="w-full mt-4"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email this conversation to Dan
          </Button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 space-y-4 rounded-xl border border-border bg-background p-4 sm:p-5"
          >
            <h3 className="text-lg font-semibold">Send conversation to Dan</h3>
            <p className="text-sm text-muted-foreground">
              Fill in your details and I'll email the transcript to Dan so he can follow up.
            </p>

            <input
              type="text"
              name="website"
              value={emailForm.website}
              onChange={(e) => setEmailForm((f) => ({ ...f, website: e.target.value }))}
              className="absolute opacity-0 w-0 h-0"
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ai-name" className="block text-sm font-medium mb-1.5">
                  Name
                </label>
                <input
                  id="ai-name"
                  type="text"
                  autoComplete="name"
                  value={emailForm.name}
                  onChange={(e) => setEmailForm((f) => ({ ...f, name: e.target.value }))}
                  className="field-input"
                  required
                  suppressHydrationWarning
                />
              </div>
              <div>
                <label htmlFor="ai-email" className="block text-sm font-medium mb-1.5">
                  Email
                </label>
                <input
                  id="ai-email"
                  type="email"
                  autoComplete="email"
                  value={emailForm.email}
                  onChange={(e) => setEmailForm((f) => ({ ...f, email: e.target.value }))}
                  className="field-input"
                  required
                  suppressHydrationWarning
                />
              </div>
            </div>

            <div>
              <label htmlFor="ai-company" className="block text-sm font-medium mb-1.5">
                Company / Organization
              </label>
              <input
                id="ai-company"
                type="text"
                autoComplete="organization"
                value={emailForm.company}
                onChange={(e) => setEmailForm((f) => ({ ...f, company: e.target.value }))}
                className="field-input"
                suppressHydrationWarning
              />
            </div>

            <div>
              <label htmlFor="ai-needs" className="block text-sm font-medium mb-1.5">
                What do you need help with?
              </label>
              <textarea
                id="ai-needs"
                rows={3}
                value={emailForm.needs}
                onChange={(e) => setEmailForm((f) => ({ ...f, needs: e.target.value }))}
                className="field-input resize-none"
                required
                suppressHydrationWarning
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                id="ai-consent"
                type="checkbox"
                checked={emailForm.consent}
                onChange={(e) => setEmailForm((f) => ({ ...f, consent: e.target.checked }))}
                className="mt-1"
                required
              />
              <label htmlFor="ai-consent" className="text-sm text-muted-foreground leading-relaxed">
                I agree to send my contact details and this conversation transcript to Dan so he can
                follow up. This information is not stored permanently.
              </label>
            </div>

            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="w-4 h-4 shrink-0" />
              <p>
                Privacy notice: your transcript is only used to email Dan. It is not stored on the
                server after the email is sent.
              </p>
            </div>

            <div role="status" aria-live="polite">
              <AnimatePresence mode="wait">
                {emailStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className={`flex items-start gap-2 text-sm p-3 rounded-lg mb-3 ${
                      emailStatus.type === 'error'
                        ? 'bg-destructive/10 text-destructive'
                        : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                    }`}
                  >
                    {emailStatus.type === 'error' ? (
                      <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    ) : (
                      <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    )}
                    {emailStatus.text}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowEmailForm(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleEmailSubmit}
                disabled={isEmailing}
                className="flex-1"
              >
                {isEmailing ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  'Send to Dan'
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </section>

      <p className="text-center text-sm text-muted-foreground mt-8">
        Prefer a simple contact form?{' '}
        <a href="/contact" className="text-primary hover:underline underline-offset-4">
          Use contact
        </a>{' '}
        or write to{' '}
        <a
          href="mailto:danspelt24@gmail.com"
          className="text-primary hover:underline underline-offset-4"
        >
          danspelt24@gmail.com
        </a>
      </p>
    </div>
  );
}
