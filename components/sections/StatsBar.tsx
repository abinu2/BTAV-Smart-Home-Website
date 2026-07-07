'use client';

import { Boxes, CalendarClock, ThumbsUp, MapPin, type LucideIcon } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui';
import { brands } from '@/data/brands';
import { SERVICE_CITIES } from '@/lib/constants';

/**
 * StatsBar — kinetic numbers between Hero and Services. Counters animate on
 * scroll into view. Brand count is derived from the canonical registry so it
 * never drifts; the other figures are owner-provided marketing claims.
 * NOTE: confirm 10+ / 100% with Binu before launch.
 */
const STATS: {
  icon: LucideIcon;
  target: number;
  suffix: string;
  label: string;
}[] = [
  { icon: Boxes, target: brands.length, suffix: '+', label: 'Premium Brands' },
  { icon: CalendarClock, target: 10, suffix: '+', label: 'Years Experience' },
  { icon: Zap, target: 2, suffix: 'hr', label: 'Response Time' },
  { icon: ThumbsUp, target: 100, suffix: '%', label: 'Client Satisfaction' },
];

export function StatsBar() {
  return (
    <section
      id="stats"
      className="relative w-full border-y border-border bg-surface-2 bg-noise bg-repeat"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={[
              'flex flex-col items-center gap-2 px-4 py-10 text-center sm:py-14',
              // 2×2 on mobile, single row on desktop — dividers between cells.
              i % 2 === 1 ? 'border-l border-border' : '',
              i >= 2 ? 'border-t border-border lg:border-t-0' : '',
              i !== 0 ? 'lg:border-l' : '',
            ].join(' ')}
          >
            <stat.icon size={22} className="text-accent" aria-hidden />
            <AnimatedCounter
              target={stat.target}
              suffix={stat.suffix}
              className="text-gradient text-5xl sm:text-6xl"
            />
            <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-text-secondary">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsBar;
