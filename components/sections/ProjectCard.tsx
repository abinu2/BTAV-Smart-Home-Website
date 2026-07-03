'use client';

import Image from 'next/image';
import { Camera } from 'lucide-react';
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
            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${hexToRgba(accent, 0.28)} 0%, ${hexToRgba(
                accent,
                0.05,
              )} 60%, rgba(8,12,20,0.6) 100%)`,
            }}
          >
            <div className="flex h-full w-full items-center justify-center">
              <Camera
                size={40}
                style={{ color: accent }}
                className="opacity-40"
                aria-hidden
              />
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
