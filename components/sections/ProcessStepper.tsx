'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ProcessStepperProps {
  steps: ProcessStep[];
  color?: string;
}

/**
 * ProcessStepper — numbered horizontal stepper with a connector line that
 * draws in on scroll. Wraps to a vertical layout on small screens.
 */
export function ProcessStepper({ steps, color = '#5FBEB2' }: ProcessStepperProps) {
  const reduce = useReducedMotion();

  return (
    <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step, i) => (
        <motion.li
          key={step.title}
          className="relative flex flex-col items-start gap-3"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.1 }}
        >
          {/* Connector (desktop only, between steps) */}
          {i < steps.length - 1 && (
            <motion.span
              aria-hidden
              className="absolute left-12 top-5 hidden h-px lg:block"
              style={{
                width: 'calc(100% - 1rem)',
                background: `linear-gradient(90deg, ${color}, transparent)`,
                transformOrigin: 'left',
              }}
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.1 + 0.2 }}
            />
          )}

          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-sm font-bold"
            style={{
              color,
              borderColor: color,
              backgroundColor: 'var(--color-bg)',
            }}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="font-heading text-lg font-bold text-text-primary">
            {step.title}
          </h3>
          <p className="text-sm text-text-secondary">{step.description}</p>
        </motion.li>
      ))}
    </ol>
  );
}

export default ProcessStepper;
