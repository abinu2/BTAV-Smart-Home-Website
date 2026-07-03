'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn, hexToRgba, readableTextColor } from '@/lib/utils';
import { useReducedMotion } from '@/lib/useReducedMotion';

export interface BrandAccentButtonProps {
  label: string;
  href: string;
  /** Brand-specific hex color used for all theming. */
  color: string;
  variant: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** External link — opens in a new tab with rel safety. */
  external?: boolean;
  className?: string;
}

const SIZES: Record<NonNullable<BrandAccentButtonProps['size']>, string> = {
  sm: 'text-[13px] px-4 py-2 gap-1.5',
  md: 'text-[15px] px-6 py-2.5 gap-2',
  lg: 'text-[16px] px-8 py-3.5 gap-2.5',
};

/**
 * BrandAccentButton — CTA themed entirely from a single brand color.
 *  - filled:   solid color bg + white text, color glow on hover
 *  - outlined: transparent + color border/text, fills on hover
 *  - ghost:    no border, color text, subtle tinted bg on hover
 * Arrow nudges 4px right on hover. Respects reduced motion.
 */
export function BrandAccentButton({
  label,
  href,
  color,
  variant,
  size = 'md',
  external = false,
  className,
}: BrandAccentButtonProps) {
  const reduce = useReducedMotion();

  const base =
    'group inline-flex min-h-[44px] items-center justify-center rounded-full font-body font-medium leading-none transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2';

  const variantStyle: React.CSSProperties =
    variant === 'filled'
      ? { backgroundColor: color, color: readableTextColor(color) }
      : variant === 'outlined'
        ? { backgroundColor: 'transparent', color, border: `1px solid ${color}` }
        : { backgroundColor: 'transparent', color };

  // Build the style as a single typed object. The CSS custom properties are
  // added via a Record cast so the inline union stays simple (avoids the TS
  // "union type too complex to represent" error from next/link's href typing).
  const style = {
    ...variantStyle,
    '--accent': color,
    '--accent-text': readableTextColor(color),
    '--accent-tint': hexToRgba(color, 0.12),
    '--accent-glow': hexToRgba(color, 0.4),
  } as React.CSSProperties & Record<string, string>;

  const external_props = external
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : {};

  return (
    <Link
      href={href}
      {...external_props}
      className={cn(base, SIZES[size], 'btav-accent-btn', className)}
      style={style}
      data-variant={variant}
    >
      <span>{label}</span>
      <motion.span
        aria-hidden
        className="inline-flex"
        initial={false}
        whileHover={reduce ? undefined : { x: 4 }}
      >
        <ArrowRight size={size === 'lg' ? 20 : 16} />
      </motion.span>

      {/* Hover behavior via styled-jsx scoped to this component. */}
      <style jsx>{`
        .btav-accent-btn[data-variant='filled']:hover {
          box-shadow: 0 0 32px var(--accent-glow);
        }
        .btav-accent-btn[data-variant='outlined']:hover {
          background-color: var(--accent);
          color: var(--accent-text);
        }
        .btav-accent-btn[data-variant='ghost']:hover {
          background-color: var(--accent-tint);
        }
        .btav-accent-btn:hover :global(svg) {
          transform: translateX(4px);
        }
        .btav-accent-btn :global(svg) {
          transition: transform 0.3s ease;
        }
        @media (prefers-reduced-motion: reduce) {
          .btav-accent-btn,
          .btav-accent-btn :global(svg) {
            transition: none;
          }
        }
      `}</style>
    </Link>
  );
}

export default BrandAccentButton;
