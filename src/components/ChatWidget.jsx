'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FormattedMessage } from '@/components/FormattedMessage';

const MAX_INPUT_LENGTH = 4000;

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    content:
      "Hi there — I'm Dan's AI assistant. I know his background, skills, and the kind of work he takes on. What would you like to know?",
    createdAt: Date.now(),
  },
];

const QUICK_QUESTIONS = [
  { label: "Dan's story", query: 'Tell me Dan\'s story and background.' },
  { label: 'Skills & tools', query: 'What are Dan\'s top skills and technologies?' },
  { label: 'For our company', query: 'What can Dan do for our company or team?' },
  { label: 'For your project', query: 'What kind of projects or problems can Dan help with?' },
];

function formatTime(date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
}

export function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || text.length > MAX_INPUT_LENGTH || isLoading) return;

    const userMessage = { role: 'user', content: text, createdAt: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setStatus(null);
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
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.reply, createdAt: Date.now() },
        ]);
      } else {
        setStatus({
          type: 'error',
          text: data.error || 'The AI assistant is unavailable. Please try again.',
        });
      }
    } catch {
      setStatus({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  }, [input, messages, isLoading]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickQuestion = useCallback((query) => {
    setInput(query);
    setTimeout(() => handleSend(), 0);
  }, [handleSend]);

  // Hide on the full AI chat page — it already has the chat experience.
  if (pathname === '/ai-chat') return null;

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Chat with Dan's AI assistant"
            className="w-[calc(100%-2.5rem)] max-w-[26rem] rounded-3xl border border-border/60 bg-card/95 shadow-2xl shadow-black/10 backdrop-blur-xl flex flex-col overflow-hidden ring-1 ring-black/5"
          >
            <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 border-b border-border/60 bg-gradient-to-r from-muted/80 to-muted/40 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary/60 blur-[2px]" />
                  <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center shadow-md ring-2 ring-background">
                    <Bot className="w-4 h-4" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">Dan's AI Assistant</p>
                  <p className="text-[10px] text-muted-foreground">Usually replies in seconds</p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  setIsOpen(false);
                  toggleRef.current?.focus();
                }}
                aria-label="Close chat"
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </div>

            <div
              className="flex-1 overflow-y-scroll overflow-x-hidden space-y-3 p-3.5 pr-2.5 h-[18rem] scroll-smooth custom-scrollbar"
              role="log"
              aria-live="polite"
            >
              {messages.map((message, idx) => {
                const isAssistant = message.role === 'assistant';
                return (
                  <div
                    key={`${message.role}-${idx}`}
                    className={`flex gap-2.5 min-w-0 ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                        isAssistant
                          ? 'bg-gradient-to-br from-muted to-muted/70 text-muted-foreground'
                          : 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground'
                      }`}
                      aria-hidden="true"
                    >
                      {isAssistant ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                    </div>
                    <div className={`flex flex-col items-start min-w-0 max-w-full ${isAssistant ? 'w-[85%]' : 'w-[80%]'}`}>
                      <div
                        className={`rounded-2xl px-3 py-2 text-[13px] leading-relaxed shadow-sm break-words min-w-0 w-full ${
                          isAssistant
                            ? 'bg-muted/80 rounded-bl-md border border-border/30'
                            : 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-md shadow-primary/20'
                        }`}
                      >
                        <span className="sr-only">{isAssistant ? 'Dan AI: ' : 'You: '}</span>
                        {isAssistant ? (
                          <FormattedMessage content={message.content} />
                        ) : (
                          message.content
                        )}
                      </div>
                      <span className="text-[10px] text-muted-foreground/90 mt-1">
                        {message.createdAt ? formatTime(new Date(message.createdAt)) : ''}
                      </span>
                    </div>
                  </div>
                );
              })}
              {messages.length === 1 && (
                <div className="pt-1 max-w-full">
                  <p className="text-[10px] font-medium text-muted-foreground mb-1.5 ml-8">Quick questions</p>
                  <div className="flex flex-wrap gap-1.5 ml-8 max-w-full overflow-x-hidden">
                    {QUICK_QUESTIONS.map((q) => (
                      <button
                        key={q.label}
                        type="button"
                        onClick={() => handleQuickQuestion(q.query)}
                        disabled={isLoading}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-muted/70 hover:bg-primary hover:text-primary-foreground border border-border/40 hover:border-primary/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {isLoading && (
                <div className="flex gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center shadow-sm">
                    <Bot className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <div className="bg-muted/80 rounded-2xl rounded-bl-md px-3 py-2 flex items-center gap-2 shadow-sm border border-border/30">
                    <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
                    <span className="text-[13px] text-muted-foreground">Thinking…</span>
                  </div>
                </div>
              )}
              <div ref={scrollRef} />
            </div>

            <div role="status" aria-live="polite" className="px-3.5">
              {status && (
                <div className="flex items-start gap-2 text-[11px] p-1.5 rounded-lg bg-destructive/10 text-destructive mb-2">
                  <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
                  {status.text}
                </div>
              )}
            </div>

            <div className="flex gap-2 items-end p-2.5 border-t border-border">
              <label htmlFor="chat-widget-message" className="sr-only">
                Your message
              </label>
              <textarea
                id="chat-widget-message"
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                maxLength={MAX_INPUT_LENGTH}
                className="field-input resize-none min-h-[36px] max-h-[120px] text-[13px] flex-1"
                placeholder="Ask about Dan's work…"
                aria-describedby="chat-widget-help"
                disabled={isLoading}
                suppressHydrationWarning
              />
              <Button
                type="button"
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                size="icon"
                className="shrink-0"
                aria-label="Send message"
                suppressHydrationWarning
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
              </Button>
            </div>
            <p id="chat-widget-help" className="sr-only">
              Press Enter to send, Shift + Enter for a new line.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        ref={toggleRef}
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        size="icon"
        className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 ring-2 ring-background"
        aria-label={isOpen ? 'Close chat' : "Chat with Dan's AI assistant"}
        aria-expanded={isOpen}
      >
        {!isOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background animate-pulse" aria-hidden="true" />
        )}
        {isOpen ? <X className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
      </Button>
    </div>
  );
}
