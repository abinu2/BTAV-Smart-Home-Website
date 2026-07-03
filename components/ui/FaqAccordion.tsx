'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqAccordionProps {
  items: FaqItem[];
  /** Accent hex for the active marker. Defaults to electric blue. */
  color?: string;
  className?: string;
}

/**
 * FaqAccordion — glass-styled accordion built on Radix for full keyboard and
 * screen-reader support. The +/- marker rotates on open. One item open at a
 * time (type="single", collapsible).
 */
export function FaqAccordion({
  items,
  color = '#5FBEB2',
  className,
}: FaqAccordionProps) {
  return (
    <Accordion.Root
      type="single"
      collapsible
      className={cn('flex flex-col gap-3', className)}
    >
      {items.map((item, i) => (
        <Accordion.Item
          key={i}
          value={`item-${i}`}
          className="overflow-hidden rounded-xl border border-border bg-[var(--glass-bg)] backdrop-blur-glass"
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-heading text-base font-medium text-text-primary transition-colors hover:text-accent">
              <span>{item.q}</span>
              <Plus
                size={18}
                className="shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-45"
                style={{ color }}
                aria-hidden
              />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=open]:animate-[acc-down_0.25s_ease] data-[state=closed]:animate-[acc-up_0.2s_ease]">
            <p className="px-5 pb-5 text-sm leading-relaxed text-text-secondary">
              {item.a}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}

      <style jsx global>{`
        @keyframes acc-down {
          from {
            height: 0;
          }
          to {
            height: var(--radix-accordion-content-height);
          }
        }
        @keyframes acc-up {
          from {
            height: var(--radix-accordion-content-height);
          }
          to {
            height: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-radix-accordion-content] {
            animation: none !important;
          }
        }
      `}</style>
    </Accordion.Root>
  );
}

export default FaqAccordion;
