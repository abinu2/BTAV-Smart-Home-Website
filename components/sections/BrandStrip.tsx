'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { brands, type Brand } from '@/data/brands';
import { hexToRgba, accentReadable } from '@/lib/utils';

/**
 * BrandStrip — infinite dual-row marquee of partner logotypes. Row 1 scrolls
 * left, row 2 scrolls right at a different speed for a parallax feel. Logos
 * rest in grayscale and reveal their brand color + glow on hover; the marquee
 * pauses on hover so a logo can be clicked through to its partner page.
 * Logos are rendered as brand-colored logotypes (AGENTS.md §13 missing-asset).
 */
const mid = Math.ceil(brands.length / 2);
const ROW_ONE = brands.slice(0, mid);
const ROW_TWO = brands.slice(mid);

function LogoCard({ brand }: { brand: Brand }) {
  const display = accentReadable(brand.accentColor);
  return (
    <Link
      href={`/partners/${brand.slug}`}
      className="group flex h-16 w-40 shrink-0 items-center justify-center rounded-xl border border-border bg-[var(--glass-bg)] backdrop-blur-glass transition-all duration-300"
      style={{ ['--brand' as string]: display }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = hexToRgba(display, 0.5);
        e.currentTarget.style.boxShadow = `0 0 24px ${hexToRgba(display, 0.25)}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      <span className="px-3 text-center font-heading text-sm font-bold uppercase tracking-wide text-text-muted opacity-60 transition-all duration-300 group-hover:text-[var(--brand)] group-hover:opacity-100">
        {brand.name}
      </span>
    </Link>
  );
}

function MarqueeRow({
  items,
  reverse,
  duration,
}: {
  items: Brand[];
  reverse?: boolean;
  duration: number;
}) {
  return (
    <div className="btav-marquee-mask flex overflow-hidden">
      <div
        className="btav-track flex shrink-0 gap-4 pr-4"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {/* Duplicated for a seamless loop. */}
        {[...items, ...items].map((b, i) => (
          <LogoCard key={`${b.slug}-${i}`} brand={b} />
        ))}
      </div>
    </div>
  );
}

export function BrandStrip() {
  return (
    <section id="brands" className="w-full overflow-hidden px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-center font-mono text-[12px] uppercase tracking-[0.2em] text-text-secondary">
          Trusted Brands We Install &amp; Support
        </p>

        <div className="mt-10 flex flex-col gap-4">
          <MarqueeRow items={ROW_ONE} duration={42} />
          <MarqueeRow items={ROW_TWO} reverse duration={50} />
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/partners"
            className="inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-text-primary"
          >
            View All Brand Partners
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style jsx>{`
        .btav-marquee-mask {
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          mask-image: linear-gradient(
            90deg,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }
        .btav-track {
          animation-name: btav-scroll;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          width: max-content;
        }
        .btav-marquee-mask:hover .btav-track {
          animation-play-state: paused;
        }
        @keyframes btav-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .btav-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}

export default BrandStrip;
