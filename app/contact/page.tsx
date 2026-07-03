import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CheckCircle2, Clock, Mail, MapPin } from 'lucide-react';
import { PageHero, GradientHeadline } from '@/components/ui';
import { ContactForm } from '@/components/forms/ContactForm';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Get a Free Smart Home Quote | BTAV Phoenix AZ',
  description:
    'Request a free consultation from BTAV — Control4 Specialist serving Maricopa County. Tell us about your project and we’ll respond within two business hours.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        label="Let's Talk"
        title={
          <GradientHeadline as="h1" className="text-4xl sm:text-5xl">
            Get Your Free Consultation
          </GradientHeadline>
        }
        subtext="Tell us about your space and we'll design a system around how you actually live. No pressure, no obligation."
      />

      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[2fr_3fr]">
          {/* Info */}
          <div>
            <ul className="space-y-6">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-start gap-3"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-[var(--glass-bg)] text-accent">
                    <Mail size={18} />
                  </span>
                  <span>
                    <span className="block font-mono text-[11px] uppercase tracking-wide text-text-muted">
                      Email
                    </span>
                    <span className="break-all text-text-primary transition-colors group-hover:text-accent">
                      {SITE.email}
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-[var(--glass-bg)] text-accent">
                  <MapPin size={18} />
                </span>
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-wide text-text-muted">
                    Service Area
                  </span>
                  <span className="text-text-primary">{SITE.serviceArea}</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-[var(--glass-bg)] text-accent">
                  <Clock size={18} />
                </span>
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-wide text-text-muted">
                    Hours
                  </span>
                  {SITE.hours.map((h) => (
                    <span key={h.days} className="block text-text-primary">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>

            <div className="mt-8 rounded-2xl border border-border bg-[var(--glass-bg)] p-5">
              <p className="text-sm leading-relaxed text-text-secondary">
                BTAV is a{' '}
                <span className="font-medium text-text-primary">
                  Control4 Specialist
                </span>
                . Every consultation is handled by a Control4 specialist — not a
                call center.
              </p>
            </div>

            <div className="mt-5 rounded-2xl border border-accent/25 bg-accent/5 p-5">
              <h2 className="font-heading text-lg font-bold text-text-primary">
                What happens next
              </h2>
              <ol className="mt-4 space-y-3 text-sm text-text-secondary">
                {[
                  'You submit the project brief by email-backed form.',
                  'BTAV reviews the scope and replies within two business hours.',
                  'A walkthrough and written proposal are scheduled if it is a fit.',
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Form */}
          <div>
            <Suspense
              fallback={
                <div className="h-[600px] animate-pulse rounded-2xl border border-border bg-[var(--glass-bg)]" />
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
