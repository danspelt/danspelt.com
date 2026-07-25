'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Send, User, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ChatClient() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi — I'm Dan. Leave a short note about what you're working on. When you're ready, email the conversation to my inbox and I'll reply personally.",
    },
  ]);
  const [input, setInput] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setInput('');
    setStatus(null);
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || messages.length < 2) {
      setStatus({
        type: 'error',
        text: 'Add your name, email, and at least one message before sending.',
      });
      return;
    }

    setIsSending(true);
    setStatus(null);

    const transcript = messages
      .filter((m) => m.role !== 'system')
      .map((m) => `${m.role === 'assistant' ? 'Dan' : 'You'}: ${m.content}`)
      .join('\n');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, transcript }),
      });
      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', text: 'Sent. I will reply by email as soon as I can.' });
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: 'Thanks — your message is on its way to my inbox. Talk soon!',
          },
        ]);
      } else {
        setStatus({
          type: 'error',
          text: data.error || 'Something went wrong. Please try again or email me directly.',
        });
      }
    } catch {
      setStatus({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16 sm:py-20">
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-semibold mb-3">Message Dan</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          This is not a live chatbot. Draft a short conversation here, then email it to my inbox —
          I reply personally.
        </p>
      </div>

      <section aria-labelledby="reply-to-heading" className="mb-8 space-y-4">
        <h2 id="reply-to-heading" className="text-lg font-semibold">
          Who should I reply to?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="chat-name" className="block text-sm font-medium mb-1.5">
              Name
            </label>
            <input
              id="chat-name"
              type="text"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="field-input"
              required
            />
          </div>
          <div>
            <label htmlFor="chat-email" className="block text-sm font-medium mb-1.5">
              Email
            </label>
            <input
              id="chat-email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="field-input"
              required
            />
          </div>
        </div>
      </section>

      <section
        aria-label="Conversation"
        className="rounded-xl border border-border bg-card/60 p-4 sm:p-5 flex flex-col min-h-[420px]"
      >
        <div className="flex-1 overflow-y-auto space-y-3 max-h-[50vh] pr-1 mb-4" role="log" aria-live="polite">
          {messages.map((message, idx) => (
            <div
              key={`${message.role}-${idx}`}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
                aria-hidden="true"
              >
                {message.role === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <MessageSquare className="w-4 h-4" />
                )}
              </div>
              <div
                className={`rounded-2xl px-4 py-2.5 max-w-[80%] text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-muted rounded-bl-md'
                }`}
              >
                <span className="sr-only">
                  {message.role === 'user' ? 'You: ' : 'Dan: '}
                </span>
                {message.content}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label htmlFor="chat-message" className="sr-only">
              Your message
            </label>
            <textarea
              id="chat-message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              className="field-input resize-none"
              placeholder="Type a message…"
            />
          </div>
          <Button
            type="button"
            onClick={handleSend}
            size="icon"
            className="shrink-0"
            aria-label="Add message to conversation"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        <div role="status" aria-live="polite" className="min-h-10 mt-3">
          {status && (
            <p
              className={`text-sm p-3 rounded-lg ${
                status.type === 'error'
                  ? 'bg-destructive/10 text-destructive'
                  : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
              }`}
            >
              {status.text}
            </p>
          )}
        </div>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isSending || messages.length < 2 || !name || !email}
          className="w-full mt-2"
          size="lg"
        >
          {isSending ? (
            <>
              <Loader2 className="mr-2 w-4 h-4 animate-spin" aria-hidden="true" />
              Sending conversation…
            </>
          ) : (
            'Email this conversation to Dan'
          )}
        </Button>
      </section>

      <p className="text-center text-sm text-muted-foreground mt-8">
        Prefer a simple form?{' '}
        <Link href="/contact" className="text-primary hover:underline underline-offset-4">
          Use contact
        </Link>{' '}
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
