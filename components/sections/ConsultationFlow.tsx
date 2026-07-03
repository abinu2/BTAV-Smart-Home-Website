import Link from 'next/link';
import { CalendarCheck, FileText, Mail, Sparkles } from 'lucide-react';
import { SectionLabel } from '@/components/ui';
import { SITE } from '@/lib/constants';

const STEPS = [
  {
    icon: Mail,
    eyebrow: 'Step 1',
    title: 'Send the brief',
    body: 'Share the rooms, systems, timeline, and budget range. Email is the primary contact path.',
  },
  {
    icon: CalendarCheck,
    eyebrow: 'Step 2',
    title: 'Book the walkthrough',
    body: 'BTAV reviews the details, confirms fit, and schedules an on-site or virtual consultation.',
  },
  {
    icon: FileText,
    eyebrow: 'Step 3',
    title: 'Approve the design',
    body: 'You receive a clear system plan, scope, and proposal before any installation is scheduled.',
  },
] as const;

export function ConsultationFlow() {
  return (
    <section className="relative border-y border-border bg-surface/40 px-5 py-16 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <SectionLabel>How Quotes Work</SectionLabel>
          <h2 className="mt-4 max-w-xl font-heading text-3xl font-bold text-text-primary sm:text-4xl">
            A clear path from first email to installed system.
          </h2>
          <p className="mt-4 max-w-lg text-text-secondary">
            The quote workflow is intentionally simple: no phone tag, no vague
            estimates, and no pressure. Every request starts with a written brief
            so your project is captured accurately.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-accent px-6 py-2.5 font-medium text-background transition-opacity hover:opacity-90"
            >
              Start a Quote
            </Link>
            <Link
              href={`mailto:${SITE.email}`}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-border px-6 py-2.5 font-medium text-text-secondary transition-colors hover:border-accent hover:text-accent"
            >
              Email BTAV
            </Link>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <article
                key={step.title}
                className="relative overflow-hidden rounded-2xl border border-border bg-[var(--glass-bg)] p-5 backdrop-blur-glass"
              >
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 blur-2xl"
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium uppercase tracking-wide text-accent">
                      {step.eyebrow}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                      <Icon size={19} />
                    </span>
                  </div>
                  <h3 className="mt-8 font-heading text-xl font-bold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {step.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-4 right-5 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted lg:flex">
        <Sparkles size={13} className="text-accent" />
        Email-first consultation
      </div>
    </section>
  );
}

export default ConsultationFlow;
