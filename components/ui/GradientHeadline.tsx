'use client';

import { type ElementType, type ReactNode, Children } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/useReducedMotion';

export interface GradientHeadlineProps {
  children: ReactNode;
  /** Gradient start color. Default #F2F1EC. */
  from?: string;
  /** Gradient end color. Default #5FBEB2. */
  to?: string;
  className?: string;
  /** Element to render. Default 'h2'. */
  as?: ElementType;
}

/**
 * GradientHeadline — type-led headline with a CSS gradient fill.
 * Words fade up with a 40ms stagger when scrolled into view.
 * Only plain-string children are split into animated words; non-string
 * children render as a single animated unit.
 */
export function GradientHeadline({
  children,
  from = '#F2F1EC',
  to = '#5FBEB2',
  className,
  as = 'h2',
}: GradientHeadlineProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion.create(as as ElementType);

  const gradientStyle = {
    backgroundImage: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',
  } as const;

  // Build a flat list of word tokens from string children.
  const words: string[] = [];
  Children.forEach(children, (child) => {
    if (typeof child === 'string') {
      child
        .split(/\s+/)
        .filter(Boolean)
        .forEach((w) => words.push(w));
    }
  });

  const canStagger = words.length > 0 && !reduce;

  if (!canStagger) {
    return (
      <MotionTag
        className={cn('font-heading font-bold', className)}
        style={gradientStyle}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={cn('font-heading font-bold', className)}
      style={gradientStyle}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.04 }}
      aria-label={words.join(' ')}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          variants={{
            hidden: { y: '0.4em', opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.4, ease: 'easeOut' },
            },
          }}
          aria-hidden
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </MotionTag>
  );
}

export default GradientHeadline;
