'use client';

import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import {
  GlassCard,
  CategoryPill,
  SectionLabel,
  GradientHeadline,
  ScrollReveal,
} from '@/components/ui';
import { hexToRgba } from '@/lib/utils';
import {
  getServiceBySlug,
  OUTDOOR_ACCENT,
  OutdoorIcon,
} from '@/data/services';

const control4 = getServiceBySlug('control4-automation')!;
const av = getServiceBySlug('audio-video')!;
const security = getServiceBySlug('security-cameras')!;
const wifi = getServiceBySlug('wifi-networking')!;

/** Compact bento tile for a single service. */
function MiniTile({
  href,
  accent,
  icon: Icon,
  title,
  short,
}: {
  href: string;
  accent: string;
  icon: typeof Check;
  title: string;
  short: string;
  className?: string;
}) {
  return (
    <Link href={href} className="block h-full">
      <GlassCard hover glowColor={accent} className="h-full">
        <div className="flex h-full min-h-[140px] flex-col gap-3 p-6">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-xl"
            style={{
              background: hexToRgba(accent, 0.12),
              border: `1px solid ${hexToRgba(accent, 0.3)}`,
            }}
          >
            <Icon size={24} style={{ color: accent }} />
          </span>
          <div className="mt-auto">
            <h3 className="font-heading text-xl font-bold text-text-primary">
              {title}
            </h3>
            <p className="mt-1 text-sm text-text-secondary">{short}</p>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

export function ServicesBento() {
  return (
    <section id="services" className="relative w-full px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <SectionLabel>What We Do</SectionLabel>
          <GradientHeadline className="mt-4 text-4xl sm:text-5xl">
            Every System. Every Space.
          </GradientHeadline>
          <p className="mt-4 text-lg text-text-secondary">
            From a single room to a whole estate, BTAV delivers precision
            installation and integration across five core disciplines.
          </p>
        </div>

        {/* Bento grid: 12 cols on desktop, stacked on mobile. */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* CARD 1 — Control4 (large, 7×2) */}
          <ScrollReveal className="lg:col-span-7 lg:row-span-2">
            <Link href={`/services/${control4.slug}`} className="block h-full">
              <GlassCard hover glowColor={control4.accentColor} className="h-full">
                <div className="flex h-full flex-col p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <CategoryPill label="Automation" color={control4.accentColor} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                    Platinum Dealer
                  </span>
                </div>

                {/* Decorative control-panel motif */}
                <div
                  className="relative mt-6 flex h-40 items-center justify-center overflow-hidden rounded-xl border sm:h-52"
                  style={{
                    borderColor: hexToRgba(control4.accentColor, 0.25),
                    background: `radial-gradient(circle at 30% 30%, ${hexToRgba(
                      control4.accentColor,
                      0.14,
                    )} 0%, transparent 60%)`,
                  }}
                >
                  <control4.icon
                    size={64}
                    style={{ color: control4.accentColor }}
                    className="opacity-90"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />
                </div>

                <h3 className="mt-6 font-heading text-3xl font-bold text-text-primary">
                  Control4 Smart Home
                </h3>
                <p className="mt-2 max-w-xl text-text-secondary">
                  One tap controls every system in your home. Lighting, climate,
                  AV, security, shades — unified in one elegant interface.
                </p>

                <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {control4.features.slice(0, 4).map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-text-secondary"
                    >
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0"
                        style={{ color: control4.accentColor }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                  <span
                    className="mt-6 inline-flex items-center gap-1.5 font-medium"
                    style={{ color: control4.accentColor }}
                  >
                    Learn More <ArrowRight size={16} />
                  </span>
                </div>
              </GlassCard>
            </Link>
          </ScrollReveal>

          {/* CARD 2 — AV (5×1) */}
          <ScrollReveal delay={0.05} className="lg:col-span-5">
            <MiniTile
              href={`/services/${av.slug}`}
              accent={av.accentColor}
              icon={av.icon}
              title="Audio / Video"
              short={av.tagline}
            />
          </ScrollReveal>

          {/* CARD 3 — Security (5×1) */}
          <ScrollReveal delay={0.1} className="lg:col-span-5">
            <MiniTile
              href={`/services/${security.slug}`}
              accent={security.accentColor}
              icon={security.icon}
              title="Security & Cameras"
              short={security.tagline}
            />
          </ScrollReveal>

          {/* CARD 4 — WiFi (4×1) */}
          <ScrollReveal delay={0.05} className="lg:col-span-4">
            <MiniTile
              href={`/services/${wifi.slug}`}
              accent={wifi.accentColor}
              icon={wifi.icon}
              title="WiFi & Networking"
              short={wifi.tagline}
            />
          </ScrollReveal>

          {/* CARD 5 — Outdoor (4×1) */}
          <ScrollReveal delay={0.1} className="lg:col-span-4">
            <MiniTile
              href={`/services/${av.slug}`}
              accent={OUTDOOR_ACCENT}
              icon={OutdoorIcon}
              title="Outdoor AV"
              short="Rain or shine. Always performing."
            />
          </ScrollReveal>

          {/* CARD 6 — View All CTA (4×1) */}
          <ScrollReveal delay={0.15} className="lg:col-span-4">
            <Link
              href="/services"
              className="group flex h-full min-h-[140px] flex-col items-start justify-between rounded-2xl border border-accent/40 bg-[var(--glass-bg)] p-6 backdrop-blur-glass transition-colors duration-300 hover:bg-[var(--glass-bg-heavy)]"
            >
              <span className="font-heading text-xl font-bold text-text-primary">
                View All Services
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent text-accent transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={20} />
              </span>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default ServicesBento;
