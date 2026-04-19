'use server';

import { Resend } from 'resend';
import { contactSchema, type ContactInput } from '@/lib/contact-schema';
import { siteConfig } from '@/lib/site-config';

export type ContactResult =
  | { ok: true }
  | { ok: false; error: 'validation' | 'unconfigured' | 'send_failed'; fieldErrors?: Record<string, string> };

export async function sendContactMessage(input: ContactInput): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === 'string') fieldErrors[key] = issue.message;
    }
    return { ok: false, error: 'validation', fieldErrors };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO ?? siteConfig.email;
  const from = process.env.CONTACT_EMAIL_FROM ?? 'onboarding@resend.dev';

  if (!apiKey) {
    console.warn('[contact] RESEND_API_KEY is not configured — message not sent.');
    return { ok: false, error: 'unconfigured' };
  }

  const resend = new Resend(apiKey);
  const { name, email, message } = parsed.data;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error('[contact] Resend error:', error);
      return { ok: false, error: 'send_failed' };
    }
    return { ok: true };
  } catch (err) {
    console.error('[contact] Unexpected error:', err);
    return { ok: false, error: 'send_failed' };
  }
}
