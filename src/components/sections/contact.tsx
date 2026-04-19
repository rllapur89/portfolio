'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Mail, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { FadeIn } from '@/components/animations/fade-in';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/ui/section';
import { sendContactMessage } from '@/app/[locale]/actions';
import { contactSchema, type ContactInput } from '@/lib/contact-schema';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'success' | 'error';
type ValidationKey = 'nameRequired' | 'emailInvalid' | 'messageShort';

export function Contact() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<Status>('idle');
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = handleSubmit((values) => {
    setStatus('idle');
    startTransition(async () => {
      const res = await sendContactMessage(values);
      if (res.ok) {
        setStatus('success');
        reset();
        return;
      }
      if (res.error === 'validation' && res.fieldErrors) {
        for (const [key, msg] of Object.entries(res.fieldErrors)) {
          setError(key as keyof ContactInput, { message: msg });
        }
      }
      setStatus('error');
    });
  });

  const errorMessage = (key: string | undefined): string | undefined => {
    if (!key) return undefined;
    const validationKeys: ValidationKey[] = ['nameRequired', 'emailInvalid', 'messageShort'];
    if (validationKeys.includes(key as ValidationKey)) {
      return t(`validation.${key as ValidationKey}`);
    }
    return key;
  };

  const inputClasses = (hasError: boolean) =>
    cn(
      'w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/40',
      hasError && 'border-destructive focus:border-destructive focus:ring-destructive/30',
    );

  const nameError = errorMessage(errors.name?.message);
  const emailError = errorMessage(errors.email?.message);
  const messageError = errorMessage(errors.message?.message);

  return (
    <Section id="contact" title={t('title')} subtitle={t('subtitle')}>
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[2fr_3fr]">
        <FadeIn>
          <aside className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Mail className="h-5 w-5" aria-hidden />
            </div>
            <p className="text-sm text-muted-foreground">{t('direct')}</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-base font-medium text-foreground underline-offset-4 hover:underline"
            >
              {t('directEmail')}
            </a>
            <div className="mt-auto pt-4 text-xs text-muted-foreground">
              <p>LinkedIn</p>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                linkedin.com/in/rllapur
              </a>
            </div>
          </aside>
        </FadeIn>

        <FadeIn delay={0.1}>
          <form
            noValidate
            onSubmit={onSubmit}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <fieldset disabled={isPending} className="space-y-4">
              <legend className="sr-only">{t('formTitle')}</legend>

              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-sm font-medium">
                  {t('name')}
                </label>
                <input
                  id="name"
                  autoComplete="name"
                  aria-invalid={!!nameError}
                  aria-describedby={nameError ? 'name-error' : undefined}
                  className={inputClasses(!!nameError)}
                  {...register('name')}
                />
                {nameError && (
                  <p id="name-error" className="text-xs text-destructive">
                    {nameError}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium">
                  {t('email')}
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'email-error' : undefined}
                  className={inputClasses(!!emailError)}
                  {...register('email')}
                />
                {emailError && (
                  <p id="email-error" className="text-xs text-destructive">
                    {emailError}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-sm font-medium">
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  aria-invalid={!!messageError}
                  aria-describedby={messageError ? 'message-error' : undefined}
                  className={inputClasses(!!messageError)}
                  {...register('message')}
                />
                {messageError && (
                  <p id="message-error" className="text-xs text-destructive">
                    {messageError}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <p
                  aria-live="polite"
                  className={cn(
                    'text-sm',
                    status === 'success' && 'text-accent',
                    status === 'error' && 'text-destructive',
                  )}
                >
                  {status === 'success' && (
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" aria-hidden />
                      {t('success')}
                    </span>
                  )}
                  {status === 'error' && t('error')}
                </p>
                <Button type="submit" variant="accent" size="md" disabled={isPending}>
                  {isPending ? t('sending') : t('send')}
                  {!isPending && <Send className="h-4 w-4" aria-hidden />}
                </Button>
              </div>
            </fieldset>
          </form>
        </FadeIn>
      </div>
    </Section>
  );
}
