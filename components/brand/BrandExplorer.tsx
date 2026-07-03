'use client';

import { useMemo, useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import {
  brands,
  categories,
  getCategoryCounts,
  type BrandCategory,
} from '@/data/brands';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { BrandPartnerCard } from './BrandPartnerCard';

type Filter = BrandCategory | 'all';

/**
 * BrandExplorer — the interactive heart of the Partners page.
 *  - A glass filter bar with a Framer `layoutId` sliding gradient indicator.
 *  - An AnimatePresence + layout grid that reshuffles as filters change.
 *  - The signature secondary delight: hovering a card floods the whole page
 *    background with that brand's color at low opacity.
 */
export function BrandExplorer() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>('all');
  const [flood, setFlood] = useState<string | null>(null);
  const counts = useMemo(() => getCategoryCounts(), []);

  const visible = useMemo(
    () => (filter === 'all' ? brands : brands.filter((b) => b.category === filter)),
    [filter],
  );

  return (
    <div className="relative">
      {/* Page-wide brand-color flood */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        animate={{ opacity: flood ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          background: flood
            ? `radial-gradient(ellipse 80% 60% at 50% 30%, ${flood}22 0%, transparent 70%)`
            : 'transparent',
        }}
      />

      <div className="relative z-10">
        {/* Filter bar */}
        <div className="flex justify-center">
          <LayoutGroup>
            <div
              role="tablist"
              aria-label="Filter brands by category"
              className="flex max-w-full flex-wrap items-center justify-center gap-1 overflow-x-auto rounded-full border border-border bg-[var(--glass-bg)] p-2 backdrop-blur-glass"
            >
              {categories.map((cat) => {
                const active = filter === cat.value;
                return (
                  <button
                    key={cat.value}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(cat.value as Filter)}
                    className="relative shrink-0 rounded-full px-4 py-2 font-mono text-[12px] uppercase tracking-[0.1em] transition-colors duration-200"
                  >
                    {active && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            'linear-gradient(135deg, #5FBEB2 0%, #7B2FFF 50%, #00E5A0 100%)',
                          opacity: 0.85,
                        }}
                        transition={
                          reduce
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 380, damping: 32 }
                        }
                      />
                    )}
                    <span
                      className={
                        active
                          ? 'relative text-text-primary'
                          : 'relative text-text-secondary hover:text-text-primary'
                      }
                    >
                      {cat.label}
                      <sub className="ml-1 font-normal opacity-70">
                        {counts[cat.value]}
                      </sub>
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        {/* Grid — rendered directly from the filtered list so cards add/remove
            reliably; each card animates itself in on mount. */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((brand) => (
            <BrandPartnerCard key={brand.slug} brand={brand} onHover={setFlood} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default BrandExplorer;
