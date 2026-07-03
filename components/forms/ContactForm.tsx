'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, ArrowRight, Mail } from 'lucide-react';
import {
  contactSchema,
  type ContactFormValues,
  SERVICE_OPTIONS,
  TIER_OPTIONS,
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
} from '@/lib/contact';
import { SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const inputBase =
  'w-full rounded-xl border border-border bg-[rgba(255,255,255,0.02)] px-4 py-3 text-text-primary placeholder:text-text-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent';

export function ContactForm() {
  const params = useSearchParams();
  const [state, setState] = useState<SubmitState>('idle');
  const [serverMessage, setServerMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      service:
        (params.get('service') as ContactFormValues['service']) ?? 'unsure',
      tier: (params.get('tier') as ContactFormValues['tier']) ?? 'unsure',
      description: params.get('brand')
        ? `I'm interested in ${params.get('brand')}.`
        : '',
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setState('submitting');
    setServerMessage('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        setState('success');
        return;
      }

      // Map server-side field errors back onto the form.
      if (res.status === 400 && json.errors) {
        for (const [field, message] of Object.entries(json.errors)) {
          setError(field as keyof ContactFormValues, {
            message: String(message),
          });
        }
        setState('idle');
        return;
      }

      setState('error');
      setServerMessage(
        json.message ||
          'Something went wrong. Please email us and we’ll take your details directly.',
      );
    } catch {
      // Network/offline.
      setState('error');
      setServerMessage(
        'Check your connection and try again — or email us directly.',
      );
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-2xl border border-accent/40 bg-[var(--glass-bg)] p-8 text-center backdrop-blur-glass">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15"
        >
          <CheckCircle2 size={36} className="text-accent" />
        </motion.div>
        <h3 className="font-heading text-2xl font-bold text-text-primary">
          Request received
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-text-secondary">
          We&apos;ll respond within 2 business hours. In urgent cases, email us
          directly at{' '}
          <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
            {SITE.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-2xl border border-border bg-[var(--glass-bg)] p-6 backdrop-blur-glass sm:p-8"
    >
      {/* Honeypot — visually hidden, off-screen (not display:none). */}
      <div
        aria-hidden
        style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
      >
        <label htmlFor="company-website">Company Website</label>
        <input
          id="company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('honeypot')}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message} required>
          <input
            {...register('name')}
            className={inputBase}
            placeholder="Jane Smith"
            autoComplete="name"
          />
        </Field>

        <Field label="Email" error={errors.email?.message} required>
          <input
            {...register('email')}
            className={inputBase}
            placeholder="jane@email.com"
            inputMode="email"
            autoComplete="email"
          />
        </Field>

        <Field label="City" error={errors.city?.message} required>
          <input
            {...register('city')}
            className={inputBase}
            placeholder="Scottsdale"
            autoComplete="address-level2"
          />
        </Field>

        <Field label="Service Interested In" error={errors.service?.message} required>
          <select {...register('service')} className={cn(inputBase, 'appearance-none')}>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-surface">
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Tier" error={errors.tier?.message}>
          <select {...register('tier')} className={cn(inputBase, 'appearance-none')}>
            {TIER_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-surface">
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Budget" error={errors.budget_range?.message}>
          <select {...register('budget_range')} className={cn(inputBase, 'appearance-none')}>
            <option value="" className="bg-surface">
              Select (optional)
            </option>
            {BUDGET_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-surface">
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Timeline" error={errors.timeline?.message}>
          <select {...register('timeline')} className={cn(inputBase, 'appearance-none')}>
            <option value="" className="bg-surface">
              Select (optional)
            </option>
            {TIMELINE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-surface">
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Tell us about your project" error={errors.description?.message}>
          <textarea
            {...register('description')}
            rows={4}
            className={cn(inputBase, 'resize-y')}
            placeholder="Rooms involved, what you'd like to control, any equipment you already have…"
          />
        </Field>
      </div>

      {state === 'error' && (
        <p
          role="alert"
          aria-live="polite"
          className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {serverMessage}{' '}
          <a href={`mailto:${SITE.email}`} className="font-medium underline">
            Email {SITE.email}
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={state === 'submitting'}
        className="mt-6 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-accent font-body font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {state === 'submitting' ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send My Request
            <ArrowRight size={18} />
          </>
        )}
      </button>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-center font-mono text-[11px] text-text-muted">
        <Mail size={12} />
        Prefer email? {SITE.email}
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  // Wrapping <label> gives implicit association with the control inside —
  // accessible without needing to thread an id onto every input.
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-text-secondary">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </span>
      {children}
      {error && (
        <span role="alert" className="text-xs text-red-400">
          {error}
        </span>
      )}
    </label>
  );
}

export default ContactForm;
