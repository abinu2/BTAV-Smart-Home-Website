'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { CategoryPill } from '@/components/ui';
import { hexToRgba } from '@/lib/utils';
import { useReducedMotion } from '@/lib/useReducedMotion';
import { projects, type Project } from '@/data/projects';

/** Unique categories present in the data, prefixed with "All". */
const FILTERS = [
  'All',
  ...Array.from(new Set(projects.map((p) => p.category))),
];

/**
 * WorkGallery — filterable masonry gallery with a Radix Dialog lightbox.
 * Cards use category-colored gradient placeholders until real photos arrive
 * (AGENTS.md §13). The lightbox supports ←/→ keyboard navigation and Esc.
 */
export function WorkGallery() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  const open = activeIndex !== null;
  const active = open ? filtered[activeIndex] : null;

  const go = useCallback(
    (dir: 1 | -1) => {
      setActiveIndex((i) => {
        if (i === null) return i;
        return (i + dir + filtered.length) % filtered.length;
      });
    },
    [filtered.length],
  );

  // Keyboard navigation while the lightbox is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go]);

  return (
    <>
      {/* Filter bar */}
      <div
        role="tablist"
        aria-label="Filter projects"
        className="flex flex-wrap gap-2"
      >
        {FILTERS.map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setFilter(f);
                setActiveIndex(null);
              }}
              className={[
                'rounded-full border px-4 py-2 font-mono text-[12px] uppercase tracking-wide transition-colors duration-200',
                isActive
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border text-text-secondary hover:text-text-primary',
              ].join(' ')}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Masonry via CSS columns — rendered directly from the filtered list. */}
      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {filtered.map((project, i) => (
          <motion.button
            key={project.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            aria-label={`View ${project.title} in ${project.location}`}
            className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-border text-left"
            // Varied heights for a true masonry feel.
            style={{ height: i % 3 === 0 ? 320 : i % 3 === 1 ? 260 : 300 }}
          >
            <ProjectTile project={project} />
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog.Root open={open} onOpenChange={(o) => !o && setActiveIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm data-[state=open]:animate-[fade-in_0.2s_ease]" />
          <Dialog.Content
            className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-surface focus:outline-none"
            aria-describedby={undefined}
          >
            {active && (
              <div>
                <div
                  className="relative flex h-64 items-center justify-center sm:h-80"
                  style={{
                    background: `linear-gradient(135deg, ${hexToRgba(
                      active.accentColor,
                      0.3,
                    )} 0%, ${hexToRgba(active.accentColor, 0.05)} 60%, rgba(8,12,20,0.7) 100%)`,
                  }}
                >
                  <Camera
                    size={48}
                    style={{ color: active.accentColor }}
                    className="opacity-40"
                    aria-hidden
                  />
                  <span className="absolute left-4 top-4">
                    <CategoryPill label={active.category} color={active.accentColor} />
                  </span>

                  {/* Prev / Next */}
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous project"
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/60 text-text-primary hover:bg-background"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next project"
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/60 text-text-primary hover:bg-background"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="p-6">
                  <Dialog.Title className="font-heading text-2xl font-bold text-text-primary">
                    {active.title}
                  </Dialog.Title>
                  <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.15em] text-text-secondary">
                    {active.location}
                  </p>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <h3 className="font-mono text-[11px] uppercase tracking-wide text-text-muted">
                        Services
                      </h3>
                      <p className="mt-1 text-sm text-text-secondary">
                        {active.services.join(' · ')}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-mono text-[11px] uppercase tracking-wide text-text-muted">
                        Brands Installed
                      </h3>
                      <p className="mt-1 text-sm text-text-secondary">
                        {active.brands.join(' · ')}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-text-muted">
                    Project photography coming soon.
                  </p>
                </div>
              </div>
            )}

            <Dialog.Close
              aria-label="Close"
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-text-primary hover:bg-background"
            >
              <X size={18} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

/** Inner tile content (gradient placeholder + overlay). */
function ProjectTile({ project }: { project: Project }) {
  const accent = project.accentColor;
  return (
    <div className="relative h-full w-full">
      <div
        className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${hexToRgba(accent, 0.28)} 0%, ${hexToRgba(
            accent,
            0.05,
          )} 60%, rgba(8,12,20,0.6) 100%)`,
        }}
      >
        <div className="flex h-full w-full items-center justify-center">
          <Camera size={36} style={{ color: accent }} className="opacity-40" aria-hidden />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/90 to-transparent" />
      <div className="absolute left-3 top-3">
        <CategoryPill label={project.category} color={accent} size="sm" />
      </div>
      <div className="absolute inset-x-3 bottom-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-secondary">
          {project.location}
        </p>
        <h3 className="mt-0.5 font-heading text-lg font-bold text-text-primary">
          {project.title}
        </h3>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span
          className="rounded-full border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.15em]"
          style={{ color: accent, borderColor: hexToRgba(accent, 0.5) }}
        >
          View Project →
        </span>
      </div>
    </div>
  );
}

export default WorkGallery;
