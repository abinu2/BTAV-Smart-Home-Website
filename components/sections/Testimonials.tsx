'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { SectionLabel } from '@/components/ui';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { testimonials } from '@/data/testimonials';

const ROTATE_MS = 6000;

function Stars({ count }: { count: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < count ? 'fill-gold text-gold' : 'text-text-muted'}
          aria-hidden
        />
      ))}
    </span>
  );
}

export function Testimonials() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const count = testimonials.length;

  const next = useCallback(() => setActive((a) => (a + 1) % count), [count]);

  // Auto-rotate the featured quote.
  useEffect(() => {
    const id = setInterval(next, ROTATE_MS);
    return () => clearInterval(id);
  }, [next]);

  const featured = testimonials[active];

  return (
    <section
      id="testimonials"
      className="relative w-full bg-gradient-to-b from-surface to-background px-5 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex justify-center">
          <SectionLabel>What Our Clients Say</SectionLabel>
        </div>

        <div className="relative mt-10 min-h-[280px]">
          {/* Decorative quote mark */}
          <Quote
            size={200}
            className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 text-accent opacity-[0.06]"
            aria-hidden
          />

            <motion.figure
              key={active}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative flex flex-col items-center text-center"
            >
              <blockquote className="max-w-2xl font-heading text-2xl italic leading-relaxed text-text-primary sm:text-[28px]">
                “{featured.quote}”
              </blockquote>
              <figcaption className="mt-6 flex flex-col items-center gap-2">
                <Stars count={featured.rating} />
                <span className="font-medium text-text-primary">
                  {featured.author}
                </span>
                <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-text-secondary">
                  {featured.location}
                </span>
              </figcaption>
            </motion.figure>
        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === active}
              className="h-2.5 rounded-full transition-all duration-300"
              style={{
                width: i === active ? 24 : 10,
                backgroundColor:
                  i === active ? '#5FBEB2' : 'rgba(255,255,255,0.18)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
