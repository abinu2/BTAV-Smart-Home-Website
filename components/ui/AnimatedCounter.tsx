'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/lib/useReducedMotion';

export interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  /** Seconds. Default 2. */
  duration?: number;
  className?: string;
}

/** easeOut cubic — fast start, gentle settle. */
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * AnimatedCounter — counts from 0 to `target` when scrolled into view.
 * Respects reduced motion by rendering the final value immediately.
 */
export function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(target);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const totalMs = duration * 1000;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / totalMs, 1);
      setValue(Math.round(easeOut(progress) * target));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target, duration]);

  return (
    <span
      ref={ref}
      className={cn('font-heading font-bold tabular-nums', className)}
    >
      {prefix}
      {value.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}

export default AnimatedCounter;
