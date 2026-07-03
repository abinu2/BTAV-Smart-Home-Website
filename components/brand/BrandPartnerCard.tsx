'use client';

import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { CategoryPill } from '@/components/ui';
import { hexToRgba, cn, accentReadable } from '@/lib/utils';
import { useReducedMotion } from '@/lib/useReducedMotion';
import type { Brand } from '@/data/brands';

export interface BrandPartnerCardProps {
  brand: Brand;
  /** Notify parent for the page-wide brand-color flood. */
  onHover?: (color: string | null) => void;
}

/**
 * BrandPartnerCard — partner tile themed by the brand's accent color. On hover
 * it lifts, its border lights to the accent, a centered radial glow fades in,
 * and the arrow nudges right. Control4 gets the flagship treatment: gold tint,
 * gold border, a shimmering specialist badge, and a taller grid footprint.
 */
export function BrandPartnerCard({ brand, onHover }: BrandPartnerCardProps) {
  const reduce = useReducedMotion();
  // Lighten very-dark brand colors (Sonos, Savant, Anthem…) so the logotype,
  // pill, and border stay legible on the near-black card.
  const accent = accentReadable(brand.accentColor);
  const isControl4 = brand.slug === 'control4';

  return (
    <motion.div
      layout
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(isControl4 && 'sm:row-span-2')}
      onMouseEnter={() => onHover?.(accent)}
      onMouseLeave={() => onHover?.(null)}
    >
      <Link
        href={`/partners/${brand.slug}`}
        className="group relative flex h-full min-h-[200px] flex-col overflow-hidden rounded-2xl border p-5 backdrop-blur-glass transition-all duration-[250ms]"
        style={{
          backgroundColor: isControl4
            ? hexToRgba('#CBA46C', 0.06)
            : 'var(--glass-bg)',
          borderColor: isControl4
            ? hexToRgba('#CBA46C', 0.3)
            : 'var(--color-border)',
          ['--accent' as string]: accent,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = hexToRgba(accent, 0.6);
          e.currentTarget.style.transform = 'translateY(-8px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = isControl4
            ? hexToRgba('#CBA46C', 0.3)
            : 'var(--color-border)';
          e.currentTarget.style.transform = '';
        }}
      >
        {/* Hover radial glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 45%, ${hexToRgba(
              accent,
              0.18,
            )} 0%, transparent 70%)`,
          }}
        />

        {/* Top row */}
        <div className="relative flex items-start justify-between gap-2">
          <CategoryPill label={brand.category} color={accent} size="sm" />
          {isControl4 && brand.badge && (
            <span
              className="btav-shimmer inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-gold"
              style={{
                borderColor: hexToRgba('#CBA46C', 0.4),
                backgroundColor: hexToRgba('#CBA46C', 0.12),
              }}
            >
              <Star size={10} className="fill-gold text-gold" />
              Control4 Specialist
            </span>
          )}
        </div>

        {/* Center logotype */}
        <div className="relative flex flex-1 items-center justify-center py-6">
          <span
            className="text-center font-heading text-2xl font-bold uppercase leading-tight tracking-tight sm:text-3xl"
            style={{ color: accent }}
          >
            {brand.name}
          </span>
        </div>

        {/* Bottom row */}
        <div className="relative flex items-end justify-between gap-3">
          <p className="max-w-[70%] text-[13px] leading-snug text-text-secondary">
            {brand.tagline}
          </p>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted">
            {brand.productCount}
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: accent }}
            />
          </span>
        </div>

        <style jsx>{`
          .btav-shimmer {
            background-image: linear-gradient(
              110deg,
              ${hexToRgba('#CBA46C', 0.12)} 0%,
              ${hexToRgba('#E4C79A', 0.35)} 50%,
              ${hexToRgba('#CBA46C', 0.12)} 100%
            );
            background-size: 200% 100%;
            animation: btav-badge-shimmer 3s linear infinite;
          }
          @keyframes btav-badge-shimmer {
            from {
              background-position: 200% 0;
            }
            to {
              background-position: -200% 0;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .btav-shimmer {
              animation: none;
            }
          }
        `}</style>
      </Link>
    </motion.div>
  );
}

export default BrandPartnerCard;
