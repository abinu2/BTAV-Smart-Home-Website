'use client';

import Image from 'next/image';
import { Camera, Home, Projector, Router, ShieldCheck, Waves } from 'lucide-react';
import { CategoryPill } from '@/components/ui';
import { hexToRgba } from '@/lib/utils';
import type { Project } from '@/data/projects';

export interface ProjectCardProps {
  project: Project;
  /** Fixed height utility (e.g. masonry uses natural height). */
  heightClass?: string;
  /** When provided, the card is a button that calls this (e.g. open lightbox). */
  onSelect?: (project: Project) => void;
}

/**
 * ProjectCard — full-bleed project tile. Uses a category-colored gradient
 * placeholder until a real photo exists (AGENTS.md §13). Hover scales the
 * image, darkens the overlay, and reveals a "View Project" affordance.
 */
export function ProjectCard({ project, heightClass = 'h-[400px]', onSelect }: ProjectCardProps) {
  const accent = project.accentColor;
  const VisualIcon =
    project.category === 'Automation'
      ? Home
      : project.category === 'Networking'
        ? Router
        : project.category === 'Outdoor'
          ? Waves
          : project.category.includes('Security')
            ? ShieldCheck
            : Projector;

  const inner = (
    <>
      {/* Media / placeholder */}
      <div className="absolute inset-0">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} — ${project.location}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="relative h-full w-full overflow-hidden transition-transform duration-500 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${hexToRgba(accent, 0.24)} 0%, ${hexToRgba(
                accent,
                0.06,
              )} 46%, rgba(8,12,20,0.82) 100%)`,
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            <div className="absolute inset-6 rounded-2xl border border-white/10 bg-background/20 backdrop-blur-[2px]" />
            <div className="absolute left-8 right-8 top-10 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                Visual Study
              </span>
              <Camera size={16} className="text-white/35" aria-hidden />
            </div>
            <div className="absolute inset-x-10 top-1/2 -translate-y-1/2">
              <div className="flex items-center gap-4">
                <span
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border"
                  style={{
                    borderColor: hexToRgba(accent, 0.45),
                    backgroundColor: hexToRgba(accent, 0.13),
                    boxShadow: `0 0 32px ${hexToRgba(accent, 0.24)}`,
                  }}
                >
                  <VisualIcon size={34} style={{ color: accent }} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="h-2 w-3/4 rounded-full bg-white/20" />
                  <div className="mt-3 h-2 w-1/2 rounded-full bg-white/10" />
                  <div
                    className="mt-5 h-1.5 w-full rounded-full"
                    style={{ backgroundColor: hexToRgba(accent, 0.5) }}
                  />
                </div>
              </div>
            </div>
            <div className="absolute bottom-24 left-8 right-8 grid grid-cols-3 gap-2">
              {project.services.slice(0, 3).map((service) => (
                <span
                  key={service}
                  className="truncate rounded-full border border-white/10 bg-black/20 px-2 py-1 text-center font-mono text-[9px] uppercase tracking-wide text-white/55"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom gradient for legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/90 to-transparent transition-colors duration-300 group-hover:from-background" />

      {/* Top-left category */}
      <div className="absolute left-4 top-4">
        <CategoryPill label={project.category} color={accent} />
      </div>

      {/* Bottom-left location + title */}
      <div className="absolute inset-x-4 bottom-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-secondary">
          {project.location}
        </p>
        <h3 className="mt-1 font-heading text-xl font-bold text-text-primary">
          {project.title}
        </h3>
      </div>

      {/* Hover reveal */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span
          className="rounded-full border px-5 py-2 font-mono text-[12px] uppercase tracking-[0.15em] backdrop-blur-sm"
          style={{ color: accent, borderColor: hexToRgba(accent, 0.5) }}
        >
          View Project →
        </span>
      </div>
    </>
  );

  const className = `group relative block w-full overflow-hidden rounded-2xl border border-border ${heightClass}`;

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={() => onSelect(project)}
        aria-label={`View ${project.title} in ${project.location}`}
        className={`${className} text-left`}
      >
        {inner}
      </button>
    );
  }

  return (
    <div className={className} aria-label={`${project.title} in ${project.location}`}>
      {inner}
    </div>
  );
}

export default ProjectCard;
