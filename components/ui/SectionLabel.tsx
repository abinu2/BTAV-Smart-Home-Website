'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/useReducedMotion';

export interface SectionLabelProps {
  children: ReactNode;
  /** Hex color for the bar and text. Default #5FBEB2. */
  color?: string;
  className?: string;
}

/**
 * SectionLabel — small all-caps mono label preceded by a 2px × 20px bar.
 * Fades up when scrolled into view.
 */
export function SectionLabel({
  children,
  color = '#5FBEB2',
  className,
}: SectionLabelProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn('flex items-center gap-3', className)}
      initial={reduce ? false : { y: 12, opacity: 0 }}
      whileInView={reduce ? undefined : { y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <span
        aria-hidden
        className="inline-block h-5 w-0.5 shrink-0"
        style={{ backgroundColor: color }}
      />
      <span
        className="font-mono text-[11px] uppercase leading-none"
        style={{ color, letterSpacing: '0.2em' }}
      >
        {children}
      </span>
    </motion.div>
  );
}

export default SectionLabel;
