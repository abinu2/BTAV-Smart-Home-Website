'use client';

import { type ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/useReducedMotion';

export interface ScrollRevealProps {
  children: ReactNode;
  /** Seconds of delay before the animation begins. */
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'fade';
  className?: string;
}

type Direction = NonNullable<ScrollRevealProps['direction']>;

const OFFSETS: Record<Direction, { x?: number; y?: number; opacity: number }> = {
  up: { y: 24, opacity: 0 },
  left: { x: -24, opacity: 0 },
  right: { x: 24, opacity: 0 },
  fade: { opacity: 0 },
};

/**
 * ScrollReveal: fades or slides children in when 15% enters the viewport.
 * Skips all motion when the user prefers reduced motion.
 */
export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  className,
}: ScrollRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const variants: Variants = {
    hidden: OFFSETS[direction],
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut', delay },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
