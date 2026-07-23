'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi — I'm Dan. Tell me what you're working on and I'll respond by email as soon as I can.",
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
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || messages.length < 2) {
      setStatus({ type: 'error', text: 'Please introduce yourself and send at least one message.' });
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
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Start a conversation</h1>
        <p className="text-muted-foreground">
          Chat with me here. Everything you send gets emailed to my inbox, and I&apos;ll reply directly.
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Who should I reply to?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="flex flex-col min-h-[400px]">
        <CardContent className="flex-1 flex flex-col p-4 space-y-4">
          <div className="flex-1 overflow-y-auto space-y-3 max-h-[50vh] pr-2">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div
                  className={`rounded-2xl px-4 py-2 max-w-[80%] text-sm ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted rounded-bl-none'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>

          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              rows={2}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none flex-1"
            />
            <Button onClick={handleSend} size="icon" className="shrink-0" aria-label="Send message">
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {status && (
            <div
              className={`text-sm p-3 rounded-lg ${
                status.type === 'error'
                  ? 'bg-destructive/10 text-destructive'
                  : 'bg-green-500/10 text-green-600'
              }`}
            >
              {status.text}
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={isSending || messages.length < 2 || !name || !email}
            className="w-full"
          >
            {isSending ? (
              <>
                <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                Sending conversation…
              </>
            ) : (
              'Email this conversation to Dan'
            )}
          </Button>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground mt-6">
        Prefer email?{' '}
        <Link href="/contact" className="underline">
          Use the contact form
        </Link>{' '}
        or write to{' '}
        <a href="mailto:danspelt24@gmail.com" className="underline">
          danspelt24@gmail.com
        </a>
      </p>
    </div>
  );
}
