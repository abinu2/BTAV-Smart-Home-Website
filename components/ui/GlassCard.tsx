'use client';

import { type ElementType, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { hexToRgba } from '@/lib/utils';
import { useReducedMotion } from '@/lib/useReducedMotion';

export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Lift + border-brighten on hover. */
  hover?: boolean;
  /** Hex color for a radial glow that fades in on hover. */
  glowColor?: string;
  /** Render as a different element/component (e.g. 'article', 'a'). */
  as?: ElementType;
}

/**
 * GlassCard — the foundational translucent surface for BTAV.
 *
 * Default: glass background + glass border. When `hover` is true the card
 * lifts 6px and its border brightens. When `glowColor` is provided, a radial
 * glow in that color (15% opacity) fades in on hover. All motion is disabled
 * when the user prefers reduced motion.
 */
export function GlassCard({
  children,
  className,
  hover = false,
  glowColor,
  as = 'div',
}: GlassCardProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion.create(as as ElementType) as React.ComponentType<
    HTMLMotionProps<'div'>
  >;

  const glow = glowColor ? hexToRgba(glowColor, 0.15) : undefined;

  return (
    <MotionTag
      className={cn(
        'group relative rounded-2xl border border-border bg-[var(--glass-bg)] backdrop-blur-glass transition-colors duration-300',
        hover && 'hover:border-border-lit',
        className,
      )}
      initial={false}
      whileHover={
        hover && !reduce
          ? { y: -6, transition: { duration: 0.25, ease: 'easeOut' } }
          : undefined
      }
    >
      {glow && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${glow} 0%, transparent 70%)`,
          }}
        />
      )}
      <div className="relative">{children}</div>
    </MotionTag>
  );
}

export default GlassCard;
