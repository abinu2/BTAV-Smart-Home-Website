'use client';

import Link from 'next/link';
import { BrandAccentButton, ScrollReveal } from '@/components/ui';
import { SITE } from '@/lib/constants';
import { hexToRgba } from '@/lib/utils';

export interface CTABandProps {
  /** Accent hex — defaults to BTAV electric blue. Brand pages pass their color. */
  color?: string;
  heading?: string;
  subtext?: string;
  primaryLabel?: string;
  primaryHref?: string;
}

/**
 * CTABand — full-width conversion block reused at the foot of most pages.
 * Keeps the path to a quote always one scroll away (AGENTS.md mandate).
 */
export function CTABand({
  color = '#5FBEB2',
  heading = 'Ready to Get Started?',
  subtext = 'Tell us about your space and we’ll design a system around how you actually live. Free consultation, no pressure.',
  primaryLabel = 'Get a Free Quote',
  primaryHref = '/contact',
}: CTABandProps) {
  return (
    <section className="relative w-full overflow-hidden px-5 py-24 sm:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${hexToRgba(color, 0.18)} 0%, transparent 70%)`,
        }}
      />
      <ScrollReveal className="relative mx-auto max-w-3xl">
        <div
          className="rounded-3xl border-t-[3px] bg-[var(--glass-bg-heavy)] px-6 py-12 text-center backdrop-blur-glass-heavy sm:px-12"
          style={{ borderTopColor: color, borderInline: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}
        >
          <h2 className="font-heading text-3xl font-bold text-text-primary sm:text-4xl">
            {heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-secondary">{subtext}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <BrandAccentButton
              label={primaryLabel}
              href={primaryHref}
              color={color}
              variant="filled"
              size="lg"
            />
            <Link
              href={`mailto:${SITE.email}`}
              className="inline-flex min-h-[44px] items-center gap-2 font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              Email BTAV
            </Link>
          </div>

          <p className="mt-6 font-mono text-[11px] text-text-muted">
            Or email{' '}
            <Link href={`mailto:${SITE.email}`} className="underline hover:text-text-secondary">
              {SITE.email}
            </Link>
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}

export default CTABand;
