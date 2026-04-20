'use client';

import { useEffect, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { useLocale, useTranslations } from 'next-intl';
import { Bot, MessageCircle, Minimize2, Send, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';

const SUGGESTED_EN = [
  'Tell me about his skills',
  'What projects has he built?',
  'Is he available for work?',
  "What's his experience?",
];

const SUGGESTED_ES = [
  'Contame sobre sus habilidades',
  '¿Qué proyectos hizo?',
  '¿Está disponible para trabajar?',
  '¿Cuál es su experiencia?',
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduced = usePrefersReducedMotion();
  const locale = useLocale() as 'en' | 'es';
  const t = useTranslations('chat');

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat', body: { locale } }),
  });

  const isLoading = status === 'submitted' || status === 'streaming';
  const suggested = locale === 'es' ? SUGGESTED_ES : SUGGESTED_EN;

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }, [messages, reduced]);

  function submit(text: string) {
    if (!text.trim() || isLoading) return;
    setStarted(true);
    setInputValue('');
    sendMessage({ text });
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submit(inputValue);
  }

  const panelVariants = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 20, scale: 0.95 },
      };

  const btnMotion = reduced ? {} : { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            {...panelVariants}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex h-130 w-90 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            role="dialog"
            aria-label={t('title')}
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-muted/50 px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15">
                <Bot className="h-4 w-4 text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-tight text-foreground">{t('title')}</p>
                <p className="text-xs text-muted-foreground">{t('subtitle')}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={t('close')}
              >
                <Minimize2 className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
              {/* Welcome bubble */}
              <AssistantBubble text={t('welcome')} />

              {/* Suggested questions */}
              {!started && (
                <div className="flex flex-col gap-2 pl-9">
                  {suggested.map((q) => (
                    <button
                      key={q}
                      onClick={() => submit(q)}
                      className="rounded-xl border border-border bg-background px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:border-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="mr-1.5 text-accent">+</span>
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Conversation */}
              {messages.map((m: UIMessage) => (
                <MessageBubble key={m.id} message={m} />
              ))}

              {/* Typing indicator */}
              {isLoading && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              id="chat-form"
              onSubmit={onSubmit}
              className="flex items-center gap-2 border-t border-border px-3 py-3"
            >
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t('placeholder')}
                disabled={isLoading}
                className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
                aria-label={t('placeholder')}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
                aria-label={t('send')}
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        {...btnMotion}
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={open ? t('close') : t('open')}
        aria-expanded={open}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={reduced ? {} : { rotate: -90, opacity: 0 }}
              animate={reduced ? {} : { rotate: 0, opacity: 1 }}
              exit={reduced ? {} : { rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={reduced ? {} : { rotate: 90, opacity: 0 }}
              animate={reduced ? {} : { rotate: 0, opacity: 1 }}
              exit={reduced ? {} : { rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

function AssistantBubble({ text }: { text: string }) {
  return (
    <div className="flex gap-2.5">
      <BotAvatar />
      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2.5 text-sm text-foreground">
        {text}
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === 'user';
  const text = message.parts
    .filter((p) => p.type === 'text')
    .map((p) => p.text)
    .join('');

  return (
    <div className={cn('flex gap-2.5', isUser ? 'flex-row-reverse' : 'flex-row')}>
      {!isUser && <BotAvatar />}
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm wrap-break-word',
          isUser
            ? 'rounded-tr-sm bg-accent text-accent-foreground'
            : 'rounded-tl-sm bg-muted text-foreground',
        )}
      >
        {isUser ? text : (
          <div className="prose prose-sm dark:prose-invert max-w-none [&>p]:mb-1 [&>p:last-child]:mb-0 [&>ul]:mt-1 [&>ul]:pl-4 [&>ol]:mt-1 [&>ol]:pl-4">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-2.5">
      <BotAvatar />
      <div className="rounded-2xl rounded-tl-sm bg-muted px-3.5 py-2.5">
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </span>
      </div>
    </div>
  );
}

function BotAvatar() {
  return (
    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15">
      <Bot className="h-3.5 w-3.5 text-accent" />
    </div>
  );
}
