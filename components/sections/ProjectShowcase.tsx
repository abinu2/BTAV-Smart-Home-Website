'use client';

import Link from 'next/link';
import { SectionLabel, ScrollReveal } from '@/components/ui';
import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from './ProjectCard';

const featured = getFeaturedProjects();

export function ProjectShowcase() {
  return (
    <section id="projects" className="w-full px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <SectionLabel>Featured Projects</SectionLabel>
            <h2 className="mt-4 font-heading text-4xl font-bold text-text-primary sm:text-5xl">
              Built Different.
            </h2>
            <p className="mt-3 text-lg text-text-secondary">
              Every project is custom. Every system is tuned to perfection.
            </p>
          </div>
        </div>

        {/* Mobile: horizontal scroll. Desktop: 3-col grid. */}
        <div className="-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {featured.map((project, i) => (
            <ScrollReveal
              key={project.id}
              delay={i * 0.08}
              className="w-[80vw] shrink-0 snap-start sm:w-auto"
            >
              <Link href="/work" className="block">
                <ProjectCard project={project} />
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/work"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-accent px-6 py-2.5 font-medium text-accent transition-colors duration-300 hover:bg-accent hover:text-background"
          >
            See All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProjectShowcase;
