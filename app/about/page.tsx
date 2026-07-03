import type { Metadata } from 'next';
import { Award, ShieldCheck, MapPin } from 'lucide-react';
import {
  PageHero,
  GradientHeadline,
  SectionLabel,
  GlassCard,
  AnimatedCounter,
  TechBadge,
} from '@/components/ui';
import { CTABand } from '@/components/sections';
import { SITE, SERVICE_CITIES } from '@/lib/constants';
import { brands } from '@/data/brands';

export const metadata: Metadata = {
  title: 'About BTAV — Phoenix Smart Home Specialists',
  description:
    'BTAV is a Tempe-based, Control4 Authorized Platinum Dealer delivering bespoke smart home systems across Maricopa County. Expert design, clean installation, lasting support.',
  alternates: { canonical: '/about' },
};

const STATS = [
  { target: 500, suffix: '+', label: 'Projects' },
  { target: 10, suffix: '+', label: 'Years' },
  { target: brands.length, suffix: '+', label: 'Brands' },
  { target: 100, suffix: '%', label: 'Satisfaction' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        label="Who We Are"
        title={
          <GradientHeadline as="h1" className="text-4xl sm:text-6xl">
            About BTAV
          </GradientHeadline>
        }
      />

      {/* Mission */}
      <section className="px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="font-heading text-2xl leading-relaxed text-text-secondary sm:text-3xl">
            We believe a smart home should be{' '}
            <span className="text-text-primary">invisible until you need it</span>{' '}
            — and perfect every time you do.
          </p>
        </div>
      </section>

      {/* Story + stats */}
      <section className="px-5 pb-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          {/* Visual */}
          <div
            className="relative flex h-72 items-center justify-center overflow-hidden rounded-2xl border border-border lg:h-full lg:min-h-[360px]"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, rgba(95,190,178,0.15) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(203,164,108,0.1) 0%, transparent 60%)',
            }}
          >
            <span className="font-heading text-7xl font-bold">
              <span className="text-text-primary">BT</span>
              <span className="text-accent">AV</span>
            </span>
            <div
              aria-hidden
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
          </div>

          {/* Text */}
          <div>
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="mt-4 font-heading text-3xl font-bold text-text-primary">
              Founder-led. Detail-obsessed.
            </h2>
            <div className="mt-4 space-y-4 text-text-secondary">
              <p>
                BTAV was founded in Tempe on a simple conviction: the technology
                that runs a home should feel effortless. Most systems don&apos;t —
                they&apos;re a tangle of apps, remotes, and compromises. We build
                the opposite.
              </p>
              <p>
                As a Control4 Authorized Platinum Dealer, BTAV designs, installs,
                and programs systems for homeowners across Maricopa County — from
                a single beautifully mounted display to a fully integrated estate
                with lighting, climate, AV, security, and networking working as
                one.
              </p>
              <p>
                We partner only with brands we trust, install to a standard we
                stand behind, and stay accessible long after the job is done.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <AnimatedCounter
                    target={s.target}
                    suffix={s.suffix}
                    className="text-gradient text-3xl"
                  />
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-text-secondary">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Our Team</SectionLabel>
          <div className="mt-6">
            <GlassCard className="max-w-md">
              <div className="flex gap-5 p-6">
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full font-heading text-2xl font-bold text-white"
                  style={{
                    background:
                      'linear-gradient(135deg, #5FBEB2 0%, #2E7D74 100%)',
                  }}
                  aria-hidden
                >
                  B
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-text-primary">
                    Binu Kumar
                  </h3>
                  <p className="font-mono text-[12px] uppercase tracking-wide text-text-secondary">
                    Founder &amp; Lead Integrator
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <TechBadge label="Control4 Platinum" variant="dealer" />
                    <TechBadge label="Certified Installer" variant="certified" />
                  </div>
                  <p className="mt-3 text-sm text-text-secondary">
                    Binu leads every BTAV project personally — from the first
                    walkthrough to final programming and handoff.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Certifications — only confirmed credentials (AGENTS.md §6.3) */}
      <section className="px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Credentials</SectionLabel>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Award, label: 'Control4 Authorized Platinum Dealer', color: '#CBA46C' },
              { icon: ShieldCheck, label: 'Licensed & Insured', color: '#5FBEB2' },
              { icon: MapPin, label: 'Serving All of Maricopa County', color: '#5FBEB2' },
            ].map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-3 rounded-xl border border-border bg-[var(--glass-bg)] p-5 backdrop-blur-glass"
              >
                <c.icon size={24} style={{ color: c.color }} className="shrink-0" />
                <span className="text-sm font-medium text-text-primary">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service area */}
      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionLabel>Service Area</SectionLabel>
          <h2 className="mt-4 font-heading text-2xl font-bold text-text-primary">
            Proudly serving the Valley
          </h2>
          <p className="mt-2 text-text-secondary">{SITE.serviceArea}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {SERVICE_CITIES.map((city) => (
              <span
                key={city}
                className="rounded-lg border border-border bg-[var(--glass-bg)] px-3 py-1.5 text-sm text-text-secondary"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
